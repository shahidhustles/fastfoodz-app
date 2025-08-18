import LoadingScreen from "@/components/loading-screen";
import { images } from "@/constants";
import useUser from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import cn from "clsx";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

export default function TabLayout() {
  const { isAuthenticated, isLoading } = useUser();
  // Show loading screen while checking authentication
  if (isLoading) return <LoadingScreen />;
  // Redirect to sign-in if not authenticated
  if (!isAuthenticated) return <Redirect href={"/(auth)/sign-in"} />;

  //Slot : renders the content as it is
  // return <Slot />;
  const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => {
    return (
      <View className="tab-icon mb-5">
        <Image
          source={icon}
          className="size-7"
          resizeMode="contain"
          tintColor={focused ? "#f59e42" : "#5d5f6d"} // Amber color when focused
        />
        <Text
          className={cn(
            "text-sm font-bold",
            focused ? "text-primary" : "text-gray-200"
          )}
        >
          {title}
        </Text>
      </View>
    );
  };
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          borderBottomLeftRadius: 50,
          marginHorizontal: 20,
          height: 60,
          position: "absolute",
          bottom: 40,
          backgroundColor: "white",
          shadowColor: "#1a1a1a",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={images.home} title="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={images.search} title="Search" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerShown: false,
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={images.bag} title="Cart" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={images.person}
              title="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
