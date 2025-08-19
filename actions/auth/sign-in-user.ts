import { account } from "@/lib/appwrite";
import { SignInParams } from "@/type";

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    // this will only work if the user account is already created.
    // account.createEmailPasswordSession authenticates an existing user.
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error(error as string);
  }
};
