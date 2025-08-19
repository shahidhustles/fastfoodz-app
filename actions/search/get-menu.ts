import { appwriteConfig, database } from "@/lib/appwrite";
import { GetMenuParams } from "@/type";
import { Query } from "react-native-appwrite";

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    // there can be multiple categories
    const queries: string[] = [];

    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.equal("name", query));

    const menus = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries
    );

    return menus.documents;
  } catch (error) {
    throw new Error(error as string);
  }
};
