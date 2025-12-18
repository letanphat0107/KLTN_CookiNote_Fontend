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
        message: `Tải ứng dụng và đọc "${post.title}" trên CookiNote`,
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

  const formatContent = (content: string) => {
    const lines = content.split("\n");
    const formattedElements: React.ReactNode[] = [];
    let key = 0;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Skip empty lines but add spacing
      if (!trimmedLine) {
        formattedElements.push(
          <View key={`space-${key++}`} style={{ height: 12 }} />
        );
        return;
      }

      // Headings (lines starting with #)
      if (trimmedLine.startsWith("###")) {
        const headingText = trimmedLine.replace(/^###\s*/, "");
        formattedElements.push(
          <Text key={`h3-${index}`} style={culinaryStoryStyles.headingThree}>
            {headingText}
          </Text>
        );
        return;
      }

      if (trimmedLine.startsWith("##")) {
        const headingText = trimmedLine.replace(/^##\s*/, "");
        formattedElements.push(
          <Text key={`h2-${index}`} style={culinaryStoryStyles.headingTwo}>
            {headingText}
          </Text>
        );
        return;
      }

      if (trimmedLine.startsWith("#")) {
        const headingText = trimmedLine.replace(/^#\s*/, "");
        formattedElements.push(
          <Text key={`h1-${index}`} style={culinaryStoryStyles.headingOne}>
            {headingText}
          </Text>
        );
        return;
      }

      // Bold text between ** **
      if (trimmedLine.includes("**")) {
        const parts = trimmedLine.split("**");
        const formattedParts = parts.map((part, i) => {
          if (i % 2 === 1) {
            return (
              <Text key={`bold-${key++}`} style={culinaryStoryStyles.boldText}>
                {part}
              </Text>
            );
          }
          return <Text key={`normal-${key++}`}>{part}</Text>;
        });

        formattedElements.push(
          <Text key={`line-${index}`} style={culinaryStoryStyles.contentText}>
            {formattedParts}
          </Text>
        );
        return;
      }

      // Numbered list (lines starting with number.)
      if (/^\d+\.\s/.test(trimmedLine)) {
        const [numberPart, ...textParts] = trimmedLine.split(/\.\s(.+)/);
        const listText = textParts.join(". ");

        formattedElements.push(
          <View key={`numbered-${index}`} style={culinaryStoryStyles.listItem}>
            <Text style={culinaryStoryStyles.listNumber}>{numberPart}.</Text>
            <Text style={culinaryStoryStyles.contentText}>{listText}</Text>
          </View>
        );
        return;
      }

      // Bullet points (lines starting with * or -)
      if (trimmedLine.startsWith("*") || trimmedLine.startsWith("-")) {
        const bulletText = trimmedLine.substring(1).trim();
        const colonIndex = bulletText.indexOf(":");

        if (colonIndex > 0) {
          const beforeColon = bulletText.substring(0, colonIndex);
          const afterColon = bulletText.substring(colonIndex);

          formattedElements.push(
            <View key={`bullet-${index}`} style={culinaryStoryStyles.listItem}>
              <Text style={culinaryStoryStyles.bulletIcon}>•</Text>
              <Text style={culinaryStoryStyles.contentText}>
                <Text style={culinaryStoryStyles.boldText}>{beforeColon}</Text>
                {afterColon}
              </Text>
            </View>
          );
        } else {
          formattedElements.push(
            <View key={`bullet-${index}`} style={culinaryStoryStyles.listItem}>
              <Text style={culinaryStoryStyles.bulletIcon}>•</Text>
              <Text style={culinaryStoryStyles.contentText}>{bulletText}</Text>
            </View>
          );
        }
        return;
      }

      // Quote (lines starting with >)
      if (trimmedLine.startsWith(">")) {
        const quoteText = trimmedLine.substring(1).trim();
        formattedElements.push(
          <View key={`quote-${index}`} style={culinaryStoryStyles.quoteBlock}>
            <Text style={culinaryStoryStyles.quoteText}>{quoteText}</Text>
          </View>
        );
        return;
      }

      // Regular paragraph
      formattedElements.push(
        <Text key={`line-${index}`} style={culinaryStoryStyles.contentText}>
          {trimmedLine}
        </Text>
      );
    });

    return (
      <View style={culinaryStoryStyles.formattedContentContainer}>
        {formattedElements}
      </View>
    );
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
                uri: post.authorAvatarUrl || "https://thecrites.com/sites/all/modules/cookbook/theme/images/default-recipe-big.png",
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
            {formatContent(post.content)}
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
