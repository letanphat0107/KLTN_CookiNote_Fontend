import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { FONT_FAMILIES, FONT_SIZES, FONT_WEIGHTS } from "../../constants/fonts";

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
    fontFamily: "Roboto-Bold",
    textAlign: "center",
  },

  // Recipe Detail styles
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    fontFamily: "Roboto-Bold",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    fontFamily: "Roboto-Regular",
    marginTop: 16,
    lineHeight: 24,
  },

  // Recipe Guide styles
  infoSection: {
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    fontFamily: "Roboto-Bold",
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    fontFamily: "Roboto-Regular",
  },

  // Section styles
  section: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
    fontFamily: "Roboto",
  },

  // Ingredients styles
  ingredientsContainer: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 16,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  ingredientBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B35",
    marginRight: 12,
  },
  ingredientName: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
    fontFamily: "Roboto",
  },
  ingredientQuantity: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
    fontFamily: "Roboto",
  },

  // Steps styles
  stepsContainer: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 16,
  },
  stepItem: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 4,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "Roboto",
  },
  stepContent: {
    flex: 1,
  },
  stepText: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 24,
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  stepImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginTop: 8,
  },

  // Tips
  tip: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    fontFamily: "Roboto-Regular",
    lineHeight: 24,
    backgroundColor: "#FFF9E6",
    padding: 16,
    borderRadius: 8,
  },

  // Updated action buttons
  actionButtons: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  favoriteButton: {
    flex: 1,
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginRight: 8,
  },
  favoriteButtonText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  shareButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  shareButtonText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  startCookingButton: {
    flex: 1,
    backgroundColor: "#FF6B35",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginLeft: 8,
  },
  startCookingButtonText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },

  // Recipe image
  recipeImage: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },

  // Rating and difficulty
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingText: {
    fontSize: FONT_SIZES.md,
    fontFamily: "Roboto-Regular",
    color: COLORS.text.secondary,
    marginLeft: 8,
  },
  difficultyBadge: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: "auto",
  },
  difficultyText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.sm,
    fontFamily: "Roboto-Medium",
  },

  // Tags
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  tag: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    fontFamily: "Roboto-Regular",
  },

  // Nutrition info
  nutritionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  nutritionItem: {
    alignItems: "center",
  },
  nutritionValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    fontFamily: "Roboto-Bold",
  },
  nutritionLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text.secondary,
    fontFamily: "Roboto-Regular",
    marginTop: 4,
  },

  // Recipe Guide Screen styles
  guideHeader: {
    backgroundColor: "#FF6B35",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  guideTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Roboto",
    flex: 1,
    textAlign: "center",
  },
  stepIndicator: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  stepIndicatorText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },

  // Timer Section
  timerSection: {
    backgroundColor: "#FFF3E0",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  timerDisplay: {
    alignItems: "center",
    marginBottom: 15,
  },
  timerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF6B35",
    fontFamily: "Roboto",
  },
  timerStatus: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Roboto",
  },

  // Main Timer Control
  mainTimerControl: {
    alignItems: "center",
    marginBottom: 15,
  },
  mainTimerButton: {
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
    minWidth: 140,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  startMainButton: {
    backgroundColor: "#4CAF50",
  },
  stopMainButton: {
    backgroundColor: "#F44336",
  },
  mainTimerButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },

  // Timer Controls (smaller buttons)
  timerControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  timerButton: {
    backgroundColor: "#FF6B35",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 2,
    marginVertical: 2,
    minWidth: 45,
    alignItems: "center",
  },
  timerButtonText: {
    fontSize: 11,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },

  // Step Content
  stepContentGUI: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  stepScrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  currentStep: {
    backgroundColor: "#FFFFFF",
  },
  currentStepNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B35",
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  stepGuideImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  currentStepContent: {
    fontSize: 18,
    color: "#333333",
    lineHeight: 26,
    marginBottom: 20,
    fontFamily: "Roboto",
  },
  suggestedTimeContainer: {
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  suggestedTimeText: {
    fontSize: 16,
    color: "#1976D2",
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  tipsContainer: {
    backgroundColor: "#FFF8E1",
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FFC107",
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F57C00",
    marginBottom: 5,
    fontFamily: "Roboto",
  },
  tipsText: {
    fontSize: 14,
    color: "#F57C00",
    lineHeight: 20,
    fontFamily: "Roboto",
  },

  // Navigation Buttons
  navigationButtons: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },
  prevButton: {
    backgroundColor: "#757575",
  },
  nextButton: {
    backgroundColor: "#FF6B35",
  },
  completeButton: {
    backgroundColor: "#4CAF50",
  },
  disabledButton: {
    backgroundColor: "#E0E0E0",
  },
  navButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  disabledButtonText: {
    color: "#BDBDBD",
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Roboto",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginRight: 10,
  },
  modalConfirmButton: {
    flex: 1,
    backgroundColor: "#FF6B35",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginLeft: 10,
  },
  modalCancelText: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  modalConfirmText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
});

export default recipeStyles;
