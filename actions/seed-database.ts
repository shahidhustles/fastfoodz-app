import { appwriteConfig, database, storage } from "@/lib/appwrite";
import dummyData from "@/lib/data";
import { ID } from "react-native-appwrite";

interface Category {
  name: string;
  description: string;
}

interface Customization {
  name: string;
  price: number;
  type: "topping" | "side" | "size" | "crust" | string; // extend as needed
}

interface MenuItem {
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  category_name: string;
  customizations: string[]; // list of customization names
}

interface DummyData {
  categories: Category[];
  customizations: Customization[];
  menu: MenuItem[];
}

// ensure dummyData has correct shape
const data = dummyData as DummyData;

async function clearAll(collectionId: string): Promise<void> {
  const list = await database.listDocuments(
    appwriteConfig.databaseId,
    collectionId
  );
  console.log(
    `Clearing ${list.documents.length} documents from collection: ${collectionId}`
  );

  await Promise.all(
    list.documents.map((doc) =>
      database.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
    )
  );

  console.log(`Cleared collection: ${collectionId}`);
}

async function clearStorage(): Promise<void> {
  const list = await storage.listFiles(appwriteConfig.bucketId);

  console.log(
    `Clearing ${list.files.length} files from storage bucket: ${appwriteConfig.bucketId}`
  );

  await Promise.all(
    list.files.map((file) =>
      storage.deleteFile(appwriteConfig.bucketId, file.$id)
    )
  );

  console.log(`Cleared storage bucket: ${appwriteConfig.bucketId}`);
}

// async function uploadImageToStorage(imageUrl: string) {
//   console.log(`Uploading image to storage from URL: ${imageUrl}`);
//   const response = await fetch(imageUrl);
//   const blob = await response.blob();

//   const fileObj = {
//     name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
//     type: blob.type,
//     size: blob.size,
//     uri: imageUrl,
//   };

//   const file = await storage.createFile(
//     appwriteConfig.bucketId,
//     ID.unique(),
//     fileObj
//   );
//   console.log(`Created storage file: ${file.$id} for ${fileObj.name}`);

//   return storage.getFileViewURL(appwriteConfig.bucketId, file.$id);
// }

async function seed(): Promise<void> {
  console.log("Seeding started...");

  // 1. Clear all
  await clearAll(appwriteConfig.categoriesCollectionId);
  await clearAll(appwriteConfig.customizationsCollectionId);
  await clearAll(appwriteConfig.menuCollectionId);
  await clearAll(appwriteConfig.menuCustomizationsCollectionId);
  await clearStorage();

  // 2. Create Categories
  const categoryMap: Record<string, string> = {};
  for (const cat of data.categories) {
    console.log(`Creating category: ${cat.name}`);
    const doc = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
      ID.unique(),
      cat
    );
    categoryMap[cat.name] = doc.$id;
    console.log(`Created category '${cat.name}' -> ${doc.$id}`);
  }

  // 3. Create Customizations
  const customizationMap: Record<string, string> = {};
  for (const cus of data.customizations) {
    console.log(`Creating customization: ${cus.name}`);
    const doc = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.customizationsCollectionId,
      ID.unique(),
      {
        name: cus.name,
        price: cus.price,
        type: cus.type,
      }
    );
    // mapping name of customization to its doc id in collection to be used in menu collection
    customizationMap[cus.name] = doc.$id;
    console.log(`Created customization '${cus.name}' -> ${doc.$id}`);
  }

  // 4. Create Menu Items
  const menuMap: Record<string, string> = {};
  for (const item of data.menu) {
    console.log(`Creating menu item: ${item.name}`);
    console.log(
      `Skipping image upload, using original URL as placeholder: ${item.image_url}`
    );
    // Skip image upload for now - you can handle manually later
    // const uploadedImage = await uploadImageToStorage(item.image_url);

    const doc = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      ID.unique(),
      {
        name: item.name,
        description: item.description,
        imageUrl: item.image_url, // Use original URL as placeholder
        price: item.price,
        rating: item.rating,
        calories: item.calories,
        protein: item.protein,
        categories: categoryMap[item.category_name],
      }
    );

    // mapping menu(dish) name to its doc id to be used in customizations
    menuMap[item.name] = doc.$id;
    console.log(`Created menu '${item.name}' -> ${doc.$id}`);

    // 5. Create menu_customizations
    for (const cusName of item.customizations) {
      const cusId = customizationMap[cusName];
      console.log(
        `Linking customization '${cusName}' (${cusId}) to menu '${item.name}' (${doc.$id})`
      );
      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.menuCustomizationsCollectionId,
        ID.unique(),
        {
          menu: doc.$id,
          customizations: cusId,
        }
      );
      console.log(`Linked customization '${cusName}' to menu '${item.name}'`);
    }
  }

  console.log("✅ Seeding complete.");
}

export default seed;
