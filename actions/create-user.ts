import { account, appwriteConfig, avatars, database } from "@/lib/appwrite";
import { CreateUserParams } from "@/type";
import { ID } from "react-native-appwrite";
import { signIn } from "./sign-in-user";

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), name, email, password);

    if (!newAccount) {
      throw new Error("Unable to create this account");
    }

    await signIn({ email, password });
    const avatarUrl = avatars.getInitialsURL(name);

    return await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        email: email,
        accountId: newAccount.$id,
        name: name,
        avatar: avatarUrl,
      }
    );
  } catch (error) {
    throw new Error(error as string);
  }
};
