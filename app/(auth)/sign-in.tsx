import { signIn } from "@/actions/sign-in-user";
import CustomBtn from "@/components/custom-btn";
import CustomInput from "@/components/custom-input";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    if (!form.email || !form.password) {
      return Alert.alert(
        "Error",
        "Please enter a valid Email address and password"
      );
    }

    setIsSubmitting(true);

    try {
      await signIn({ ...form });
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your Email"
        value={form.email}
        onChangeText={(text) => {
          setForm((prevState) => ({
            ...prevState,
            email: text,
          }));
        }}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        secureTextEntry={true}
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => {
          setForm((prevState) => ({
            ...prevState,
            password: text,
          }));
        }}
        label="Password"
      />
      <CustomBtn title="Sign In" isLoading={isSubmitting} onPress={submit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don&apos;t have an account?
        </Text>
        <Link href={"/(auth)/sign-up"} className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};
export default SignIn;
