import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddCoursePage from "./addCourse";
import ReadTimetablePage from "./readTimetable";

const tabs = [
  { key: "readTimetable", label: "Read Timetable" },
  { key: "addCourse", label: "Add Course" },
  { key: "logOut", label: "Log Out" },
] as const;

type Page = (typeof tabs)[number]["key"];

export default function MainScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<Page>("readTimetable");

  // Form state for Add Course
  type CourseData = {
    title: string;
    code: string;
    lecturer: string;
    venue: string;
    creditUnit: string;
    day: string;
    time: string;
  };

  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    code: "",
    lecturer: "",
    venue: "",
    creditUnit: "",
    day: "",
    time: "",
  });

  const navigate = (page: Page) => {
    if (page === "logOut") {
      Alert.alert("Log Out", "Are you sure you want to log out?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          onPress: () => {
            router.replace("/");
          },
        },
      ]);
      return;
    }

    setSelected(page);
  };

  const handleAddCourse = () => {
    // Validate form
    if (!courseData.title || !courseData.code || !courseData.lecturer) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // Handle course creation logic here
    Alert.alert("Success", "Course added successfully!");

    // Reset form
    setCourseData({
      title: "",
      code: "",
      lecturer: "",
      venue: "",
      creditUnit: "",
      day: "",
      time: "",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Stack.Screen
        options={{
          title: "Main",
          headerShown: false,
        }}
      />

      {/* Custom Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800">
          Main Page
        </Text>
      </View>

      {/* Tab Bar */}
      <View className="flex-row bg-gray-100 px-4 py-3 border-b border-gray-200">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => navigate(tab.key)}
            className={`flex-1 py-3 mx-1 rounded-lg items-center ${
              selected === tab.key ? "bg-[#5BBAC9]" : "bg-gray-200"
            }`}
          >
            <Text
              className={`text-base font-medium ${
                selected === tab.key ? "text-white" : "text-gray-600"
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content Pages */}
      {selected === "readTimetable" && <ReadTimetablePage />}
      {selected === "addCourse" && (
        <AddCoursePage
          courseData={courseData}
          setCourseData={setCourseData}
          handleAddCourse={handleAddCourse}
        />
      )}
    </SafeAreaView>
  );
}