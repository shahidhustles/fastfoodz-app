import LoadingScreen from "@/components/loading-screen";
import useUser from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";

export default function TabLayout() {
  const { isAuthenticated, isLoading } = useUser();

  // Show loading screen while checking authentication
  if (isLoading) return <LoadingScreen />;

  // Redirect to sign-in if not authenticated
  if (!isAuthenticated) return <Redirect href={"/(auth)/sign-in"} />;

  //Slot : renders the content as it is
  return <Slot />;
}
