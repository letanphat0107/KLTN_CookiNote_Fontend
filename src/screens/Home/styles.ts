import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    padding: 20,
    backgroundColor: "#F8F8F8",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    fontFamily: "Roboto",
  },
  content: {
    flex: 1,
    padding: 16,
  },

  // Search bar styles
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333333",
    fontFamily: "Roboto",
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 18,
    color: "#666666",
  },

  // Welcome section
  welcomeSection: {
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
    fontFamily: "Roboto",
  },

  // Category section
  categorySection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
    fontFamily: "Roboto",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    width: "48%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    fontFamily: "Roboto",
  },

  // Popular recipes section
  recipeCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  recipeImage: {
    width: "100%",
    height: 160,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
  },
  recipeImagePlaceholder: {
    fontSize: 40,
    color: "#FFFFFF",
  },
  recipeInfo: {
    padding: 16,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  recipeDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: "Roboto",
  },
  recipeStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recipeStat: {
    fontSize: 12,
    color: "#999999",
    fontFamily: "Roboto",
  },

  // Action buttons
  primaryButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF6B6B",
  },
  secondaryButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },

  // Center content for unauthenticated home
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "Roboto",
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    fontFamily: "Roboto",
  },
  featuresSection: {
    width: "100%",
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
    fontFamily: "Roboto",
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },

  // Unauthenticated Home styles
  unauthHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#EB5B00",
    gap: 20,
  },
  searchWrapper: {
    marginTop: 30,
    flex: 1,
  },
  unauthSearchInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  accountButton: {
    backgroundColor: "#FFA952",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 30,
  },
  accountButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Roboto-Bold",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  scrollContent: {
    flex: 1,
  },

  // Suggestion Banner
  suggestionBanner: {
    backgroundColor: "#FFE4B3",
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    fontFamily: "Roboto-Bold",
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Roboto-Regular",
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  bannerButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Roboto-Bold",
  },
  bannerImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginLeft: 12,
  },

  // Categories Grid
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  categoryItem: {
    alignItems: "center",
    marginBottom: 15,
    width: "18%",
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#F8F8F8",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    color: "#333333",
    fontFamily: "Roboto-Regular",
    textAlign: "center",
  },

  // Recipe Sections
  recipeSection: {
    marginBottom: 24,
    marginLeft: 20,
  },
  recipeRow: {
    flexDirection: "row",
    gap: 12,
  },
  recipeCardHorizontal: {
    width: 150,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recipeCardImage: {
    width: "100%",
    height: 100,
  },
  recipeCardTitle: {
    fontSize: 12,
    color: "#333333",
    fontFamily: "Roboto-Regular",
    padding: 8,
    lineHeight: 16,
  },
  commonRecipesContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
  },

  // Login Prompt Card
  loginPromptCard: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginPromptTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B6B",
    fontFamily: "Roboto-Bold",
    marginBottom: 8,
  },
  loginPromptSubtitle: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Roboto-Regular",
    lineHeight: 20,
    marginBottom: 20,
  },
  loginPromptButtons: {
    flexDirection: "row",
    gap: 12,
  },
  registerButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#333333",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#333333",
    fontSize: 14,
    fontFamily: "Roboto-Bold",
  },
  loginButton: {
    flex: 1,
    backgroundColor: "#333333",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Roboto-Bold",
  },
});
