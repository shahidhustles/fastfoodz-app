import { Category } from "@/type";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity } from "react-native";

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState(searchParams.category || "all");

  const handlePress = (id: string) => {
    setActive(id);

    if (id === "all") router.setParams({ category: undefined });
    else {
      router.setParams({ category: id });
    }
  };

  const filterData: Category | { $id: string; name: string }[] = categories
    ? [{ $id: "all", name: "All" }, ...categories]
    : [{ $id: "all", name: "All" }];

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-x-2 pb-3 "
      data={filterData}
      renderItem={({ item }) => (
        <TouchableOpacity
          className={cn(
            "filter",
            active === item.$id ? "bg-amber-500" : "bg-white-100"
          )}
          style={
            Platform.OS === "android"
              ? {
                  elevation: 5,
                  shadowColor: "#878787",
                }
              : {}
          }
          onPress={() => handlePress(item.$id)}
          key={item.$id}
        >
          <Text
            className={cn(
              "body-medium",
              active === item.$id ? "text-white" : "text-gray-200"
            )}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.$id}
    />
  );
};
export default Filter;
