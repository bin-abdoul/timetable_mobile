import {
  useDeleteSubjectMutation,
  useUpdateSubjectMutation,
  useViewTimetableQuery,
} from "@/api/requests/subjects.request";
import { ChevronDown, ChevronUp, Star } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ReadTimetablePage = () => {
  const { data: timetableData } = useViewTimetableQuery() as {
    data: {
      day: string;
      time: string;
      courseCode: string;
      subjectName: string;
      courseLecturer: string;
      subjectVenue: string;
      creditUnit: string;
      _id: string;
    }[];
  };
  const [updateSubject] = useUpdateSubjectMutation();
  const [deleteSubject] = useDeleteSubjectMutation();
  // console.log()

  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentClass, setCurrentClass] = useState<ClassData | null>(null);
  const [formData, setFormData] = useState({
    courseCode: "",
    courseTitle: "",
    lecturer: "",
  });

  console.log("Timetable Data:", JSON.stringify(timetableData, null, 2));

  const classes = Array.isArray(timetableData)
    ? timetableData.map((subject) => ({
        day: subject.day,
        time: subject.time,
        courseCode: subject.courseCode,
        courseTitle: subject.subjectName,
        lecturer: subject.courseLecturer,
        venue: subject.subjectVenue,
        creditUnit: subject.creditUnit,
        id: subject._id,
      }))
    : [];

  interface ExpandedDays {
    [day: string]: boolean;
  }

  const toggleDay = (day: string): void => {
    setExpandedDays((prev: ExpandedDays) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  interface ClassData {
    courseCode: string;
    courseTitle: string;
    lecturer: string;
    day: string;
    time: string;
    venue: string;
    creditUnit: string;
    id: string;
  }

  interface FormData {
    courseCode: string;
    courseTitle: string;
    lecturer: string;
  }

  const openUpdateModal = (classData: ClassData): void => {
    setCurrentClass(classData);
    setFormData({
      courseCode: classData.courseCode,
      courseTitle: classData.courseTitle,
      lecturer: classData.lecturer,
    });
    setUpdateModalVisible(true);
  };

  const openDeleteModal = (classData: ClassData): void => {
    setCurrentClass(classData);
    setDeleteModalVisible(true);
  };

  const handleUpdate = async () => {
    if (!currentClass) return;

    try {
      await updateSubject({
        id: currentClass.id,
        subjectName: formData.courseTitle,
        courseCode: formData.courseCode,
        courseLecturer: formData.lecturer,
      });
      setUpdateModalVisible(false);
      Alert.alert("Success", "Course updated successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to update course");
    }
  };

  const handleDelete = async () => {
    if (!currentClass) return;

    try {
      await deleteSubject(currentClass.id);
      setDeleteModalVisible(false);
      Alert.alert("Success", "Course deleted successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to delete course");
    }
  };

  const groupedClasses: Record<string, ClassData[]> = {};
  classes.forEach((classItem) => {
    if (!groupedClasses[classItem.day]) {
      groupedClasses[classItem.day] = [];
    }
    groupedClasses[classItem.day].push(classItem);
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const ClassCard = ({ classData }: { classData: ClassData }) => (
    <View className="border border-gray-200 p-3 bg-white rounded-lg mb-2">
      <View className="flex-row items-center justify-center mb-2">
        <Text className="font-bold text-blue-600">
          {classData.courseCode} ({classData.creditUnit} units)
        </Text>
        <Star fill="#f97316" size={16} color="#f97316" className="ml-1" />
      </View>

      <Text className="text-center font-medium text-red-900 mb-1">
        {classData.courseTitle}
      </Text>
      <Text className="text-center text-green-800 text-sm mb-1">
        {classData.lecturer}
      </Text>
      <Text className="text-center text-sky-500 text-sm mb-1">
        {classData.venue}
      </Text>
      <Text className="text-center text-gray-600 text-xs mb-3">
        {classData.time}
      </Text>

      <View className="flex-row justify-center gap-2">
        <TouchableOpacity
          className="border border-gray-300 px-3 py-1 rounded"
          onPress={() => openUpdateModal(classData)}
        >
          <Text className="text-gray-700 text-sm">Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-red-600 px-3 py-1 rounded"
          onPress={() => openDeleteModal(classData)}
        >
          <Text className="text-white text-sm">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const DaySection = ({ day }: { day: string }) => {
    const isExpanded = expandedDays[day];
    const dayClasses = groupedClasses[day] || [];
    const hasClasses = dayClasses.length > 0;

    return (
      <View className="bg-white mb-3 rounded-lg border border-gray-200">
        <TouchableOpacity
          className="flex-row justify-between items-center p-4"
          onPress={() => toggleDay(day)}
        >
          <Text className="text-lg font-semibold">{day}</Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-gray-600">
              {hasClasses ? `${dayClasses.length} classes` : "No classes"}
            </Text>
            {isExpanded ? (
              <ChevronUp size={20} color="#666" />
            ) : (
              <ChevronDown size={20} color="#666" />
            )}
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View className="p-4 border-t border-gray-200">
            {hasClasses ? (
              dayClasses.map((classData) => (
                <ClassCard key={classData.id} classData={classData} />
              ))
            ) : (
              <Text className="text-center text-gray-400 py-4">
                No classes today
              </Text>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white p-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-center">My Timetable</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {days.map((day) => (
          <DaySection key={day} day={day} />
        ))}
      </ScrollView>

      {/* //update modal */}
      <Modal
        visible={updateModalVisible}
        transparent={true}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg p-6 w-11/12">
            <Text className="text-xl font-bold mb-4">Edit Course</Text>

            <Text className="text-sm font-medium mb-1">Course Code</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-3"
              value={formData.courseCode}
              onChangeText={(text) =>
                setFormData({ ...formData, courseCode: text })
              }
            />

            <Text className="text-sm font-medium mb-1">Course Title</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-3"
              value={formData.courseTitle}
              onChangeText={(text) =>
                setFormData({ ...formData, courseTitle: text })
              }
            />

            <Text className="text-sm font-medium mb-1">Lecturer</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              value={formData.lecturer}
              onChangeText={(text) =>
                setFormData({ ...formData, lecturer: text })
              }
            />

            <View className="flex-row justify-end gap-2">
              <TouchableOpacity
                className="border border-gray-300 px-4 py-2 rounded"
                onPress={() => setUpdateModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-600 px-4 py-2 rounded"
                onPress={handleUpdate}
              >
                <Text className="text-white">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* // delete modal */}
      <Modal
        visible={deleteModalVisible}
        transparent={true}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg p-6 w-11/12">
            <Text className="text-xl font-bold mb-2">Delete Course?</Text>
            <Text className="text-gray-600 mb-4">
              This will remove the course from your timetable.
            </Text>

            <View className="flex-row justify-end gap-2">
              <TouchableOpacity
                className="border border-gray-300 px-4 py-2 rounded"
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-600 px-4 py-2 rounded"
                onPress={handleDelete}
              >
                <Text className="text-white">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ReadTimetablePage;
