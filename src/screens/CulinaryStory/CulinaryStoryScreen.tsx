import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator 
} from "react-native";
import { culinaryStoryStyles } from './styles';

const CulinaryStoryScreen = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Sample culinary stories data
  const stories = [
    {
      id: 1,
      title: "Khám phá văn hóa ẩm thực Việt Nam",
      content: "Nơi chia sẻ những câu chuyện thú vị về ẩm thực, từ những món ăn truyền thống đến các xu hướng hiện đại. Khám phá bí mật đằng sau những hương vị đặc biệt của ẩm thực Việt Nam...",
      category: "culture",
      author: "Chef Minh",
      publishDate: "2 ngày trước",
      image: "https://via.placeholder.com/350x200",
      featured: true
    },
    {
      id: 2,
      title: "Bí quyết nấu ăn từ các đầu bếp chuyên nghiệp",
      content: "Học hỏi những kỹ thuật nấu ăn độc đáo và bí quyết từ các chuyên gia ẩm thực. Từ cách chọn nguyên liệu đến những tip nhỏ giúp món ăn thêm hấp dẫn...",
      category: "tips",
      author: "Chef An",
      publishDate: "5 ngày trước",
      image: "https://via.placeholder.com/350x200",
      featured: false
    },
    {
      id: 3,
      title: "Hành trình khám phá món ăn địa phương",
      content: "Cùng nhau khám phá những món ăn đặc sản từ khắp mọi miền đất nước. Mỗi vùng miền có những hương vị riêng biệt, tạo nên sự đa dạng phong phú của ẩm thực Việt...",
      category: "travel",
      author: "Food Explorer",
      publishDate: "1 tuần trước",
      image: "https://via.placeholder.com/350x200",
      featured: false
    },
    {
      id: 4,
      title: "Lịch sử phát triển của món phở Việt Nam",
      content: "Từ một món ăn đường phố đơn giản đến biểu tượng ẩm thực quốc gia. Hành trình phát triển và lan rộng của món phở ra khắp thế giới...",
      category: "history",
      author: "Historian Chef",
      publishDate: "2 tuần trước",
      image: "https://via.placeholder.com/350x200",
      featured: false
    }
  ];

  const categories = [
    { key: 'all', label: 'Tất cả' },
    { key: 'culture', label: 'Văn hóa' },
    { key: 'tips', label: 'Bí quyết' },
    { key: 'travel', label: 'Du lịch' },
    { key: 'history', label: 'Lịch sử' }
  ];

  const filteredStories = stories.filter(story => 
    activeCategory === 'all' || story.category === activeCategory
  );

  const featuredStories = stories.filter(story => story.featured);

  const handleReadMore = (storyId: number) => {
    console.log('Read more story:', storyId);
    // Navigate to full story screen
  };

  const renderStoryCard = (story: any, featured = false) => (
    <View 
      key={story.id} 
      style={[
        culinaryStoryStyles.storyCard,
        featured && culinaryStoryStyles.featuredCard
      ]}
    >
      {/* Story Image */}
      <Image 
        source={{ uri: story.image }} 
        style={culinaryStoryStyles.storyImage} 
      />
      
      {/* Category Badge */}
      <Text style={culinaryStoryStyles.storyCategory}>
        {categories.find(cat => cat.key === story.category)?.label || story.category}
      </Text>
      
      {/* Story Title */}
      <Text style={culinaryStoryStyles.storyTitle}>
        {story.title}
      </Text>
      
      {/* Story Content Preview */}
      <Text style={culinaryStoryStyles.storyContent}>
        {story.content}
      </Text>
      
      {/* Read More Button */}
      <TouchableOpacity 
        style={culinaryStoryStyles.readMoreButton}
        onPress={() => handleReadMore(story.id)}
      >
        <Text style={culinaryStoryStyles.readMoreText}>Đọc tiếp</Text>
      </TouchableOpacity>
      
      {/* Story Metadata */}
      <View style={culinaryStoryStyles.storyMeta}>
        <View style={culinaryStoryStyles.authorInfo}>
          <View style={culinaryStoryStyles.authorAvatar} />
          <View>
            <Text style={culinaryStoryStyles.authorName}>{story.author}</Text>
            <Text style={culinaryStoryStyles.publishDate}>{story.publishDate}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={culinaryStoryStyles.emptyContainer}>
      <Text style={culinaryStoryStyles.emptyIcon}>📖</Text>
      <Text style={culinaryStoryStyles.emptyTitle}>
        Chưa có câu chuyện nào
      </Text>
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
        <Text style={culinaryStoryStyles.headerTitle}>
          Câu Chuyện Ẩm Thực
        </Text>
        <Text style={culinaryStoryStyles.headerSubtitle}>
          Khám phá những câu chuyện thú vị về văn hóa ẩm thực
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories Filter */}
        <View style={culinaryStoryStyles.categoriesContainer}>
          <Text style={culinaryStoryStyles.categoriesTitle}>Danh mục</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={culinaryStoryStyles.categoriesList}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category.key}
                style={[
                  culinaryStoryStyles.categoryButton,
                  activeCategory === category.key && culinaryStoryStyles.categoryButtonActive
                ]}
                onPress={() => setActiveCategory(category.key)}
              >
                <Text style={[
                  culinaryStoryStyles.categoryButtonText,
                  activeCategory === category.key && culinaryStoryStyles.categoryButtonTextActive
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Stories */}
        {featuredStories.length > 0 && activeCategory === 'all' && (
          <View style={culinaryStoryStyles.featuredSection}>
            <Text style={culinaryStoryStyles.featuredTitle}>
              🌟 Câu chuyện nổi bật
            </Text>
            {featuredStories.map(story => renderStoryCard(story, true))}
          </View>
        )}

        {/* All Stories */}
        <View style={culinaryStoryStyles.content}>
          {filteredStories.length === 0 ? (
            renderEmptyState()
          ) : (
            filteredStories
              .filter(story => !story.featured || activeCategory !== 'all')
              .map(story => renderStoryCard(story))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CulinaryStoryScreen;
