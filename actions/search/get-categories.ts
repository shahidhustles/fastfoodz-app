import { appwriteConfig, database } from "@/lib/appwrite";

export const getCategories = async () => {
  try {
    const categories = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId
    );
    return categories.documents;
  } catch (error) {
    throw new Error(error as string);
  }
};
