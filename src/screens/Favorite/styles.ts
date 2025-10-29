import { COLORS } from "../../constants/colors";
import { FONT_FAMILIES, FONT_SIZES, FONT_WEIGHTS } from "../../constants/fonts";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const favoriteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    textAlign: "center",
    padding: 20,
    paddingTop: 40,
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILIES.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 50,
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILIES.bold,
    textAlign: "center",
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    fontFamily: FONT_FAMILIES.regular,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    fontFamily: FONT_FAMILIES.bold,
  },

  // Recipe cards
  favoriteCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recipeImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  recipeName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILIES.bold,
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    fontFamily: FONT_FAMILIES.regular,
    lineHeight: 20,
    marginBottom: 12,
  },

  // Search and filter
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: FONT_SIZES.md,
    fontFamily: FONT_FAMILIES.regular,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    fontFamily: FONT_FAMILIES.regular,
  },
  filterButtonTextActive: {
    color: COLORS.background,
    fontFamily: FONT_FAMILIES.bold,
  },

  // Rating
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingStars: {
    fontSize: FONT_SIZES.sm,
    marginRight: 4,
  },
  ratingText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text.light,
    fontFamily: FONT_FAMILIES.regular,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 25,
    padding: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: "transparent",
  },

  tabButtonActive: {
    backgroundColor: "#FF6B35",
    elevation: 2,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  tabIcon: {
    fontSize: 16,
    marginRight: 6,
  },

  tabButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666666",
  },

  tabButtonTextActive: {
    color: "#FFFFFF",
  },

  // Loading States
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
  },

  loadMoreContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },

  loadMoreText: {
    fontSize: 14,
    color: "#999999",
    fontStyle: "italic",
  },

  // Recipe Card Updates
  recipeInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 8,
    gap: 8,
  },

  infoItem: {
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  infoText: {
    fontSize: 12,
    color: "#666666",
    fontWeight: "500",
  },

  favoriteActionButton: {
    backgroundColor: "#FF6B35",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 100,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  favoriteActionButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  removeButton: {
    backgroundColor: "#E0E0E0",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  removeButtonText: {
    color: "#666666",
  },

  // Loading state for cards
  cardLoading: {
    opacity: 0.7,
  },

  // Enhanced card actions
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    gap: 10,
  },

  viewButton: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  viewButtonText: {
    color: "#333333",
    fontSize: 13,
    fontWeight: "600",
  },
});

export default favoriteStyles;
