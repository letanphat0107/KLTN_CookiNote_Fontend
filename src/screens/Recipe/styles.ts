import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_FAMILIES, FONT_SIZES, FONT_WEIGHTS } from '../../constants/fonts';

export const recipeStyles = StyleSheet.create({
  // Common containers
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },

  // Headers
  header: {
    padding: 20,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },

  // Recipe Detail styles
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    fontFamily: 'Roboto-Regular',
    marginTop: 16,
    lineHeight: 24,
  },

  // Recipe Guide styles
  infoSection: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    fontFamily: 'Roboto-Bold',
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    fontFamily: 'Roboto-Regular',
  },

  // Sections
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    fontFamily: 'Roboto-Bold',
    marginBottom: 12,
  },

  // Ingredients
  ingredientList: {
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 8,
  },
  ingredient: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
    fontFamily: 'Roboto-Regular',
    marginBottom: 8,
    lineHeight: 24,
  },

  // Steps
  step: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  stepNumber: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    fontFamily: 'Roboto-Bold',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
    fontFamily: 'Roboto-Regular',
    lineHeight: 24,
  },

  // Tips
  tip: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    fontFamily: 'Roboto-Regular',
    lineHeight: 24,
    backgroundColor: '#FFF9E6',
    padding: 16,
    borderRadius: 8,
  },

  // Action buttons
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  favoriteButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    fontFamily: 'Roboto-Bold',
  },
  shareButton: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  shareButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    fontFamily: 'Roboto-Bold',
  },

  // Recipe image
  recipeImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },

  // Rating and difficulty
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    fontSize: FONT_SIZES.md,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text.secondary,
    marginLeft: 8,
  },
  difficultyBadge: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 'auto',
  },
  difficultyText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.sm,
    fontFamily: 'Roboto-Medium',
  },

  // Tags
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    fontFamily: 'Roboto-Regular',
  },

  // Nutrition info
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    fontFamily: 'Roboto-Bold',
  },
  nutritionLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text.secondary,
    fontFamily: 'Roboto-Regular',
    marginTop: 4,
  },
});

export default recipeStyles;
