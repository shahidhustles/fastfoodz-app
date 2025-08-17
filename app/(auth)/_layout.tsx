import { images } from "@/constants";
import useUser from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
export default function AuthLayout() {
  const { isAuthenticated } = useUser();

  if (isAuthenticated) return <Redirect href={"/"} />;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="bg-white h-full"
        //clicking outside the keyboard will close it :
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="relative w-full"
          style={{
            height: Dimensions.get("screen").height / 2.25,
          }}
        >
          <Image
            source={images.loginGraphic}
            className="size-full rounded-b-lg"
            resizeMode="stretch"
          />
          <Image
            source={images.logo}
            className="self-center size-48 absolute -bottom-16 z-10"
          />
        </View>

        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
