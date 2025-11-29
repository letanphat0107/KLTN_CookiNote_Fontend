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
    marginTop: 40,
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
  backIcon: {
    width: 30,
    height: 30,
    tintColor: "#ffffff",
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

  navButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Roboto",
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

  // Countdown styles
  countdownContainer: {
    backgroundColor: "#FFF3E0",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF6B35",
  },
  countdownText: {
    fontSize: 16,
    color: "#FF6B35",
    fontWeight: "bold",
    textAlign: "center",
  },

  // Toast styles
  toastContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 1000,
    elevation: 1000,
  },
  toastContent: {
    backgroundColor: "#FF6B35",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  toastText: {
    flex: 1,
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
    lineHeight: 30,
    marginLeft: 8,
  },
  toastCloseButton: {
    marginLeft: 16,
    padding: 4,
  },
  toastCloseText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  disabledCookingButton: {
    backgroundColor: "#CCCCCC",
  },
  disabledCookingButtonText: {
    color: "#666666",
  },
    loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 30,
  },

  errorTitle: {
    fontSize: 48,
    marginBottom: 15,
  },

  errorMessage: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },

  retryButton: {
    backgroundColor: "#FF6B35",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 15,
  },

  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  backButtonText: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "600",
  },

  // Owner Section
  ownerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  ownerText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },

  viewText: {
    fontSize: 12,
    color: "#999999",
    fontWeight: "400",
  },

  stepTimeContainer: {
    backgroundColor: "#F0F8FF",
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#4CAF50",
  },

  stepTimeText: {
    fontSize: 13,
    color: "#2E7D32",
    fontWeight: "500",
  },

  stepTipsContainer: {
    backgroundColor: "#FFF8E1",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#FF9800",
  },

  stepTipsTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#E65100",
    marginBottom: 4,
  },

  stepTipsText: {
    fontSize: 13,
    color: "#BF360C",
    lineHeight: 18,
    fontStyle: "italic",
  },

  noDataText: {
    fontSize: 14,
    color: "#999999",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 20,
  },
  stepImagesWrapper: {
    marginTop: 10,
    marginBottom: 8,
  },

  stepImagesContainer: {
    marginTop: 8,
  },

  stepImageContainer: {
    position: "relative",
    marginRight: 12,
    borderRadius: 10,
    overflow: "hidden",
  },

  stepImage: {
    width: 120,
    height: 90,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },

  imageCounter: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  imageCounterText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },

  scrollHint: {
    fontSize: 12,
    color: "#666666",
    fontStyle: "italic",
    marginTop: 6,
    textAlign: "center",
  },
  
  // Enhanced Favorite Button Styles
  favoriteButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    minWidth: 110,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  favoriteActiveButton: {
    backgroundColor: "#FF6B35",
  },

  favoriteButtonText: {
    color: "#666666",
    fontSize: 14,
    fontWeight: "600",
  },

  favoriteActiveButtonText: {
    color: "#FFFFFF",
  },

  // Action buttons container
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

    actionButtonsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 15,
    gap: 15,
  },

  editButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  addToCartButton: {
    flex: 1,
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  addToCartButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  disabledButton: {
    backgroundColor: '#CCCCCC',
    elevation: 0,
    shadowOpacity: 0,
  },

  disabledButtonText: {
    color: '#666666',
  },

  // Add these modern RecipeGuide styles to src/screens/Recipe/styles.ts

// ============ MODERN RECIPE GUIDE STYLES ============

// Toast
modernToast: {
  position: "absolute",
  top: 60,
  left: 20,
  right: 20,
  zIndex: 9999,
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  borderRadius: 12,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
},

modernToastContent: {
  flexDirection: "row",
  alignItems: "center",
  padding: 16,
  gap: 12,
},

modernToastText: {
  flex: 1,
  fontSize: 14,
  color: "#FFFFFF",
  lineHeight: 20,
},

modernToastClose: {
  padding: 4,
},

// Header
modernGuideHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  paddingTop: 60,
  paddingBottom: 16,
  backgroundColor: "#FFFFFF",
  borderBottomWidth: 1,
  borderBottomColor: "#F0F0F0",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 2,
},

modernHeaderButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "#F8F9FA",
  justifyContent: "center",
  alignItems: "center",
},

modernHeaderCenter: {
  flex: 1,
  alignItems: "center",
  paddingHorizontal: 16,
},

modernGuideTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#2C3E50",
  textAlign: "center",
  marginBottom: 4,
},

modernGuideSubtitle: {
  fontSize: 14,
  color: "#7F8C8D",
  textAlign: "center",
},

// Progress Bar
modernProgressContainer: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 20,
  paddingVertical: 12,
  backgroundColor: "#FFFFFF",
  gap: 12,
},

modernProgressBar: {
  flex: 1,
  height: 8,
  backgroundColor: "#E0E0E0",
  borderRadius: 4,
  overflow: "hidden",
},

modernProgressFill: {
  height: "100%",
  backgroundColor: "#FF6B6B",
  borderRadius: 4,
},

modernProgressText: {
  fontSize: 14,
  fontWeight: "bold",
  color: "#FF6B6B",
  minWidth: 45,
  textAlign: "right",
},

// Timer Section
modernTimerSection: {
  backgroundColor: "#FFFFFF",
  paddingVertical: 16,
  borderBottomWidth: 1,
  borderBottomColor: "#F0F0F0",
},

modernTimerDisplay: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 20,
  marginBottom: 12,
  gap: 16,
},

modernTimerIconWrapper: {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: "#FFF5F5",
  justifyContent: "center",
  alignItems: "center",
},

modernTimerInfo: {
  flex: 1,
},

modernTimerText: {
  fontSize: 32,
  fontWeight: "bold",
  color: "#2C3E50",
  letterSpacing: 2,
  fontVariant: ["tabular-nums"],
},

modernTimerStatus: {
  fontSize: 13,
  color: "#7F8C8D",
  marginTop: 2,
},

modernTimerToggle: {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: "#95A5A6",
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 4,
},

modernTimerToggleActive: {
  backgroundColor: "#FF6B6B",
},

modernCountdownBanner: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 8,
  paddingHorizontal: 20,
  backgroundColor: "#FFF3E0",
  gap: 8,
  marginHorizontal: 20,
  marginBottom: 12,
  borderRadius: 8,
},

modernCountdownText: {
  fontSize: 13,
  color: "#F57C00",
  fontWeight: "600",
},

modernTimerQuickActions: {
  maxHeight: 50,
},

modernTimerPreset: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 16,
  paddingVertical: 10,
  backgroundColor: "#F8F9FA",
  borderRadius: 20,
  marginRight: 8,
  gap: 6,
  borderWidth: 1,
  borderColor: "#E0E0E0",
},

modernTimerPresetReset: {
  backgroundColor: "#FFEBEE",
  borderColor: "#FFCDD2",
},

modernTimerPresetText: {
  fontSize: 14,
  fontWeight: "600",
  color: "#FF6B6B",
},

// Step Content
modernStepContent: {
  flex: 1,
  backgroundColor: "#F8F9FA",
},

modernStepCard: {
  backgroundColor: "#FFFFFF",
  margin: 20,
  borderRadius: 16,
  padding: 20,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
},

modernStepHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 16,
},

modernStepBadge: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FF6B6B",
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 16,
  gap: 6,
},

modernStepBadgeText: {
  fontSize: 13,
  fontWeight: "bold",
  color: "#FFFFFF",
},

modernStepTimeBadge: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FFF3E0",
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 12,
  gap: 4,
},

modernStepTimeBadgeText: {
  fontSize: 12,
  fontWeight: "600",
  color: "#F57C00",
},

// Step Images
modernStepImagesWrapper: {
  marginBottom: 16,
},

modernStepImagesScroll: {
  marginHorizontal: -20,
},


modernStepImage: {
  width: "100%",
  height: 200,
  borderRadius: 12,
  backgroundColor: "#F0F0F0",
},

modernImageBadge: {
  position: "absolute",
  top: 12,
  right: 12,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 12,
  gap: 4,
},

modernImageBadgeText: {
  fontSize: 12,
  fontWeight: "bold",
  color: "#FFFFFF",
},

modernScrollHint: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 8,
  gap: 6,
},

