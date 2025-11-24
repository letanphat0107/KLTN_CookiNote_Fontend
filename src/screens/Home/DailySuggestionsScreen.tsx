import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { getDailySuggestions } from "../../services/dailyMenuService";
import { DailyMenuSuggestion } from "../../types/recipe";

interface DailySuggestionsScreenProps {
  navigation: any;
}

const DailySuggestionsScreen: React.FC<DailySuggestionsScreenProps> = ({
  navigation,
}) => {
  const [suggestions, setSuggestions] = useState<DailyMenuSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [generatedDate, setGeneratedDate] = useState("");

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    setIsLoading(true);
    try {
      const response = await getDailySuggestions();
      if (response?.data) {
        setSuggestions(response.data.suggestions);
        setGeneratedDate(response.data.generatedDate);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMealTypeLabel = (mealType: string) => {
    switch (mealType) {
      case "BREAKFAST":
        return { text: "Bữa sáng", icon: "☀️" };
      case "LUNCH":
        return { text: "Bữa trưa", icon: "🌤️" };
      case "DINNER":
        return { text: "Bữa tối", icon: "🌙" };
      default:
        return { text: "Tráng miệng", icon: "🍽️" };
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toUpperCase()) {
      case "EASY":
        return "#4CAF50";
      case "MEDIUM":
        return "#FF9800";
      case "HARD":
        return "#F44336";
      default:
        return "#FF9800";
    }
  };

  const handleRecipePress = (recipeId: number) => {
    navigation.navigate("RecipeDetail", { recipeId });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>Đang tải gợi ý...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
                      source={require("../../../assets/images/vector.png")}
                      style={styles.backIcon}
                      resizeMode="contain"
                    />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gợi ý hôm nay</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Banner */}
        <View style={styles.dateBanner}>
          <Text style={styles.dateBannerIcon}>📅</Text>
          <Text style={styles.dateBannerText}>
            {new Date(generatedDate).toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        {/* Suggestions List */}
        {suggestions.map((suggestion, index) => {
          const mealType = getMealTypeLabel(suggestion.mealType);
          return (
            <View key={index} style={styles.suggestionSection}>
              {/* Meal Type Header */}
              <View style={styles.mealTypeHeader}>
                <Text style={styles.mealTypeIcon}>{mealType.icon}</Text>
                <Text style={styles.mealTypeText}>{mealType.text}</Text>
              </View>

              {/* Recipe Card */}
              <TouchableOpacity
                style={styles.recipeCard}
                onPress={() => handleRecipePress(suggestion.recipe.id)}
              >
                <Image
                  source={{ uri: suggestion.recipe.imageUrl }}
                  style={styles.recipeImage}
                />
                <View style={styles.recipeInfo}>
                  <Text style={styles.recipeTitle} numberOfLines={2}>
                    {suggestion.recipe.title}
                  </Text>
                  <Text style={styles.recipeDescription} numberOfLines={2}>
                    {suggestion.recipe.description}
                  </Text>

                  {/* Owner Info */}
                  <View style={styles.ownerInfo}>
                    <Image
                      source={{ uri: suggestion.recipe.ownerAvatar }}
                      style={styles.ownerAvatar}
                    />
                    <Text style={styles.ownerName}>
                      {suggestion.recipe.ownerName}
                    </Text>
                  </View>

                  {/* Recipe Meta */}
                  <View style={styles.recipeMeta}>
                    <View style={styles.metaItem}>
                      <Text style={styles.metaIcon}>⏱️</Text>
                      <Text style={styles.metaText}>
                        {suggestion.recipe.prepareTime +
                          suggestion.recipe.cookTime}{" "}
                        phút
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.difficultyBadge,
                        {
                          backgroundColor: getDifficultyColor(
                            suggestion.recipe.difficulty
                          ),
                        },
                      ]}
                    >
                      <Text style={styles.difficultyText}>
                        {suggestion.recipe.difficulty}
                      </Text>
                    </View>
                  </View>

                  {/* Justifications */}
                  <View style={styles.justificationsContainer}>
                    {suggestion.justifications.map((justification, jIndex) => (
                      <View key={jIndex} style={styles.justificationItem}>
                        <Text style={styles.justificationDot}>•</Text>
                        <Text style={styles.justificationText}>
                          {justification}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    paddingTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8F0",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: "#000000",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3436",
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  dateBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6B35",
    padding: 16,
    marginBottom: 16,
  },
  dateBannerIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  dateBannerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    flex: 1,
  },
  suggestionSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  mealTypeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  mealTypeIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  mealTypeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3436",
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
  },
  recipeInfo: {
    padding: 16,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3436",
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },
  ownerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ownerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  ownerName: {
    fontSize: 14,
    color: "#666",
  },
  recipeMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  metaText: {
    fontSize: 14,
    color: "#666",
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  justificationsContainer: {
    backgroundColor: "#FFF8F0",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#FF6B35",
  },
  justificationItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  justificationDot: {
    color: "#FF6B35",
    marginRight: 8,
    fontWeight: "bold",
  },
  justificationText: {
    fontSize: 13,
    color: "#666",
    flex: 1,
  },
});

export default DailySuggestionsScreen;