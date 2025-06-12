import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    ScrollView,
    Alert,
    SafeAreaView,
    StatusBar 
  } from "react-native";
import { Picker } from '@react-native-picker/picker';
import React from 'react'

export default function AddCoursePage({ 
    courseData, 
    setCourseData, 
    handleAddCourse 
  }: {
    courseData: {
      title: string;
      code: string;
      lecturer: string;
      venue: string;
      creditUnit: string;
      day: string;
      time: string;
    };
    setCourseData: React.Dispatch<React.SetStateAction<{
      title: string;
      code: string;
      lecturer: string;
      venue: string;
      creditUnit: string;
      day: string;
      time: string;
    }>>;
    handleAddCourse: () => void;
  }) {
    return (
      <ScrollView className="flex-1 p-6 bg-white">
        <Text className="text-2xl font-bold text-gray-800 mb-6">Create Course</Text>
        
        <View className="flex-row mb-4">
          <View className="flex-1 mr-2">
            <Text className="text-base font-medium text-gray-700 mb-2">Course title</Text>
            <TextInput
              className="bg-[#B8E6E6] p-3 rounded-lg text-gray-700"
              placeholder="Subject title"
              value={courseData.title}
              onChangeText={(text) => setCourseData((prev) => ({...prev, title: text}))}
            />
          </View>
          
          <View className="flex-1 ml-2">
            <Text className="text-base font-medium text-gray-700 mb-2">Course Code</Text>
            <TextInput
              className="bg-[#B8E6E6] p-3 rounded-lg text-gray-700"
              placeholder="Subject Code"
              value={courseData.code}
              onChangeText={(text) => setCourseData(prev => ({...prev, code: text}))}
            />
          </View>
        </View>
  
        <View className="flex-row mb-4">
          <View className="flex-1 mr-2">
            <Text className="text-base font-medium text-gray-700 mb-2">Course Lecturer</Text>
            <TextInput
              className="bg-[#B8E6E6] p-3 rounded-lg text-gray-700"
              placeholder="Course Lecturer"
              value={courseData.lecturer}
              onChangeText={(text) => setCourseData(prev => ({...prev, lecturer: text}))}
            />
          </View>
          
          <View className="flex-1 ml-2">
            <Text className="text-base font-medium text-gray-700 mb-2">Venue</Text>
            <View className="bg-[#B8E6E6] rounded-lg border border-gray-300">
              <Picker
                selectedValue={courseData.venue}
                onValueChange={(value) => setCourseData(prev => ({...prev, venue: value}))}
                style={{ 
                  color: courseData.venue ? '#374151' : '#9CA3AF',
                  height: 50
                }}
                itemStyle={{ 
                  color: '#374151',
                  fontSize: 16 
                }}
              >
                <Picker.Item 
                  label="Select Venue" 
                  value="" 
                  style={{ color: '#9CA3AF' }}
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
            <Text className="text-base font-medium text-gray-700 mb-2">Credit Unit</Text>
            <View className="bg-[#B8E6E6] rounded-lg border border-gray-300">
              <Picker
                selectedValue={courseData.creditUnit}
                onValueChange={(value) => setCourseData(prev => ({...prev, creditUnit: value}))}
                style={{ 
                  color: courseData.creditUnit ? '#374151' : '#9CA3AF',
                  height: 50
                }}
                itemStyle={{ 
                  color: '#374151',
                  fontSize: 16 
                }}
              >
                <Picker.Item 
                  label="Credit Unit" 
                  value="" 
                  style={{ color: '#9CA3AF' }}
                />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
              </Picker>
            </View>
          </View>
          
          <View className="flex-1 mx-1">
            <Text className="text-base font-medium text-gray-700 mb-2">Day</Text>
            <View className="bg-[#B8E6E6] rounded-lg border border-gray-300">
              <Picker
                selectedValue={courseData.day}
                onValueChange={(value) => setCourseData(prev => ({...prev, day: value}))}
                style={{ 
                  color: courseData.day ? '#374151' : '#9CA3AF',
                  height: 50
                }}
                itemStyle={{ 
                  color: '#374151',
                  fontSize: 16 
                }}
              >
                <Picker.Item 
                  label="Select Day" 
                  value="" 
                  style={{ color: '#9CA3AF' }}
                />
                <Picker.Item label="Monday" value="Monday" />
                <Picker.Item label="Tuesday" value="Tuesday" />
                <Picker.Item label="Wednesday" value="Wednesday" />
                <Picker.Item label="Thursday" value="Thursday" />
                <Picker.Item label="Friday" value="Friday" />
                <Picker.Item label="Saturday" value="Saturday" />
              </Picker>
            </View>
          </View>
          
          <View className="flex-1 ml-2">
            <Text className="text-base font-medium text-gray-700 mb-2">Time</Text>
            <View className="bg-[#B8E6E6] rounded-lg border border-gray-300">
              <Picker
                selectedValue={courseData.time}
                onValueChange={(value) => setCourseData(prev => ({...prev, time: value}))}
                style={{ 
                  color: courseData.time ? '#374151' : '#9CA3AF',
                  height: 50
                }}
                itemStyle={{ 
                  color: '#374151',
                  fontSize: 16 
                }}
              >
                <Picker.Item 
                  label="Select Time" 
                  value="" 
                  style={{ color: '#9CA3AF' }}
                />
                <Picker.Item label="8:00 AM -- 10:00 AM" value="8:00 AM -- 10:00 AM" />
                <Picker.Item label="10:00 AM -- 12:00 PM" value="10:00 AM -- 12:00 PM" />
                <Picker.Item label="12:00 PM -- 1:00 PM" value="12:00 PM -- 1:00 PM" />
                <Picker.Item label="2:00 PM -- 4:00 PM" value="2:00 PM -- 4:00 PM" />
                <Picker.Item label="4:00 PM -- 6:00 PM" value="4:00 PM -- 6:00 PM" />
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
      </ScrollView>
    );
  }