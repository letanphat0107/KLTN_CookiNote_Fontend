import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_FAMILIES, FONT_SIZES, FONT_WEIGHTS } from '../../constants/fonts';

export const culinaryStoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    textAlign: 'center',
    padding: 20,
    color: COLORS.text.primary,
    fontFamily: 'Roboto-Bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Header section
  headerSection: {
    backgroundColor: COLORS.primary,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.background,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.background,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
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
    shadowColor: '#000',
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
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  storyCategory: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontFamily: 'Roboto-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  storyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    fontFamily: 'Roboto-Bold',
    marginBottom: 12,
    lineHeight: 28,
  },
  storyContent: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    fontFamily: 'Roboto-Regular',
    lineHeight: 24,
    marginBottom: 16,
  },
  
  // Story metadata
  storyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontFamily: 'Roboto-Medium',
  },
  publishDate: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text.light,
    fontFamily: 'Roboto-Regular',
  },
  
  // Read more button
  readMoreButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  readMoreText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    fontFamily: 'Roboto-Bold',
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
    fontFamily: 'Roboto-Bold',
    marginBottom: 12,
  },
  categoriesList: {
    flexDirection: 'row',
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
    fontFamily: 'Roboto-Regular',
  },
  categoryButtonTextActive: {
    color: COLORS.background,
    fontFamily: 'Roboto-Bold',
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
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
    fontFamily: 'Roboto-Bold',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  
  // Loading state
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    fontFamily: 'Roboto-Regular',
    marginTop: 16,
  },
});

export default culinaryStoryStyles;
