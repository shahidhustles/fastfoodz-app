import { createUser } from "@/actions/create-user";
import CustomBtn from "@/components/custom-btn";
import CustomInput from "@/components/custom-input";
import useUser from "@/store/auth.store";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const { fetchAuthenticatedUser } = useUser();

  const submit = async () => {
    if (!form.email || !form.password || !form.name) {
      return Alert.alert("Error", "Please enter Valid Credentials");
    }

    setIsSubmitting(true);

    try {
      await createUser({ ...form });
      // Update the authentication state after successful sign-up
      await fetchAuthenticatedUser();
      Alert.alert("Success", "User Signed Up Successfully");
      // Small delay to ensure state is updated before navigation
      setTimeout(() => {
        router.replace("/");
      }, 100);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text) => {
          setForm((prevState) => ({
            ...prevState,
            name: text,
          }));
        }}
        label="Full Name"
      />
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
      <CustomBtn title="Sign Up" isLoading={isSubmitting} onPress={submit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href={"/(auth)/sign-in"} className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};
export default SignUp;