modernScrollHintText: {
  fontSize: 12,
  color: "#7F8C8D",
  fontStyle: "italic",
},

modernStepText: {
  fontSize: 16,
  lineHeight: 24,
  color: "#2C3E50",
  marginBottom: 16,
},

// Tips Card
modernTipsCard: {
  backgroundColor: "#FFFBF0",
  borderRadius: 12,
  padding: 16,
  borderWidth: 1,
  borderColor: "#FFE082",
},

modernTipsHeader: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  marginBottom: 8,
},

modernTipsTitle: {
  fontSize: 15,
  fontWeight: "bold",
  color: "#F57C00",
},

modernTipsText: {
  fontSize: 14,
  lineHeight: 20,
  color: "#6D4C41",
},

// Navigation
modernNavigation: {
  flexDirection: "row",
  padding: 20,
  gap: 12,
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#F0F0F0",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 8,
},

modernNavButton: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 14,
  borderRadius: 12,
  gap: 8,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 3,
},

modernNavButtonPrev: {
  backgroundColor: "#F8F9FA",
  borderWidth: 1,
  borderColor: "#E0E0E0",
},

modernNavButtonNext: {
  backgroundColor: "#4A90E2",
},

modernNavButtonComplete: {
  backgroundColor: "#4CAF50",
},

modernNavButtonDisabled: {
  backgroundColor: "#E0E0E0",
  shadowOpacity: 0,
  elevation: 0,
},

modernNavButtonText: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#2C3E50",
},

modernNavButtonTextDisabled: {
  color: "#BDC3C7",
},

modernNavButtonTextWhite: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#FFFFFF",
},

// Error Screen
modernErrorContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 40,
  backgroundColor: "#F8F9FA",
},

modernErrorIcon: {
  width: 120,
  height: 120,
  borderRadius: 60,
  backgroundColor: "#F5F5F5",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 24,
},

modernErrorTitle: {
  fontSize: 20,
  fontWeight: "bold",
  color: "#2C3E50",
  marginBottom: 8,
  textAlign: "center",
},

modernErrorMessage: {
  fontSize: 14,
  color: "#7F8C8D",
  textAlign: "center",
  marginBottom: 24,
  lineHeight: 20,
},

modernRetryButton: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FF6B6B",
  paddingHorizontal: 24,
  paddingVertical: 12,
  borderRadius: 24,
  gap: 8,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 4,
},

modernRetryButtonText: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#FFFFFF",
},

// Modal
modernModalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
},

modernModalContainer: {
  width: "100%",
  maxWidth: 400,
  backgroundColor: "#FFFFFF",
  borderRadius: 20,
  overflow: "hidden",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 12,
  elevation: 8,
},

modernModalHeader: {
  flexDirection: "row",
  alignItems: "center",
  padding: 20,
  borderBottomWidth: 1,
  borderBottomColor: "#F0F0F0",
  gap: 12,
},

modernModalTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#2C3E50",
  flex: 1,
},

modernModalBody: {
  padding: 20,
},

modernModalLabel: {
  fontSize: 14,
  fontWeight: "600",
  color: "#2C3E50",
  marginBottom: 12,
},

modernModalInputWrapper: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#F8F9FA",
  borderRadius: 12,
  paddingHorizontal: 16,
  borderWidth: 1,
  borderColor: "#E0E0E0",
  gap: 12,
},

modernModalInput: {
  flex: 1,
  fontSize: 16,
  color: "#2C3E50",
  paddingVertical: 14,
},

modernModalInputUnit: {
  fontSize: 14,
  fontWeight: "600",
  color: "#7F8C8D",
},

modernModalFooter: {
  flexDirection: "row",
  padding: 20,
  gap: 12,
  borderTopWidth: 1,
  borderTopColor: "#F0F0F0",
},

modernModalButtonCancel: {
  flex: 1,
  paddingVertical: 14,
  borderRadius: 12,
  backgroundColor: "#F8F9FA",
  borderWidth: 1,
  borderColor: "#E0E0E0",
  alignItems: "center",
},

modernModalButtonCancelText: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#7F8C8D",
},

modernModalButtonConfirm: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 14,
  borderRadius: 12,
  backgroundColor: "#FF6B6B",
  gap: 8,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 4,
},

