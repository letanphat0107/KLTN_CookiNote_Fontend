import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { favoriteStyles } from './styles';

const FavoriteScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample favorite recipes data
  const favoriteRecipes = [
    {
      id: 1,
      name: 'Phở Bò Truyền Thống',
      description: 'Món phở bò với nước dùng trong vắt, thơm ngon từ xương bò niệu nhiều giờ...',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_2BWz0CukYGFT9pvza-w6su7smU_xUkoEOg&s',
      rating: 4.8,
      difficulty: 'Trung bình',
      time: '2 giờ',
      category: 'vietnamese'
    },
    {
      id: 2,
      name: 'Bánh Mì Việt Nam',
      description: 'Bánh mì giòn tan với nhân thịt và rau củ tươi ngon, đậm đà hương vị Việt...',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_2BWz0CukYGFT9pvza-w6su7smU_xUkoEOg&s',
      rating: 4.6,
      difficulty: 'Dễ',
      time: '30 phút',
      category: 'vietnamese'
    },
    {
      id: 3,
      name: 'Gỏi Cuốn Tôm Thịt',
      description: 'Gỏi cuốn tươi mát với tôm, thịt và rau thơm, ăn kèm nước chấm đậm đà...',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_2BWz0CukYGFT9pvza-w6su7smU_xUkoEOg&s',
      rating: 4.7,
      difficulty: 'Dễ',
      time: '45 phút',
      category: 'vietnamese'
    }
  ];

  const filters = [
    { key: 'all', label: 'Tất cả' },
    { key: 'vietnamese', label: 'Việt Nam' },
    { key: 'asian', label: 'Châu Á' },
    { key: 'western', label: 'Phương Tây' }
  ];

  const handleRemoveFavorite = (recipeId: number) => {
    // Handle remove from favorites logic
    console.log('Remove favorite:', recipeId);
  };

  const handleViewRecipe = (recipeId: number) => {
    // Handle navigate to recipe detail
    console.log('View recipe:', recipeId);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  const renderEmptyState = () => (
    <View style={favoriteStyles.emptyContainer}>
      <Text style={favoriteStyles.emptyIcon}>❤️</Text>
      <Text style={favoriteStyles.emptyTitle}>Chưa có món ăn yêu thích</Text>
      <Text style={favoriteStyles.emptyDescription}>
        Hãy khám phá và thêm những món ăn ngon vào danh sách yêu thích của bạn!
      </Text>
      <TouchableOpacity style={favoriteStyles.exploreButton}>
        <Text style={favoriteStyles.exploreButtonText}>Khám phá ngay</Text>
      </TouchableOpacity>
    </View>
  );

  const filteredRecipes = favoriteRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || recipe.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={favoriteStyles.container}>
      <Text style={favoriteStyles.title}>Món Ăn Yêu Thích</Text>

      {/* Search Input */}
      <View style={favoriteStyles.searchContainer}>
        <TextInput
          style={favoriteStyles.searchInput}
          placeholder="Tìm kiếm món ăn yêu thích..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Filter Buttons */}
      <View style={favoriteStyles.filterButtons}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.key}
            style={[
              favoriteStyles.filterButton,
              activeFilter === filter.key && favoriteStyles.filterButtonActive
            ]}
            onPress={() => setActiveFilter(filter.key)}
          >
            <Text style={[
              favoriteStyles.filterButtonText,
              activeFilter === filter.key && favoriteStyles.filterButtonTextActive
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {filteredRecipes.length === 0 ? (
        renderEmptyState()
      ) : (
        <ScrollView style={favoriteStyles.content} showsVerticalScrollIndicator={false}>
          {filteredRecipes.map(recipe => (
            <View key={recipe.id} style={favoriteStyles.favoriteCard}>
              {/* Recipe Image */}
              <Image source={{ uri: recipe.image }} style={favoriteStyles.recipeImage} />
              
              {/* Recipe Info */}
              <Text style={favoriteStyles.recipeName}>{recipe.name}</Text>
              
              {/* Rating */}
              <View style={favoriteStyles.ratingContainer}>
                <Text style={favoriteStyles.ratingStars}>{renderStars(recipe.rating)}</Text>
                <Text style={favoriteStyles.ratingText}>({recipe.rating})</Text>
              </View>
              
              {/* Recipe Details */}
              <View style={favoriteStyles.recipeInfo}>
                <View style={favoriteStyles.infoItem}>
                  <Text style={favoriteStyles.infoText}>⏱️ {recipe.time}</Text>
                </View>
                <View style={favoriteStyles.infoItem}>
                  <Text style={favoriteStyles.infoText}>📊 {recipe.difficulty}</Text>
                </View>
              </View>
              
              <Text style={favoriteStyles.recipeDescription}>
                {recipe.description}
              </Text>
              
              {/* Actions */}
              <View style={favoriteStyles.cardActions}>
                <TouchableOpacity 
                  style={favoriteStyles.viewButton}
                  onPress={() => handleViewRecipe(recipe.id)}
                >
                  <Text style={favoriteStyles.viewButtonText}>Xem công thức</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={favoriteStyles.removeButton}
                  onPress={() => handleRemoveFavorite(recipe.id)}
                >
                  <Text style={favoriteStyles.removeButtonText}>Bỏ yêu thích</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default FavoriteScreen;
