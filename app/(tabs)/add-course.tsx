import { useAddSubjectMutation } from "@/api/requests/subjects.request";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type CourseData = {
  subjectName: string;
  courseCode: string;
  courseLecturer: string;
  subjectVenue: string;
  creditUnit: string;
  day: string;
  time: string;
};

export default function AddCoursePage() {
  const [courseData, setCourseData] = useState<CourseData>({
    courseCode: "",
    creditUnit: "",
    day: "",
    courseLecturer: "",
    time: "",
    subjectName: "",
    subjectVenue: "",
  });
  const [addCourse] = useAddSubjectMutation();

  const handleAddCourse = async () => {
    if (
      !courseData.subjectName ||
      !courseData.courseCode ||
      !courseData.courseLecturer
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }
    try {
      await addCourse({
        subjectName: courseData.subjectName,
        courseCode: courseData.courseCode,
        courseLecturer: courseData.courseLecturer,
        subjectVenue: courseData.subjectVenue,
        creditUnit: courseData.creditUnit,
        day: courseData.day,
        time: courseData.time,
      }).unwrap();

      Alert.alert("Success", "Course added successfully!");
    } catch (error) {
      Alert.alert("Error", `Failed to add course ${error.data.message}`);
      console.error("Error adding course:", JSON.stringify(error, null, 2));
    }

    setCourseData({
      subjectName: "",
      courseCode: "",
      courseLecturer: "",
      subjectVenue: "",
      creditUnit: "",
      day: "",
      time: "",
    });
  };
  return (
    <SafeAreaView className="flex-1 my-10 bg-white">
      <View className="px-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6">
          Create Course
        </Text>

        <View className="flex-row mb-4">
          <View className="flex-1 mr-2">
            <Text className="text-base font-medium text-gray-700 mb-2">
              Course title
            </Text>
            <TextInput
              className="bg-[#B8E6E6] p-3 rounded-lg text-gray-700"
              placeholder="Subject title"
              value={courseData.subjectName}
              onChangeText={(text) =>
                setCourseData((prev) => ({ ...prev, subjectName: text }))
              }
            />
          </View>

          <View className="flex-1 ml-2">
            <Text className="text-base font-medium text-gray-700 mb-2">
              Course Code
            </Text>
            <TextInput
              className="bg-[#B8E6E6] p-3 rounded-lg text-gray-700"
              placeholder="Subject Code"
              value={courseData.courseCode}
              onChangeText={(text) =>
                setCourseData((prev) => ({ ...prev, courseCode: text }))
              }
            />
          </View>
        </View>

        <View className="flex-row mb-4">
          <View className="flex-1 mr-2">
            <Text className="text-base font-medium text-gray-700 mb-2">
              Course Lecturer
            </Text>
            <TextInput
              className="bg-[#B8E6E6] p-3 rounded-lg text-gray-700"
              placeholder="Course Lecturer"
              value={courseData.courseLecturer}
              onChangeText={(text) =>
                setCourseData((prev) => ({ ...prev, courseLecturer: text }))
              }
            />
          </View>

          <View className="flex-1 ml-2">
            <Text className="text-base font-medium text-gray-700 mb-2">
              Venue
            </Text>
            <View className="bg-[#B8E6E6] rounded-lg border border-gray-300">
              <Picker
                selectedValue={courseData.subjectVenue}
                onValueChange={(value) =>
                  setCourseData((prev) => ({ ...prev, subjectVenue: value }))
                }
                style={{
                  color: courseData.subjectVenue ? "#374151" : "#9CA3AF",
                  height: 50,
                }}
                itemStyle={{
                  color: "#374151",
                  fontSize: 16,
                }}
              >
                <Picker.Item
                  label="Select Venue"
                  value=""
                  style={{ color: "#9CA3AF" }}
                />
                <Picker.Item label="Room A" value="Room A" />
                <Picker.Item label="Room B" value="Room B" />
                <Picker.Item label="Room C" value="Room C" />
                <Picker.Item label="Room D" value="Room D" />
                <Picker.Item label="Room E" value="Room E" />
              </Picker>
            </View>
          </View>
        </View>

        <View className="flex-row mb-6">
          <View className="flex-1 mr-2">
            <Text className="text-base font-medium text-gray-700 mb-2">
              Credit Unit
            </Text>
            <View className="bg-[#B8E6E6] rounded-lg border border-gray-300">
              <Picker
                selectedValue={courseData.creditUnit}
                onValueChange={(value) =>
                  setCourseData((prev) => ({ ...prev, creditUnit: value }))
                }
                style={{
                  color: courseData.creditUnit ? "#374151" : "#9CA3AF",
                  height: 50,
                }}
                itemStyle={{
                  color: "#374151",
                  fontSize: 16,
                }}
              >
                <Picker.Item
                  label="Credit Unit"
                  value=""
                  style={{ color: "#9CA3AF" }}
                />
                <Picker.Item label="1" value="one" />
                <Picker.Item label="2" value="two" />
                <Picker.Item label="3" value="three" />
                <Picker.Item label="4" value="four" />
              </Picker>
            </View>
          </View>

          <View className="flex-1 mx-1">
            <Text className="text-base font-medium text-gray-700 mb-2">
              Day
            </Text>
            <View className="bg-[#B8E6E6] rounded-lg border border-gray-300">
              <Picker
                selectedValue={courseData.day}
                onValueChange={(value) =>
                  setCourseData((prev) => ({ ...prev, day: value }))
                }
                style={{
                  color: courseData.day ? "#374151" : "#9CA3AF",
                  height: 50,
                }}
                itemStyle={{
                  color: "#374151",
                  fontSize: 16,
                }}
              >
                <Picker.Item
                  label="Select Day"
                  value=""
                  style={{ color: "#9CA3AF" }}
                />
                <Picker.Item label="Monday" value="Monday" />
                <Picker.Item label="Tuesday" value="Tuesday" />
                <Picker.Item label="Wednesday" value="Wednesday" />
                <Picker.Item label="Thursday" value="Thursday" />
                <Picker.Item label="Friday" value="Friday" />
              </Picker>
            </View>
          </View>

          <View className="flex-1 ml-2">
            <Text className="text-base font-medium text-gray-700 mb-2">
              Time
            </Text>
            <View className="bg-[#B8E6E6] rounded-lg border border-gray-300">
              <Picker
                selectedValue={courseData.time}
                onValueChange={(value) =>
                  setCourseData((prev) => ({ ...prev, time: value }))
                }
                style={{
                  color: courseData.time ? "#374151" : "#9CA3AF",
                  height: 50,
                }}
                itemStyle={{
                  color: "#374151",
                  fontSize: 16,
                }}
              >
                <Picker.Item
                  label="Select Time"
                  value=""
                  style={{ color: "#9CA3AF" }}
                />
                <Picker.Item label="8:00 -- 10:00" value="8:00 -- 10:00" />
                <Picker.Item label="10:00 -- 12:00" value="10:00 -- 12:00" />
                <Picker.Item label="12:00 -- 1:00" value="12:00 -- 2:00" />
                <Picker.Item label="2:00 -- 4:00" value="2:00 -- 4:00" />
                <Picker.Item label="4:00 -- 6:00" value="4:00 -- 6:00" />
              </Picker>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleAddCourse}
          className="bg-[#5BBAC9] py-4 rounded-lg items-center"
        >
          <Text className="text-white text-lg font-semibold">Add Course</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
