import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { accountStyles } from "./styles";

const SharedAccountScreen = () => {
  return (
    <View style={accountStyles.container}>
      <Text style={accountStyles.title}>Tài Khoản Chia Sẻ</Text>

      <ScrollView style={accountStyles.content}>
        <View style={accountStyles.profileHeader}>
          <View style={accountStyles.avatar}>
            <Text style={accountStyles.avatarText}>NA</Text>
          </View>
          <Text style={accountStyles.userName}>Nguyễn Văn A</Text>
          <Text style={accountStyles.userDescription}>
            Yêu thích nấu ăn và chia sẻ những công thức độc đáo
          </Text>
        </View>

        <View style={accountStyles.statsContainer}>
          <View style={accountStyles.statItem}>
            <Text style={accountStyles.statNumber}>15</Text>
            <Text style={accountStyles.statLabel}>Công thức</Text>
          </View>
          <View style={accountStyles.statItem}>
            <Text style={accountStyles.statNumber}>128</Text>
            <Text style={accountStyles.statLabel}>Người theo dõi</Text>
          </View>
          <View style={accountStyles.statItem}>
            <Text style={accountStyles.statNumber}>45</Text>
            <Text style={accountStyles.statLabel}>Đang theo dõi</Text>
          </View>
        </View>

        <View style={accountStyles.section}>
          <Text style={accountStyles.sectionTitle}>Công thức đã chia sẻ</Text>

          <View style={accountStyles.recipeCard}>
            <Text style={accountStyles.recipeName}>Phở Bò Truyền Thống</Text>
            <Text style={accountStyles.recipeStats}>
              👁 245 lượt xem • ❤️ 18 yêu thích
            </Text>
          </View>

          <View style={accountStyles.recipeCard}>
            <Text style={accountStyles.recipeName}>Bánh Mì Việt Nam</Text>
            <Text style={accountStyles.recipeStats}>
              👁 189 lượt xem • ❤️ 12 yêu thích
            </Text>
          </View>

          <View style={accountStyles.recipeCard}>
            <Text style={accountStyles.recipeName}>Gỏi Cuốn Tôm Thịt</Text>
            <Text style={accountStyles.recipeStats}>
              👁 156 lượt xem • ❤️ 9 yêu thích
            </Text>
          </View>
        </View>

        <View style={accountStyles.actionButtons}>
          <TouchableOpacity style={accountStyles.editButton}>
            <Text style={accountStyles.editButtonText}>
              Chỉnh sửa trang cá nhân
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={accountStyles.shareButton}>
            <Text style={accountStyles.shareButtonText}>
              Chia sẻ trang cá nhân
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SharedAccountScreen;
