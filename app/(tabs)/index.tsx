import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Sample timetable data 
const timetableData = [
  {
    day: "Monday",
    timeSlot: "8:00AM -- 10:00AM",
    courseCode: "CSC101",
    courseTitle: "Intro to Algorithms",
    lecturer: "Dr. Smith",
    venue: "Room A",
    creditUnit: "2",
    id: "1",
  },
  {
    day: "Monday",
    timeSlot: "4:00PM -- 6:00PM",
    courseCode: "GST111",
    courseTitle: "Intro to English I",
    lecturer: "Dr. Smith",
    venue: "Room A",
    creditUnit: "2",
    id: "2",
  },
  {
    day: "Wednesday",
    timeSlot: "10:00AM -- 12:00PM",
    courseCode: "MTH102",
    courseTitle: "Linear Algebra",
    lecturer: "Prof. Jane",
    venue: "Room B",
    creditUnit: "1",
    id: "3",
  },
  {
    day: "Tuesday",
    timeSlot: "12:00PM -- 1:00PM",
    courseCode: "PHY104",
    courseTitle: "Mechanics",
    lecturer: "Dr. Ray",
    venue: "Room C",
    creditUnit: "3",
    id: "4",
  },
  {
    day: "Friday",
    timeSlot: "8:00AM -- 10:00AM",
    courseCode: "PHY104",
    courseTitle: "Mechanics",
    lecturer: "Dr. Ray",
    venue: "Room C",
    creditUnit: "4",
    id: "5",
  },
  {
    day: "Thursday",
    timeSlot: "2:00PM -- 4:00PM",
    courseCode: "PHY104",
    courseTitle: "Mechanics",
    lecturer: "Dr. Ray",
    venue: "Room C",
    creditUnit: "4",
    id: "6",
  },
];

