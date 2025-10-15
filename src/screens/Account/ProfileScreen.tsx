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

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isEditingDisplayName, setIsEditingDisplayName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleSave = () => {
    // TODO: Implement save profile logic
    Alert.alert("Thành công", "Thông tin đã được cập nhật!");
    setIsEditingDisplayName(false);
    setIsEditingEmail(false);
  };

  const toggleEditDisplayName = () => {
    setIsEditingDisplayName(!isEditingDisplayName);
  };

  const toggleEditEmail = () => {
    setIsEditingEmail(!isEditingEmail);
  };

  return (
    <View style={accountStyles.container}>
      <AccountHeader title="Thông tin cá nhân" userName={user?.displayName || "Leslie Gilliams"} userAvatar={user?.avatarUrl} onBackPress={handleBack} />

      <ScrollView style={accountStyles.content}>
        <View style={accountStyles.form}>
          {/* Name - Read only */}
          <View style={accountStyles.inputGroup}>
            <Text style={accountStyles.label}>Tên đăng nhập</Text>
            <View style={accountStyles.readOnlyField}>
              <Text style={accountStyles.readOnlyText}>
                {user?.username || "phat123"}
              </Text>
            </View>
          </View>

          {/* Display Name - Editable */}
          <View style={accountStyles.inputGroup}>
            <Text style={accountStyles.label}>Tên hiển thị</Text>
            <TouchableOpacity
              style={accountStyles.editableField}
              onPress={toggleEditDisplayName}
              activeOpacity={0.7}
            >
              {isEditingDisplayName ? (
                <TextInput
                  style={accountStyles.input}
                  value={displayName}
                  onChangeText={setDisplayName}
                  placeholder="Nhập tên hiển thị"
                  autoFocus
                  onSubmitEditing={toggleEditDisplayName}
                />
              ) : (
                <Text style={accountStyles.fieldText}>
                  {displayName || "Chưa có tên hiển thị"}
                </Text>
              )}
              <TouchableOpacity
                style={accountStyles.editIcon}
                onPress={toggleEditDisplayName}
              >
                <Text style={accountStyles.editIconText}>
                  {isEditingDisplayName ? "✓" : "✏️"}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* Email - Editable */}
          <View style={accountStyles.inputGroup}>
            <Text style={accountStyles.label}>Email</Text>
            <TouchableOpacity
              style={accountStyles.editableField}
              onPress={toggleEditEmail}
              activeOpacity={0.7}
            >
              {isEditingEmail ? (
                <TextInput
                  style={accountStyles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Nhập email"
                  keyboardType="email-address"
                  autoFocus
                  onSubmitEditing={toggleEditEmail}
                />
              ) : (
                <Text style={accountStyles.fieldText}>
                  {email || "Chưa có email"}
                </Text>
              )}
              <TouchableOpacity
                style={accountStyles.editIcon}
                onPress={toggleEditEmail}
              >
                <Text style={accountStyles.editIconText}>
                  {isEditingEmail ? "✓" : "✏️"}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* Save Button - Only show when editing */}
          {(isEditingDisplayName || isEditingEmail) && (
            <TouchableOpacity
              style={accountStyles.saveButton}
              onPress={handleSave}
            >
              <Text style={accountStyles.saveButtonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
