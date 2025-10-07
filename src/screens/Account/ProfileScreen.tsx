import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useAppSelector } from "../../store/hooks";
import { accountStyles } from "./styles";
import AccountHeader from "../../components/AccountHeader";

interface ProfileScreenProps {
  navigation?: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user } = useAppSelector((state) => state.auth);

  const [displayName, setDisplayName] = useState(user?.display_name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleSave = () => {
    // TODO: Implement save profile logic
    Alert.alert("Thành công", "Thông tin đã được cập nhật!");
  };

  return (
    <View style={accountStyles.container}>
      <AccountHeader title="Thông tin cá nhân" onBackPress={handleBack} />

      <ScrollView style={accountStyles.content}>
        <View style={accountStyles.form}>
          <View style={accountStyles.inputGroup}>
            <Text style={accountStyles.label}>Tên hiển thị</Text>
            <TextInput
              style={accountStyles.input}
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Nhập tên hiển thị"
            />
          </View>

          <View style={accountStyles.inputGroup}>
            <Text style={accountStyles.label}>Email</Text>
            <TextInput
              style={accountStyles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Nhập email"
              keyboardType="email-address"
            />
          </View>

          <TouchableOpacity
            style={accountStyles.editButton}
            onPress={handleSave}
          >
            <Text style={accountStyles.editButtonText}>Lưu thay đổi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
