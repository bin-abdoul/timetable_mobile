import { useSignupMutation } from "@/api/requests/auth.request";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

import {
  Calendar,
  ChevronDown,
  CircleUser,
  Home,
  KeyRound,
  Mail,
  Phone,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUpScreen() {
  const router = useRouter();
  const [signup, { isLoading, error }] = useSignupMutation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    gender: "",
    birthdate: new Date().toString(),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState({
    day: 1,
    month: 1,
    year: new Date().getFullYear() - 18, 
  });

  const isFormValid = Object.values(formData).every(
    (v) => v !== "" && v !== null
  );

  const updateField = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!isFormValid) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    if (formData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }
    signup({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      surName: formData.lastName,
      address: formData.address,
      phoneNumber: formData.phone,
      gender: formData.gender,
      dob: formData.birthdate,
      role: "User",
    })
      .unwrap()
      .then((data) => {
        console.log("Signup Successful:", JSON.stringify(data));
        Alert.alert("Success", "Account created successfully");
        SecureStore.setItemAsync("token", data.data.token);
        router.replace("/(tabs)");
      })
      .catch((error) => {
        console.log("Signup error:", JSON.stringify(error, null, 2));
        Alert.alert("Signup Error", error.data.message || "An error occurred");
      });
  };

  const confirmDateSelection = () => {
    const selectedDate = new Date(
      tempDate.year,
      tempDate.month - 1,
      tempDate.day
    );
    updateField("birthdate", selectedDate);
    setShowDatePicker(false);
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 100; year <= currentYear - 5; year++) {
      years.push(year);
    }
    return years.reverse();
  };

  console.log("birthdate", formData.birthdate);
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  return (
    <ScrollView className="bg-white p-6">
      <Text className="text-3xl font-bold mb-6 text-gray-800">
        Create Account
      </Text>

      <InputField
        icon={<CircleUser color="#6B7280" size={20} />}
        placeholder="First Name"
        value={formData.firstName}
        onChange={(val) => updateField("firstName", val)}
      />
      <InputField
        icon={<CircleUser color="#6B7280" size={20} />}
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(val) => updateField("lastName", val)}
      />
      <InputField
        icon={<Mail color="#6B7280" size={20} />}
        placeholder="Email Address"
        value={formData.email}
        onChange={(val) => updateField("email", val)}
        keyboardType="email-address"
      />
      <InputField
        icon={<KeyRound color="#6B7280" size={20} />}
        placeholder="Password"
        value={formData.password}
        onChange={(val) => updateField("password", val)}
        secure
      />
      <InputField
        icon={<Home color="#6B7280" size={20} />}
        placeholder="Address"
        value={formData.address}
        onChange={(val) => updateField("address", val)}
      />
      <InputField
        icon={<Phone color="#6B7280" size={20} />}
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(val) => updateField("phone", val)}
        keyboardType="phone-pad"
      />

      {/* Gender Picker */}
      <View className="mb-4">
        <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-2 bg-gray-50">
          <CircleUser color="#6B7280" size={20} />
          <View className="flex-1 ml-3">
            <Picker
              selectedValue={formData.gender}
              onValueChange={(val) => updateField("gender", val)}
              style={{
                height: 50,
                color: formData.gender ? "#374151" : "#9CA3AF",
              }}
            >
              <Picker.Item
                label="Select Gender"
                value=""
                style={{ color: "#9CA3AF" }}
              />
              <Picker.Item
                label="Male"
                value="male"
                style={{ color: "#374151" }}
              />
              <Picker.Item
                label="Female"
                value="female"
                style={{ color: "#374151" }}
              />
              <Picker.Item
                label="Other"
                value="other"
                style={{ color: "#374151" }}
              />
            </Picker>
          </View>
          <ChevronDown color="#6B7280" size={16} />
        </View>
      </View>

      {/* Date of Birth picker button */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className="flex-row items-center border border-gray-300 rounded-xl px-4 py-4 mb-4 bg-gray-50"
      >
        <Calendar color="#6B7280" size={20} />
        <Text
          className={`ml-3 text-base flex-1 ${
            formData.birthdate ? "text-gray-700" : "text-gray-400"
          }`}
        >
          {formData.birthdate ? new Date(formData.birthdate).toLocaleDateString() : "Select Date of Birth"}
        </Text>
        <ChevronDown color="#6B7280" size={16} />
      </TouchableOpacity>

      {/* Custom Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <Text className="text-xl font-bold text-center mb-6 text-gray-800">
              Select Date of Birth
            </Text>

            <View className="flex-row justify-between mb-6">
              {/* Day Picker */}
              <View className="flex-1 mr-2">
                <Text className="text-sm font-medium text-gray-600 mb-2">
                  Day
                </Text>
                <View className="border border-gray-300 rounded-lg bg-gray-50">
                  <Picker
                    selectedValue={tempDate.day}
                    onValueChange={(val) =>
                      setTempDate((prev) => ({ ...prev, day: val }))
                    }
                    style={{ height: 120 }}
                  >
                    {Array.from(
                      { length: getDaysInMonth(tempDate.month, tempDate.year) },
                      (_, i) => (
                        <Picker.Item
                          key={i + 1}
                          label={String(i + 1)}
                          value={i + 1}
                        />
                      )
                    )}
                  </Picker>
                </View>
              </View>

              {/* Month Picker */}
              <View className="flex-1 mx-1">
                <Text className="text-sm font-medium text-gray-600 mb-2">
                  Month
                </Text>
                <View className="border border-gray-300 rounded-lg bg-gray-50">
                  <Picker
                    selectedValue={tempDate.month}
                    onValueChange={(val) =>
                      setTempDate((prev) => ({ ...prev, month: val }))
                    }
                    style={{ height: 120 }}
                  >
                    {months.map((month) => (
                      <Picker.Item
                        key={month.value}
                        label={month.label}
                        value={month.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              {/* Year Picker */}
              <View className="flex-1 ml-2">
                <Text className="text-sm font-medium text-gray-600 mb-2">
                  Year
                </Text>
                <View className="border border-gray-300 rounded-lg bg-gray-50">
                  <Picker
                    selectedValue={tempDate.year}
                    onValueChange={(val) =>
                      setTempDate((prev) => ({ ...prev, year: val }))
                    }
                    style={{ height: 120 }}
                  >
                    {generateYears().map((year) => (
                      <Picker.Item
                        key={year}
                        label={String(year)}
                        value={year}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            {/* Modal Actions */}
            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={() => setShowDatePicker(false)}
                className="flex-1 py-4 rounded-xl border border-gray-300"
              >
                <Text className="text-center text-gray-600 font-semibold text-base">
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmDateSelection}
                className="flex-1 py-4 rounded-xl bg-[#5BBAC9]"
              >
                <Text className="text-center text-white font-semibold text-base">
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        disabled={!isFormValid}
        onPress={handleSubmit}
        className={`mt-8 p-4 rounded-2xl ${
          isFormValid ? "bg-[#5BBAC9]" : "bg-gray-400"
        }`}
      >
        <Text className="text-white text-center font-bold text-xl">
          Create Account
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function InputField({
  icon,
  placeholder,
  value,
  onChange,
  secure = false,
  keyboardType = "default",
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  secure?: boolean;
  keyboardType?: React.ComponentProps<typeof TextInput>["keyboardType"];
}) {
  return (
    <View className="flex-row items-center border-b border-gray-300 py-3 mb-3">
      {icon}
      <TextInput
        className="flex-1 ml-3 text-lg"
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secure}
        keyboardType={keyboardType}
      />
    </View>
  );
}
