import { Redirect, Slot } from "expo-router";
export default function _Layout() {
  const isAuthenticated = false;

  if (!isAuthenticated) return <Redirect href={"/(auth)/sign-in"} />;
  //Slot : renders the content as it is
  return <Slot />;
}
