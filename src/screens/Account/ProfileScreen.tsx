import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAppSelector } from "../../store/hooks";
import { useUserProfile } from "../../hooks/useUserProfile";
import { accountStyles } from "./styles";
import AccountHeader from "../../components/AccountHeader";
import EmailOTPModal from "../../components/EmailOTPModal";

interface ProfileScreenProps {
  navigation?: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user } = useAppSelector((state) => state.auth);
  const {
    isLoading,
    updateDisplayName,
    requestEmailChange,
    verifyEmailChange,
    resendEmailChangeOTP,
    changeAvatar,
  } = useUserProfile()

  // Form states
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");

  // Original values for comparison
  const [originalDisplayName] = useState(user?.displayName || "");
  const [originalEmail] = useState(user?.email || "");

  // UI states
  const [isEditingDisplayName, setIsEditingDisplayName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [showEmailOTPModal, setShowEmailOTPModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [isUpdatingField, setIsUpdatingField] = useState<string | null>(null);

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  // Check if field has changed
  const hasDisplayNameChanged = displayName.trim() !== originalDisplayName;
  const hasEmailChanged = email.trim() !== originalEmail;

  // Update display name
  const handleSaveDisplayName = async () => {
    if (!hasDisplayNameChanged) {
      setIsEditingDisplayName(false);
      return;
    }

    if (displayName.trim().length < 2) {
      Alert.alert("Lỗi", "Tên hiển thị phải có ít nhất 2 ký tự");
      return;
    }

    setIsUpdatingField("displayName");
    const success = await updateDisplayName(displayName.trim());

    if (success) {
      setIsEditingDisplayName(false);
    }
    setIsUpdatingField(null);
  };

  // Handle email change - request OTP
  const handleSaveEmail = async () => {
    if (!hasEmailChanged) {
      setIsEditingEmail(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Lỗi", "Email không hợp lệ");
      return;
    }

    if (email.trim() === originalEmail) {
      Alert.alert("Thông báo", "Email mới phải khác email hiện tại");
      return;
    }

    setIsUpdatingField("email");

    try {
      const success = await requestEmailChange(email.trim());
      if (success) {
        setPendingEmail(email.trim());
        setShowEmailOTPModal(true);
        setIsEditingEmail(false);
      }
    } catch (error) {
      console.error("Request email change error:", error);
    } finally {
      setIsUpdatingField(null);
    }
  };

  // Handle avatar change through AccountHeader
  // Handle avatar change with options
const handleChangeAvatar = async () => {
  Alert.alert(
    "Thay đổi ảnh đại diện",
    "Chọn nguồn ảnh",
    [
      {
        text: "Chụp ảnh",
        onPress: () => takePhoto(),
      },
      {
        text: "Chọn từ thư viện",
        onPress: () => pickFromLibrary(),
      },
      {
        text: "Hủy",
        style: "cancel",
      },
    ],
    { cancelable: true }
  );
};

const takePhoto = async () => {
  try {
    // Request camera permissions
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Quyền truy cập bị từ chối",
        "Vui lòng cấp quyền truy cập camera để chụp ảnh"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      console.log("Selected image URI:", imageUri); // Debug log
      
      setIsUpdatingField("avatar");
      const success = await changeAvatar(imageUri);
      setIsUpdatingField(null);

      if (success) {
        Alert.alert("Thành công", "Đã cập nhật ảnh đại diện");
      }
    }
  } catch (error) {
    console.error("Take photo error:", error);
    Alert.alert("Lỗi", "Không thể chụp ảnh");
    setIsUpdatingField(null);
  }
};

const pickFromLibrary = async () => {
  try {
    // Request media library permissions
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Quyền truy cập bị từ chối",
        "Vui lòng cấp quyền truy cập thư viện ảnh"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      console.log("Selected image URI:", imageUri); // Debug log
      
      setIsUpdatingField("avatar");
      const success = await changeAvatar(imageUri);
      setIsUpdatingField(null);

      if (success) {
        Alert.alert("Thành công", "Đã cập nhật ảnh đại diện");
      }
    }
  } catch (error) {
    console.error("Pick image error:", error);
    Alert.alert("Lỗi", "Không thể chọn ảnh");
    setIsUpdatingField(null);
  }
};

  // Handle email verification success
  const handleEmailVerificationSuccess = () => {
    setShowEmailOTPModal(false);
    setPendingEmail("");
    // Email will be updated via Redux store
  };

  // Handle email modal cancel
  const handleEmailModalCancel = () => {
    setShowEmailOTPModal(false);
    setEmail(originalEmail); // Reset email to original
    setPendingEmail("");
  };

  // Sync with Redux store updates
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  return (
    <>
      <View style={accountStyles.container}>
        {/* AccountHeader with integrated avatar edit */}
        <AccountHeader
          title="Thông tin cá nhân"
          userName={user?.displayName || "User"}
          userAvatar={user?.avatarUrl}
          onBackPress={handleBack}
          enableAvatarEdit={true} 
          onAvatarPress={handleChangeAvatar}
          isUpdatingAvatar={isUpdatingField === "avatar"}
        />

        <ScrollView style={accountStyles.content}>
          <View style={accountStyles.form}>
            {/* Username - Read only */}
            <View style={accountStyles.inputGroup}>
              <Text style={accountStyles.label}>Tên đăng nhập</Text>
              <View style={accountStyles.readOnlyField}>
                <Text style={accountStyles.readOnlyText}>
                  {user?.username || "Chưa cập nhật"}
                </Text>
              </View>
            </View>

            {/* Display Name - Editable */}
            <View style={accountStyles.inputGroup}>
              <Text style={accountStyles.label}>Tên hiển thị</Text>
              <TouchableOpacity
                style={[
                  accountStyles.editableField,
                  hasDisplayNameChanged && profileStyles.changedField,
                ]}
                onPress={() => setIsEditingDisplayName(!isEditingDisplayName)}
                activeOpacity={0.7}
              >
                {isEditingDisplayName ? (
                  <TextInput
                    style={accountStyles.input}
                    value={displayName}
                    onChangeText={setDisplayName}
                    placeholder="Nhập tên hiển thị"
                    autoFocus
                    onSubmitEditing={handleSaveDisplayName}
                    editable={isUpdatingField !== "displayName"}
                  />
                ) : (
                  <Text style={accountStyles.fieldText}>
                    {displayName || "Chưa có tên hiển thị"}
                  </Text>
                )}

                <TouchableOpacity
                  style={accountStyles.editIcon}
                  onPress={
                    isEditingDisplayName
                      ? handleSaveDisplayName
                      : () => setIsEditingDisplayName(true)
                  }
                  disabled={isUpdatingField === "displayName"}
                >
                  {isUpdatingField === "displayName" ? (
                    <ActivityIndicator size="small" color="#FF6B35" />
                  ) : (
                    <Text style={accountStyles.editIconText}>
                      {isEditingDisplayName ? "✓" : "✏️"}
                    </Text>
                  )}
                </TouchableOpacity>
              </TouchableOpacity>

              {hasDisplayNameChanged && isEditingDisplayName && (
                <Text style={profileStyles.changeHint}>
                  Nhấn ✓ để lưu thay đổi
                </Text>
              )}
            </View>

            {/* Email - Editable with OTP verification */}
            <View style={accountStyles.inputGroup}>
              <Text style={accountStyles.label}>Email</Text>
              <TouchableOpacity
                style={[
                  accountStyles.editableField,
                  hasEmailChanged && profileStyles.changedField,
                ]}
                onPress={() => setIsEditingEmail(!isEditingEmail)}
                activeOpacity={0.7}
              >
                {isEditingEmail ? (
                  <TextInput
                    style={accountStyles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Nhập email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoFocus
                    onSubmitEditing={handleSaveEmail}
                    editable={isUpdatingField !== "email"}
                  />
                ) : (
                  <Text style={accountStyles.fieldText}>
                    {email || "Chưa có email"}
                  </Text>
                )}

                <TouchableOpacity
                  style={accountStyles.editIcon}
                  onPress={
                    isEditingEmail
                      ? handleSaveEmail
                      : () => setIsEditingEmail(true)
                  }
                  disabled={isUpdatingField === "email"}
                >
                  {isUpdatingField === "email" ? (
                    <ActivityIndicator size="small" color="#FF6B35" />
                  ) : (
                    <Text style={accountStyles.editIconText}>
                      {isEditingEmail ? "✓" : "✏️"}
                    </Text>
                  )}
                </TouchableOpacity>
              </TouchableOpacity>

              {hasEmailChanged && isEditingEmail && (
                <Text style={profileStyles.changeHint}>
                  Nhấn ✓ để gửi mã xác thực đến email mới
                </Text>
              )}
            </View>

            {/* Current Values Display */}
            {/* <View style={profileStyles.currentValues}>
              <Text style={profileStyles.currentValuesTitle}>
                Thông tin hiện tại:
              </Text>
              <Text style={profileStyles.currentValue}>
                📧 Email: {user?.email || "Chưa cập nhật"}
              </Text>
              <Text style={profileStyles.currentValue}>
                👤 Tên hiển thị: {user?.displayName || "Chưa cập nhật"}
              </Text>
            </View> */}
          </View>
        </ScrollView>
      </View>

      {/* Email OTP Modal */}
      <EmailOTPModal
        visible={showEmailOTPModal}
        newEmail={pendingEmail}
        onVerificationSuccess={handleEmailVerificationSuccess}
        onCancel={handleEmailModalCancel}
        verifyEmailChange={verifyEmailChange}
        resendEmailChangeOTP={resendEmailChangeOTP}
      />
    </>
  );
};

// Simplified styles (removed avatar section since it's now in AccountHeader)
const profileStyles = {
  changedField: {
    borderColor: "#FF6B35",
    borderWidth: 2,
  },
  changeHint: {
    fontSize: 11,
    color: "#FF6B35",
    marginTop: 5,
    fontStyle: "italic" as const,
  },
  currentValues: {
    backgroundColor: "#F8F9FA",
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    borderLeftWidth: 3,
    borderLeftColor: "#FF6B35",
  },
  currentValuesTitle: {
    fontSize: 14,
    fontWeight: "bold" as const,
    color: "#333333",
    marginBottom: 8,
  },
  currentValue: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
    lineHeight: 18,
  },
};

export default ProfileScreen;
