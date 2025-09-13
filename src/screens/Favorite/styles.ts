import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { FONT_FAMILIES, FONT_SIZES, FONT_WEIGHTS } from "../../constants/fonts";

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
    color: COLORS.text.primary,
    fontFamily: "Roboto-Bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
    fontFamily: "Roboto-Bold",
    textAlign: "center",
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    fontFamily: "Roboto-Regular",
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
    fontFamily: "Roboto-Bold",
  },

  // Recipe cards
  favoriteCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
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
    fontFamily: "Roboto-Bold",
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    fontFamily: "Roboto-Regular",
    lineHeight: 20,
    marginBottom: 12,
  },
  recipeInfo: {
    flexDirection: "row",
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  infoText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text.light,
    fontFamily: "Roboto-Regular",
    marginLeft: 4,
  },

  // Card actions
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  viewButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  viewButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    fontFamily: "Roboto-Bold",
  },
  removeButton: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.error,
  },
  removeButtonText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    fontFamily: "Roboto-Bold",
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
    fontFamily: "Roboto-Regular",
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
    fontFamily: "Roboto-Regular",
  },
  filterButtonTextActive: {
    color: COLORS.background,
    fontFamily: "Roboto-Bold",
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
    fontFamily: "Roboto-Regular",
  },
});

export default favoriteStyles;
