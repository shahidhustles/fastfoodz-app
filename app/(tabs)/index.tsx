import CartButton from "@/components/cart-button";
import { images, offers } from "@/constants";
import cn from "clsx";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => (
          <View className="flex-between flex-row w-full my-5">
            <View className="flex-start">
              <Text className="small-bold text-primary">DELIVER TO</Text>
              <TouchableOpacity className="flex-row flex-center gap-x-1 mt-0.5">
                <Text className="paragraph-bold text-dark-100">
                  Pune, India
                </Text>
                <Image
                  source={images.arrowDown}
                  className="size-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <CartButton />
          </View>
        )}
        renderItem={({ item, index }) => {
          const isEven: boolean = index % 2 === 0;

          return (
            <View>
              <Pressable
                android_ripple={{ color: "#fffff22" }}
                className={cn(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row"
                )}
                style={{ backgroundColor: item.color }}
              >
                {() => (
                  <React.Fragment>
                    <View className="h-full w-1/2">
                      <Image
                        source={item.image}
                        className="size-full"
                        resizeMode="contain"
                      />
                    </View>
                    <View
                      className={cn(
                        "offer-card__info",
                        isEven ? "pl-6" : "pr-6"
                      )}
                    >
                      <Text
                        className="h1-bold text-white leading-tight"
                        numberOfLines={2}
                      >
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className="size-10"
                        resizeMode="contain"
                        tintColor={"#fff"}
                      />
                    </View>
                  </React.Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
        keyExtractor={(item) => String(item.id)}
      />
    </SafeAreaView>
  );
}
