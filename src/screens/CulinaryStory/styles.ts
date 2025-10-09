import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { FONT_FAMILIES, FONT_SIZES, FONT_WEIGHTS } from "../../constants/fonts";

export const culinaryStoryStyles = StyleSheet.create({
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
    marginBottom: 50,
  },

  // Header section
  headerSection: {
    backgroundColor: COLORS.primary,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.background,
    fontFamily: "Roboto-Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.background,
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    opacity: 0.9,
  },

  // Story cards
  storyCard: {
    backgroundColor: COLORS.background,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  featuredCard: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  storyImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  storyCategory: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontFamily: "Roboto-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  storyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    fontFamily: "Roboto-Bold",
    marginBottom: 12,
    lineHeight: 28,
  },
  storyContent: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    fontFamily: "Roboto-Regular",
    lineHeight: 24,
    marginBottom: 16,
  },

  // Story metadata
  storyMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: COLORS.surface,
  },
  authorName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.text.primary,
    fontFamily: "Roboto-Medium",
  },
  publishDate: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text.light,
    fontFamily: "Roboto-Regular",
  },

  // Read more button
  readMoreButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  readMoreText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    fontFamily: "Roboto-Bold",
  },

  // Categories filter
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoriesTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    fontFamily: "Roboto-Bold",
    marginBottom: 12,
  },
  categoriesList: {
    flexDirection: "row",
  },
  categoryButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    fontFamily: "Roboto-Regular",
  },
  categoryButtonTextActive: {
    color: COLORS.background,
    fontFamily: "Roboto-Bold",
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
  },

  // Featured section
  featuredSection: {
    marginBottom: 30,
  },
  featuredTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    fontFamily: "Roboto-Bold",
    marginBottom: 16,
    paddingHorizontal: 20,
  },

  // Loading state
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    fontFamily: "Roboto-Regular",
    marginTop: 16,
  },

  // Detail screen styles
  detailContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: "#333333",
  },
  detailHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  shareHeaderButton: {
    padding: 8,
  },
  shareHeaderText: {
    fontSize: 20,
  },
  detailContent: {
    flex: 1,
  },
  detailImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  detailInfo: {
    padding: 20,
  },
  detailMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  categoryBadge: {
    backgroundColor: "#FF6B35",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  readTime: {
    fontSize: 14,
    color: "#666666",
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    lineHeight: 32,
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  statItem: {
    fontSize: 14,
    color: "#666666",
    marginRight: 20,
  },
  authorSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },

  authorBio: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  authorFollowers: {
    fontSize: 12,
    color: "#999999",
    marginTop: 2,
  },
  followButton: {
    backgroundColor: "#FF6B35",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  contentSection: {
    marginBottom: 25,
  },
  fullContent: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333333",
  },
  tagsSection: {
    marginBottom: 25,
  },
  tagsTitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: "#666666",
  },
  actionSection: {
    flexDirection: "row",
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
  },
  likedButton: {
    backgroundColor: "#FFE5E5",
  },
  likedButtonText: {
    color: "#FF6B35",
  },
  relatedSection: {
    marginBottom: 30,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
  },
  relatedStoryCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  relatedStoryImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  relatedStoryInfo: {
    flex: 1,
  },
  relatedStoryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  relatedStoryReadTime: {
    fontSize: 12,
    color: "#666666",
  },
  relatedStoryArrow: {
    fontSize: 16,
    color: "#999999",
  },
  toastContainer: {
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    zIndex: 1000,
    elevation: 1000,
  },
  toastText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default culinaryStoryStyles;
