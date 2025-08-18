import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: "com.fastfoodz.demo",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: "68a1a857001f2d4261b6",
  bucketId: "68a3158b0013526f1845",
  userCollectionId: "68a1a8950037307a15e3",
  categoriesCollectionId: "68a3114b002e13e27fef",
  menuCollectionId: "68a311ee0021a0680348",
  customizationsCollectionId: "68a3134a0004cd48132b",
  menuCustomizationsCollectionId: "68a314a00029c363e815",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);

export const database = new Databases(client);

export const avatars = new Avatars(client);

export const storage = new Storage(client);