const ReadTimetablePage = () => {
  const [expandedDays, setExpandedDays] = useState<ExpandedDays>({});
  const [classes, setClasses] = useState(timetableData);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentClass, setCurrentClass] = useState<ClassData | null>(null);
  const [formData, setFormData] = useState({
    courseCode: '',
    courseTitle: '',
    lecturer: ''
  });

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
    day: string;
    timeSlot: string;
    courseCode: string;
    courseTitle: string;
    lecturer: string;
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

  const handleUpdate = () => {
    // Update the class in the array
    setClasses(prevClasses =>
      prevClasses.map(cls =>
        currentClass && cls.id === currentClass.id
          ? { ...cls, ...formData }
          : cls
      )
    );
    setUpdateModalVisible(false);
    Alert.alert('Success', 'Course updated successfully!');
  };

  const handleDelete = () => {
    setClasses(prevClasses =>
      prevClasses.filter(cls => currentClass && cls.id !== currentClass.id)
    );
    setDeleteModalVisible(false);
    Alert.alert('Success', 'Course deleted successfully!');
  };

  // Group classes by day
  const groupedClasses = classes.reduce((acc: Record<string, ClassData[]>, classItem) => {
    if (!acc[classItem.day]) {
      acc[classItem.day] = [];
    }
    acc[classItem.day].push(classItem);
    return acc;
  }, {} as Record<string, ClassData[]>);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const ClassCard = ({ classData }: { classData: ClassData }) => (
    <View className="border-2 border-gray-200 p-2 text-center flex flex-col gap-2 bg-white rounded-lg mb-2">
      <View className="flex-row justify-center items-center gap-1">
        <Text className="font-bold text-lg text-blue-600">
          {classData.courseCode} : {classData.creditUnit}
        </Text>
        <Ionicons name="star" size={20} color="#f97316" />
      </View>
      
      <Text className="text-sm font-medium text-red-900">{classData.courseTitle}</Text>
      <Text className="text-green-800 font-medium text-sm">{classData.lecturer}</Text>
      <Text className="text-sky-500 font-medium text-sm">{classData.venue}</Text>
      <Text className="text-gray-600 font-medium text-xs">{classData.timeSlot}</Text>

      <View className="flex-row justify-center gap-2 mt-2">
        <TouchableOpacity
          className="border border-gray-300 px-4 py-2 rounded-md"
          onPress={() => openUpdateModal(classData)}
        >
          <Text className="text-sm text-gray-700">Update</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className="bg-red-600 px-4 py-2 rounded-md"
          onPress={() => openDeleteModal(classData)}
        >
          <Text className="text-sm text-white">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const DayAccordion = ({ day }: { day: string }) => {
    const isExpanded = expandedDays[day];
    const dayClasses = groupedClasses[day] || [];
    const hasClasses = dayClasses.length > 0;

    return (
      <View className="bg-white mb-3 rounded-lg shadow-sm border border-gray-200">
        <TouchableOpacity
          className="flex-row justify-between items-center p-4 border-b border-gray-200"
          onPress={() => toggleDay(day)}
        >
          <Text className="text-lg font-semibold text-gray-800">{day}</Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-gray-600">
              {hasClasses ? `${dayClasses.length} class${dayClasses.length > 1 ? 'es' : ''}` : 'No classes'}
            </Text>
            <Ionicons
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#666"
            />
          </View>
        </TouchableOpacity>
        
        {isExpanded && (
          <View className="p-4">
            {hasClasses ? (
              dayClasses.map((classData) => (
                <ClassCard key={classData.id} classData={classData} />
              ))
            ) : (
              <View className="py-8 items-center">
                <Text className="text-gray-400 text-sm">No Class</Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 my-6">
      <View className="bg-white p-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800">Read Timetable</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {days.map((day) => (
          <DayAccordion key={day} day={day} />
        ))}
      </ScrollView>

      {/* Update Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={updateModalVisible}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            <Text className="text-xl font-semibold mb-2">Edit Course</Text>
            <Text className="text-gray-600 mb-4">Update course information and save changes.</Text>
            
            <View className="mb-4">
              <Text className="text-sm font-medium mb-2">Course Code</Text>
              <TextInput
                className="border border-gray-300 rounded-md px-3 py-2"
                value={formData.courseCode}
                onChangeText={(text) => setFormData({...formData, courseCode: text})}
                placeholder="Enter course code"
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-sm font-medium mb-2">Course Title</Text>
              <TextInput
                className="border border-gray-300 rounded-md px-3 py-2"
                value={formData.courseTitle}
                onChangeText={(text) => setFormData({...formData, courseTitle: text})}
                placeholder="Enter course title"
              />
            </View>
            
            <View className="mb-6">
              <Text className="text-sm font-medium mb-2">Lecturer</Text>
              <TextInput
                className="border border-gray-300 rounded-md px-3 py-2"
                value={formData.lecturer}
                onChangeText={(text) => setFormData({...formData, lecturer: text})}
                placeholder="Enter lecturer name"
              />
            </View>
            
            <View className="flex-row justify-end gap-2">
              <TouchableOpacity
                className="border border-gray-300 px-4 py-2 rounded-md"
                onPress={() => setUpdateModalVisible(false)}
              >
                <Text className="text-gray-700">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-600 px-4 py-2 rounded-md"
                onPress={handleUpdate}
              >
                <Text className="text-white">Save changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg p-6 w-11/12 max-w-sm">
            <Text className="text-xl font-semibold mb-2">Are you sure?</Text>
            <Text className="text-gray-600 mb-6">
              This will permanently remove the course from your timetable.
            </Text>
            
            <View className="flex-row justify-end gap-2">
              <TouchableOpacity
                className="border border-gray-300 px-4 py-2 rounded-md"
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text className="text-gray-700">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-600 px-4 py-2 rounded-md"
                onPress={handleDelete}
              >
                <Text className="text-white">Confirm Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ReadTimetablePage;