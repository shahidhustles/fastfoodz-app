import { images } from "@/constants";
import React from "react";
import { ActivityIndicator, Image, View } from "react-native";

const LoadingScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
        source={images.logo}
        className="w-32 h-32 mb-8"
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#FF6B35" />
    </View>
  );
};

export default LoadingScreen;
