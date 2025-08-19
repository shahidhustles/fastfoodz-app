import { getCategories } from "@/actions/search/get-categories";
import { getMenu } from "@/actions/search/get-menu";
import CartButton from "@/components/cart-button";
import Filter from "@/components/filter";
import MenuCard from "@/components/menu-card";
import SearchBar from "@/components/search-bar";
import useAppwrite, { useAppwriteWithParams } from "@/hooks/useAppwrite";
import { Category, MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { category, query } = useLocalSearchParams<{
    query: string;
    category: string;
  }>();

  const params = useMemo(
    () => ({
      category: category || "",
      query: query || "",
      limit: 6,
    }),
    [category, query]
  );

  // Use the new cleaner hook - no need to memoize getMenu function
  const { data, loading} = useAppwriteWithParams(getMenu, params);

  const { data: categories } = useAppwrite(getCategories);

  // Optional: Manual refetch when params change (this is now handled automatically by the hook)
  // useEffect(() => {
  //   refetch(params);
  // }, [category, query, refetch]);

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#f59e0b" />
          <Text className="mt-4 text-gray-600">Loading menu items...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={(data as unknown as MenuItem[]) || []}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;
          return (
            <View
              className={cn(
                "flex-1 max-w-[48%]",
                !isFirstRightColItem ? "mt-10" : "mt-0"
              )}
            >
              <MenuCard item={item} />
            </View>
          );
        }}
        keyExtractor={(item) => item.$id.toString()}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">
                  Search
                </Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-dark-100">
                    Find your favorite food
                  </Text>
                </View>
              </View>
              <CartButton />
            </View>
            <SearchBar />
            <Filter categories={(categories as unknown as Category[]) || []} />
          </View>
        )}
        ListEmptyComponent={() => !loading && <Text>No results</Text>}
      />
    </SafeAreaView>
  );
};

export default Search;
