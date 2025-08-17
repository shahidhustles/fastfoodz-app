import { account, appwriteConfig, database } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw new Error("Cant find an account, Login again");
    }
    //we are manually searching through each docs here, index the attribute to make it faster
    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) {
      throw new Error("No user with this accountId found in database");
    }

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};
