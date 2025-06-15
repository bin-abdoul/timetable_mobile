import { useLoginMutation } from "@/api/requests/auth.request";
import { useRouter } from "expo-router";
import { KeyRound, LucideIcon, Mail } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import "../../global.css";

interface IconTextInputProps extends TextInputProps {
  Icon: LucideIcon;
}

const IconTextInput: React.FC<IconTextInputProps> = ({
  Icon,
  ...textInputProps
}) => {
  return (
    <View className="flex-row items-center border-b border-gray-300 mb-5">
      <Icon color="gray" size={24} />
      <TextInput className="flex-1 ml-2 text-lg" {...textInputProps} />
    </View>
  );
};

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [login] = useLoginMutation();

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) return "Fill all fields";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Input a valid email";
    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      Alert.alert("Validation Error", error);
      return;
    }
    login({
      email: formData.email,
      password: formData.password,
    })
      .unwrap()
      .then((data) => {
        Alert.alert("Success", "Logged in successfully");
        console.log("Login Successful:", data);
        router.replace("/(tabs)");
      })
      .catch((error) => {
        console.log("Login error:", error);
        // Handle error, e.g., show an alert
        Alert.alert("Login Error", error.data?.message || "An error occurred");
      });

    // console.log(response);
    // router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white">
      <View className="p-10 items-end">
        {/* <Image
          source={require("../assets/images/Logo.png")}
          resizeMode="contain"
        /> */}
      </View>

      <View className="flex-1 justify-center bg-white px-6 py-10">
        <Text className="text-3xl font-bold my-10">Sign In</Text>

        <IconTextInput
          Icon={Mail}
          placeholder="Email Address"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <IconTextInput
          Icon={KeyRound}
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-[#5BBAC9] rounded-2xl mx-auto py-3 px-6 items-center mb-6"
        >
          <Text className="text-white text-xl font-bold">Sign In</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-gray-500">No Account? </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/auth/signup");
            }}
          >
            <Text className="text-[#5BBAC9] font-semibold underline">
              Create One
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
