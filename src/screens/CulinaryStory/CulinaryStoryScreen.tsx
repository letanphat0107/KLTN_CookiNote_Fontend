import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { culinaryStoryStyles } from "./styles";
import { getPosts, Post } from "../../services/postService";

interface CulinaryStoryScreenProps {
  navigation?: any;
}

const CulinaryStoryScreen: React.FC<CulinaryStoryScreenProps> = ({
  navigation,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  // Load posts when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadPosts();
    }, [])
  );

  const loadPosts = async (pageNum: number = 0, isRefresh: boolean = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else if (pageNum === 0) {
        setIsLoading(true);
      }

      const response = await getPosts(pageNum, 10);

      if (pageNum === 0) {
        setPosts(response.items);
      } else {
        setPosts([...posts, ...response.items]);
      }

      setPage(pageNum);
      setHasMore(response.hasNext);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadPosts(0, true);
  };

  const handleReadMore = (postId: number) => {
    if (navigation) {
      navigation.navigate("CulinaryStoryDetail", {
        postId: postId.toString(),
      });
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

  const renderPostCard = (post: Post) => (
    <View key={post.id} style={culinaryStoryStyles.storyCard}>
      {/* Post Image */}
      <Image
        source={{
          uri:
            post.imageUrl ||
            "https://thecrites.com/sites/all/modules/cookbook/theme/images/default-recipe-big.png",
        }}
        style={culinaryStoryStyles.storyImage}
      />

      {/* Author Badge */}
      {post.role === "ADMIN" && (
        <View style={culinaryStoryStyles.adminBadge}>
          <Text style={culinaryStoryStyles.adminBadgeText}>✓ Admin</Text>
        </View>
      )}

      {/* Post Title */}
      <Text style={culinaryStoryStyles.storyTitle}>{post.title}</Text>

      {/* Post Content Preview */}
      <Text style={culinaryStoryStyles.storyContent} numberOfLines={3}>
        {post.content}
      </Text>

      {/* Read More Button */}
      <TouchableOpacity
        style={culinaryStoryStyles.readMoreButton}
        onPress={() => handleReadMore(post.id)}
      >
        <Text style={culinaryStoryStyles.readMoreText}>Đọc tiếp</Text>
      </TouchableOpacity>

      {/* Post Metadata */}
      <View style={culinaryStoryStyles.storyMeta}>
        <View style={culinaryStoryStyles.authorInfo}>
          <Image
            source={{
              uri: post.authorAvatarUrl || "https://via.placeholder.com/40",
            }}
            style={culinaryStoryStyles.authorAvatarImage}
          />
          <View>
            <Text style={culinaryStoryStyles.authorName}>
              {post.authorName}
            </Text>
            <Text style={culinaryStoryStyles.publishDate}>
              {formatDate(post.createdAt)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={culinaryStoryStyles.emptyContainer}>
      <Text style={culinaryStoryStyles.emptyIcon}>📖</Text>
      <Text style={culinaryStoryStyles.emptyTitle}>Chưa có câu chuyện nào</Text>
      <Text style={culinaryStoryStyles.emptyDescription}>
        Hãy quay lại sau để đọc những câu chuyện ẩm thực thú vị!
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={culinaryStoryStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={culinaryStoryStyles.loadingText}>
          Đang tải câu chuyện...
        </Text>
      </View>
    );
  }

  return (
    <View style={culinaryStoryStyles.container}>
      {/* Header Section */}
      <View style={culinaryStoryStyles.headerSection}>
        <Text style={culinaryStoryStyles.headerTitle}>Câu Chuyện Ẩm Thực</Text>
        <Text style={culinaryStoryStyles.headerSubtitle}>
          Khám phá những câu chuyện thú vị về văn hóa ẩm thực
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={["#FF6B35"]}
            tintColor="#FF6B35"
          />
        }
      >
        {/* All Posts */}
        <View style={culinaryStoryStyles.content}>
          {posts.length === 0 ? renderEmptyState() : posts.map(renderPostCard)}
        </View>

        {/* Load More */}
        {hasMore && (
          <TouchableOpacity
            style={culinaryStoryStyles.loadMoreButton}
            onPress={() => loadPosts(page + 1)}
          >
            <Text style={culinaryStoryStyles.loadMoreText}>Tải thêm</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

export default CulinaryStoryScreen;
