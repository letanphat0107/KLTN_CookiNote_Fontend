import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  Animated,
} from "react-native";
import { culinaryStoryStyles } from "./styles";

interface CulinaryStoryDetailScreenProps {
  route?: {
    params?: {
      storyId?: string;
    };
  };
  navigation?: any;
}

const CulinaryStoryDetailScreen: React.FC<CulinaryStoryDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const storyId = route?.params?.storyId;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(124);

  // Toast message state
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const toastOpacity = useState(new Animated.Value(0))[0];

  // Mock detailed story data
  const storyDetail = {
    id: parseInt(storyId || "1"),
    title: "Khám phá văn hóa ẩm thực Việt Nam",
    fullContent: `
Ẩm thực Việt Nam là một phần không thể tách rời khỏi văn hóa và lịch sử dân tộc. Từ những món ăn đơn giản trong gia đình đến những đặc sản vùng miền, mỗi món ăn đều mang trong mình một câu chuyện riêng.

**Nguồn gốc và phát triển**

Ẩm thực Việt Nam được hình thành qua hàng nghìn năm lịch sử, chịu ảnh hưởng từ nhiều nền văn hóa khác nhau nhưng vẫn giữ được nét đặc trưng riêng. Từ thời cổ đại, người Việt đã biết cách chế biến các món ăn từ gạo, rau củ và thịt cá.

**Đặc điểm nổi bật**

- **Cân bằng dinh dưỡng**: Mỗi bữa ăn Việt Nam thường có đầy đủ chất đạm, tinh bột, vitamin từ rau xanh
- **Hương vị hài hòa**: Sự kết hợp tinh tế giữa ngọt, chua, cay, mặn
- **Nguyên liệu tươi ngon**: Ưu tiên sử dụng nguyên liệu tươi, theo mùa
- **Cách chế biến đa dạng**: Luộc, nướng, xào, canh, gỏi...

**Món ăn đặc trưng**

Phở, bánh mì, bún bò Huế, bánh xèo, gỏi cuốn... mỗi món đều có cách chế biến và thưởng thức riêng biệt, phản ánh văn hóa ẩm thực phong phú của từng vùng miền.

**Giá trị văn hóa**

Ẩm thực không chỉ là việc ăn uống mà còn là cách thể hiện tình cảm, sự tôn trọng và kết nối con người. Bữa cơm gia đình, những buổi tiệc tết, hay đơn giản là mời khách uống trà đều mang ý nghĩa văn hóa sâu sắc.
    `,
    category: "culture",
    author: {
      name: "Chef Minh",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_2BWz0CukYGFT9pvza-w6su7smU_xUkoEOg&s",
      bio: "Đầu bếp chuyên nghiệp với 15 năm kinh nghiệm trong lĩnh vực ẩm thực Việt Nam",
      followers: "2.1K",
    },
    publishDate: "2 ngày trước",
    readTime: "5 phút đọc",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_2BWz0CukYGFT9pvza-w6su7smU_xUkoEOg&s",
    tags: ["Văn hóa", "Ẩm thực Việt", "Truyền thống", "Lịch sử"],
    viewCount: 1234,
    shareCount: 89,
  };

  const relatedStories = [
    {
      id: 2,
      title: "Bí quyết nấu ăn từ các đầu bếp chuyên nghiệp",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_2BWz0CukYGFT9pvza-w6su7smU_xUkoEOg&s",
      readTime: "3 phút đọc",
    },
    {
      id: 3,
      title: "Hành trình khám phá món ăn địa phương",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_2BWz0CukYGFT9pvza-w6su7smU_xUkoEOg&s",
      readTime: "4 phút đọc",
    },
  ];

  // Toast functions
  const showToastMessage = (message: string, duration: number = 2000) => {
    setToastMessage(message);
    setShowToast(true);

    Animated.timing(toastOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowToast(false);
      });
    }, duration);
  };

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    showToastMessage(isLiked ? "Đã bỏ thích" : "Đã thích bài viết!");
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Đọc bài viết hay: "${storyDetail.title}" trên CookiNote`,
        url: `https://cookinote.app/story/${storyId}`,
      });
    } catch (error) {
      showToastMessage("Không thể chia sẻ bài viết");
    }
  };

  const handleFollowAuthor = () => {
    showToastMessage(`Đã theo dõi ${storyDetail.author.name}!`);
  };

  const handleRelatedStoryPress = (id: number) => {
    if (navigation) {
      navigation.push("CulinaryStoryDetail", { storyId: id.toString() });
    }
  };

  return (
    <View style={culinaryStoryStyles.detailContainer}>
      {/* Toast Message */}
      {showToast && (
        <Animated.View
          style={[
            culinaryStoryStyles.toastContainer,
            { opacity: toastOpacity },
          ]}
        >
          <Text style={culinaryStoryStyles.toastText}>{toastMessage}</Text>
        </Animated.View>
      )}

      {/* Header */}
      <View style={culinaryStoryStyles.detailHeader}>
        <TouchableOpacity
          onPress={handleBack}
          style={culinaryStoryStyles.backButton}
        >
          <Image
            source={require("../../../assets/images/vector.png")}
            style={culinaryStoryStyles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={culinaryStoryStyles.detailHeaderTitle}>Chi tiết</Text>
        <TouchableOpacity
          onPress={handleShare}
          style={culinaryStoryStyles.shareHeaderButton}
        >
          <Text style={culinaryStoryStyles.shareHeaderText}>📤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={culinaryStoryStyles.detailContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Story Image */}
        <Image
          source={{ uri: storyDetail.image }}
          style={culinaryStoryStyles.detailImage}
        />

        {/* Story Info */}
        <View style={culinaryStoryStyles.detailInfo}>
          {/* Category & Read Time */}
          <View style={culinaryStoryStyles.detailMeta}>
            <View style={culinaryStoryStyles.categoryBadge}>
              <Text style={culinaryStoryStyles.categoryBadgeText}>Văn hóa</Text>
            </View>
            <Text style={culinaryStoryStyles.readTime}>
              📖 {storyDetail.readTime}
            </Text>
          </View>

          {/* Title */}
          <Text style={culinaryStoryStyles.detailTitle}>
            {storyDetail.title}
          </Text>

          {/* Stats */}
          <View style={culinaryStoryStyles.statsContainer}>
            <Text style={culinaryStoryStyles.statItem}>
              👁️ {storyDetail.viewCount}
            </Text>
            <Text style={culinaryStoryStyles.statItem}>❤️ {likeCount}</Text>
            <Text style={culinaryStoryStyles.statItem}>
              📤 {storyDetail.shareCount}
            </Text>
          </View>

          {/* Author Info */}
          <View style={culinaryStoryStyles.authorSection}>
            <Image
              source={{ uri: storyDetail.author.avatar }}
              style={culinaryStoryStyles.authorAvatar}
            />
            <View style={culinaryStoryStyles.authorInfo}>
              <Text style={culinaryStoryStyles.authorName}>
                {storyDetail.author.name}
              </Text>
              <Text style={culinaryStoryStyles.authorBio}>
                {storyDetail.author.bio}
              </Text>
              <Text style={culinaryStoryStyles.authorFollowers}>
                {storyDetail.author.followers} người theo dõi
              </Text>
            </View>
            <TouchableOpacity
              style={culinaryStoryStyles.followButton}
              onPress={handleFollowAuthor}
            >
              <Text style={culinaryStoryStyles.followButtonText}>Theo dõi</Text>
            </TouchableOpacity>
          </View>

          {/* Publish Date */}
          <Text style={culinaryStoryStyles.publishDate}>
            Xuất bản {storyDetail.publishDate}
          </Text>

          {/* Content */}
          <View style={culinaryStoryStyles.contentSection}>
            <Text style={culinaryStoryStyles.fullContent}>
              {storyDetail.fullContent}
            </Text>
          </View>

          {/* Tags */}
          <View style={culinaryStoryStyles.tagsSection}>
            <Text style={culinaryStoryStyles.tagsTitle}>Thẻ:</Text>
            <View style={culinaryStoryStyles.tagsContainer}>
              {storyDetail.tags.map((tag, index) => (
                <View key={index} style={culinaryStoryStyles.tag}>
                  <Text style={culinaryStoryStyles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={culinaryStoryStyles.actionSection}>
            <TouchableOpacity
              style={[
                culinaryStoryStyles.actionButton,
                isLiked && culinaryStoryStyles.likedButton,
              ]}
              onPress={handleLike}
            >
              <Text
                style={[
                  culinaryStoryStyles.actionButtonText,
                  isLiked && culinaryStoryStyles.likedButtonText,
                ]}
              >
                {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={culinaryStoryStyles.actionButton}
              onPress={handleShare}
            >
              <Text style={culinaryStoryStyles.actionButtonText}>
                📤 Chia sẻ
              </Text>
            </TouchableOpacity>
          </View>

          {/* Related Stories */}
          <View style={culinaryStoryStyles.relatedSection}>
            <Text style={culinaryStoryStyles.relatedTitle}>
              📚 Bài viết liên quan
            </Text>
            {relatedStories.map((story) => (
              <TouchableOpacity
                key={story.id}
                style={culinaryStoryStyles.relatedStoryCard}
                onPress={() => handleRelatedStoryPress(story.id)}
              >
                <Image
                  source={{ uri: story.image }}
                  style={culinaryStoryStyles.relatedStoryImage}
                />
                <View style={culinaryStoryStyles.relatedStoryInfo}>
                  <Text style={culinaryStoryStyles.relatedStoryTitle}>
                    {story.title}
                  </Text>
                  <Text style={culinaryStoryStyles.relatedStoryReadTime}>
                    {story.readTime}
                  </Text>
                </View>
                <Text style={culinaryStoryStyles.relatedStoryArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CulinaryStoryDetailScreen;
