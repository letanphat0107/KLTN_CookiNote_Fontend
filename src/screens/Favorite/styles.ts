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
  cookedBadge: {
  position: "absolute",
  top: 12,
  right: 12,
  backgroundColor: "rgba(76, 175, 80, 0.9)",
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 12,
  zIndex: 1,
},
cookedBadgeText: {
  color: "#FFFFFF",
  fontSize: 11,
  fontWeight: "600",
},
ratingContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 8,
  marginBottom: 4,
},
ratingText: {
  fontSize: 16,
},
cookedNote: {
  fontSize: 13,
  color: "#666",
  fontStyle: "italic",
  marginTop: 4,
  marginBottom: 8,
  paddingLeft: 8,
  borderLeftWidth: 2,
  borderLeftColor: "#FF6B35",
},
searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    flex: 1,
    marginRight: 8,
  },

  shareCodeContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  shareCodeRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  shareCodeInput: {
    flex: 1,
    backgroundColor: "#FFF5F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    borderWidth: 1.5,
    borderColor: "#FF6B35",
  },

  shareCodeButton: {
    backgroundColor: "#FF6B35",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    minWidth: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  shareCodeButtonDisabled: {
    backgroundColor: "#CCCCCC",
    opacity: 0.6,
    shadowOpacity: 0,
    elevation: 0,
  },

  shareCodeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#FFF5F0",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FF6B35",
  },

  editButtonText: {
    color: "#FF6B35",
    fontSize: 13,
    fontWeight: "600",
  },

  deleteButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#FFE5E5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E74C3C",
  },

  deleteButtonText: {
    color: "#E74C3C",
    fontSize: 13,
    fontWeight: "600",
  },

  // Restore/Permanent Delete buttons for Deleted Recipes
  restoreButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#E8F8F5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#27AE60",
  },

  restoreButtonText: {
    color: "#27AE60",
    fontSize: 13,
    fontWeight: "600",
  },

  permanentDeleteButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#FADBD8",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C0392B",
  },

  permanentDeleteButtonText: {
    color: "#C0392B",
    fontSize: 13,
    fontWeight: "600",
  },
  modernCreateButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B6B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

});

export default favoriteStyles;
