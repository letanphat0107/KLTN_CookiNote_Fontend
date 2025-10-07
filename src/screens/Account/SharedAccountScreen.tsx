import React from "react";
import { View, Text, ScrollView } from "react-native";
import { accountStyles } from "./styles";
import AccountHeader from "../../components/AccountHeader";

interface SharedAccountScreenProps {
  navigation?: any;
  route?: {
    params?: {
      userId?: string;
      userName?: string;
    };
  };
}

const SharedAccountScreen: React.FC<SharedAccountScreenProps> = ({
  navigation,
  route,
}) => {
  const userId = route?.params?.userId;
  const userName = route?.params?.userName || "User Profile";

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <View style={accountStyles.container}>
      <AccountHeader
        title="Trang cá nhân"
        userName={userName}
        onBackPress={handleBack}
      />

      <ScrollView style={accountStyles.content}>
        <View style={accountStyles.userInfo}>
          <Text style={accountStyles.avatarText}>
            Đây là trang cá nhân được chia sẻ của {userName}
          </Text>

          <View style={accountStyles.statsContainer}>
            <View style={accountStyles.statItem}>
              <Text style={accountStyles.statNumber}>25</Text>
              <Text style={accountStyles.statLabel}>Công thức</Text>
            </View>
            <View style={accountStyles.statItem}>
              <Text style={accountStyles.statNumber}>150</Text>
              <Text style={accountStyles.statLabel}>Người theo dõi</Text>
            </View>
            <View style={accountStyles.statItem}>
              <Text style={accountStyles.statNumber}>89</Text>
              <Text style={accountStyles.statLabel}>Đang theo dõi</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SharedAccountScreen;