modernModalButtonConfirmText: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#FFFFFF",
},

// Rating styles
ratingContainer: {
  backgroundColor: "#FFFFFF",
  padding: 20,
  marginTop: 20,
  borderRadius: 12,
  marginHorizontal: 15,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},

ratingHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
},

ratingTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#2C3E50",
},

ratingStats: {
  flexDirection: "row",
  alignItems: "baseline",
  gap: 4,
},

averageRating: {
  fontSize: 24,
  fontWeight: "bold",
  color: "#FFD700",
},

ratingCount: {
  fontSize: 14,
  color: "#7F8C8D",
},

starContainer: {
  flexDirection: "row",
  justifyContent: "center",
  gap: 8,
  paddingVertical: 12,
},

starButton: {
  padding: 4,
},

myRatingContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 12,
  paddingTop: 12,
  borderTopWidth: 1,
  borderTopColor: "#E0E0E0",
},

myRatingText: {
  fontSize: 14,
  color: "#2C3E50",
  fontWeight: "600",
},

deleteRatingButton: {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 6,
  backgroundColor: "#FFEBEE",
},

deleteRatingText: {
  fontSize: 13,
  color: "#E74C3C",
  fontWeight: "600",
},

// Comments styles
commentsSection: {
  backgroundColor: "#FFFFFF",
  padding: 20,
  marginTop: 20,
  marginHorizontal: 15,
  borderRadius: 12,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},

commentsSectionHeader: {
  marginBottom: 16,
},

commentInputContainer: {
  marginBottom: 20,
  borderWidth: 1,
  borderColor: "#E0E0E0",
  borderRadius: 12,
  padding: 12,
  backgroundColor: "#F8F9FA",
},

commentInput: {
  fontSize: 14,
  color: "#2C3E50",
  minHeight: 60,
  maxHeight: 120,
  textAlignVertical: "top",
  marginBottom: 8,
},

commentInputActions: {
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: 8,
},

cancelButton: {
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 6,
  backgroundColor: "#E0E0E0",
},

cancelButtonText: {
  fontSize: 14,
  color: "#7F8C8D",
  fontWeight: "600",
},

submitCommentButton: {
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 6,
  backgroundColor: "#FF6B35",
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
},

submitCommentButtonDisabled: {
  backgroundColor: "#BDC3C7",
},

loadingCommentsContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  gap: 12,
},

loadingCommentsText: {
  fontSize: 14,
  color: "#7F8C8D",
},

commentsList: {
  gap: 16,
},

commentItem: {
  paddingBottom: 16,
  borderBottomWidth: 1,
  borderBottomColor: "#F0F0F0",
},

commentReply: {
  marginLeft: 40,
  paddingLeft: 12,
  borderLeftWidth: 2,
  borderLeftColor: "#4A90E2",
  borderBottomWidth: 0,
},

commentHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 8,
},

commentUserInfo: {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  flex: 1,
},

commentAvatar: {
  width: 40,
  height: 40,
  borderRadius: 20,
  overflow: "hidden",
},

avatarImage: {
  width: "100%",
  height: "100%",
},

commentUserName: {
  fontSize: 14,
  fontWeight: "600",
  color: "#2C3E50",
},

commentTime: {
  fontSize: 12,
  color: "#95A5A6",
  marginTop: 2,
},

commentActions: {
  flexDirection: "row",
  gap: 8,
},

commentActionButton: {
  padding: 4,
},

commentContent: {
  fontSize: 14,
  color: "#34495E",
  lineHeight: 20,
  marginBottom: 8,
},

replyButton: {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  alignSelf: "flex-start",
  paddingVertical: 4,
},

replyButtonText: {
  fontSize: 13,
  color: "#4A90E2",
  fontWeight: "600",
},

repliesContainer: {
  marginTop: 12,
  gap: 12,
},

noCommentsContainer: {
  alignItems: "center",
  padding: 40,
},

noCommentsText: {
  fontSize: 14,
  color: "#95A5A6",
  marginTop: 12,
  textAlign: "center",
},
// Add new style for edited label
editedLabel: {
  fontSize: 11,
  color: "#95A5A6",
  fontStyle: "italic",
},
});

export default recipeStyles;
