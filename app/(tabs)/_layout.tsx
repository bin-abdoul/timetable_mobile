import { HapticTab } from "@/components/HapticTab";
import { router, Tabs } from "expo-router";
import { BoxIcon, LogOutIcon, PlusIcon } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#5BBAC9",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarStyle: {
          bottom: 25,
          elevation: 20,
          height: 65,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "View TimeTable",
          tabBarIcon: ({ color }) => (
            <BoxIcon height={30} width={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add-course"
        options={{
          title: "Add Course",
          tabBarIcon: ({ color }) => (
            <PlusIcon color={color} height={30} width={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          tabBarButton: (props) => (
            <View className="  flex-row justify-center items-center p-5">
              <TouchableOpacity
                className=" "
                onPress={() => {
                  router.dismissTo("/auth");
                }}
              >
                <LogOutIcon color={"gray"} />
                <Text className="text-gray-500">Log Out</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
