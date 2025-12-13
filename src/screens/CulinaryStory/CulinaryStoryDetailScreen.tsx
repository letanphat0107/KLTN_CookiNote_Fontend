import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  Animated,
  ActivityIndicator,
  Alert,
} from "react-native";
import { culinaryStoryStyles } from "./styles";
import { getPostDetail, Post } from "../../services/postService";

interface CulinaryStoryDetailScreenProps {
  route?: {
    params?: {
      postId?: string;
    };
  };
  navigation?: any;
}

const CulinaryStoryDetailScreen: React.FC<CulinaryStoryDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const postId = route?.params?.postId;
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Toast message state
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const toastOpacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (postId) {
      loadPostDetail();
    }
  }, [postId]);

  const loadPostDetail = async () => {
    try {
      setIsLoading(true);
      const postData = await getPostDetail(parseInt(postId || "0"));
      setPost(postData);
    } catch (error) {
      console.error("Error loading post detail:", error);
      Alert.alert("Lỗi", "Không thể tải thông tin bài viết");
    } finally {
      setIsLoading(false);
    }
  };

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
    if (!post) return;

    try {
      await Share.share({
        message: `Đọc bài viết hay: "${post.title}" trên CookiNote`,
        url: `https://cookinote.app/posts/${postId}`,
      });
    } catch (error) {
      showToastMessage("Không thể chia sẻ bài viết");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hôm nay";
    if (diffDays === 1) return "Hôm qua";
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
    return date.toLocaleDateString("vi-VN");
  };

  if (isLoading) {
    return (
      <View style={culinaryStoryStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={culinaryStoryStyles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={culinaryStoryStyles.loadingContainer}>
        <Text style={culinaryStoryStyles.emptyTitle}>
          Không tìm thấy bài viết
        </Text>
        <TouchableOpacity
          style={culinaryStoryStyles.readMoreButton}
          onPress={handleBack}
        >
          <Text style={culinaryStoryStyles.readMoreText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        {/* Post Image */}
        <Image
          source={{
            uri:
              post.imageUrl ||
              "https://thecrites.com/sites/all/modules/cookbook/theme/images/default-recipe-big.png",
          }}
          style={culinaryStoryStyles.detailImage}
        />

        {/* Post Info */}
        <View style={culinaryStoryStyles.detailInfo}>
          {/* Title */}
          <Text style={culinaryStoryStyles.detailTitle}>{post.title}</Text>

          {/* Author Info */}
          <View style={culinaryStoryStyles.authorSection}>
            <Image
              source={{
                uri: post.authorAvatarUrl || "https://via.placeholder.com/50",
              }}
              style={culinaryStoryStyles.authorAvatar}
            />
            <View style={culinaryStoryStyles.authorInfo}>
              <Text style={culinaryStoryStyles.authorName}>
                {post.authorName}
              </Text>
              {post.role === "ADMIN" && (
                <Text style={culinaryStoryStyles.adminBadgeText}>
                  ✓ Quản trị viên
                </Text>
              )}
            </View>
          </View>

          {/* Publish Date */}
          <Text style={culinaryStoryStyles.publishDate}>
            Xuất bản {formatDate(post.createdAt)}
          </Text>

          {/* Content */}
          <View style={culinaryStoryStyles.contentSection}>
            <Text style={culinaryStoryStyles.fullContent}>{post.content}</Text>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default CulinaryStoryDetailScreen;
