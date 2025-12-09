// src/screens/Suggestion/styles.ts
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const personalizedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },

  header: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 8,
    fontFamily: "Roboto-Bold",
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
    fontFamily: "Roboto-Regular",
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 80,
  },

  section: {
    backgroundColor: "#FFFFFF",
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
    fontFamily: "Roboto-Bold",
  },

  inputRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  inputGroup: {
    flex: 1,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555555",
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
  },

  input: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333333",
    fontFamily: "Roboto-Regular",
  },

  textArea: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#333333",
    fontFamily: "Roboto-Regular",
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 12,
  },

  buttonGroup: {
    flexDirection: "row",
    gap: 8,
  },

  genderButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
  },

  genderButtonActive: {
    backgroundColor: "#FF6B35",
    borderColor: "#FF6B35",
  },

  genderButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666666",
    fontFamily: "Roboto-Medium",
  },

  genderButtonTextActive: {
    color: "#FFFFFF",
  },

  activityButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },

  activityButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  activityButtonActive: {
    backgroundColor: "#FF6B35",
    borderColor: "#FF6B35",
  },

  activityButtonText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666666",
    fontFamily: "Roboto-Medium",
  },

  activityButtonTextActive: {
    color: "#FFFFFF",
  },

  mealButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },

  mealButton: {
    width: "48%",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
  },

  mealButtonActive: {
    backgroundColor: "#FF6B35",
    borderColor: "#FF6B35",
  },

  mealButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
    fontFamily: "Roboto-Medium",
  },

  mealButtonTextActive: {
    color: "#FFFFFF",
  },

  metricsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },

  metricCard: {
    flex: 1,
    backgroundColor: "#FFF5F0",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFE4D6",
  },

  metricValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6B35",
    marginTop: 8,
    fontFamily: "Roboto-Bold",
  },

  metricLabel: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
    fontFamily: "Roboto-Regular",
  },

  metricCategory: {
    fontSize: 11,
    color: "#999999",
    marginTop: 2,
    fontFamily: "Roboto-Regular",
  },

  submitButton: {
    backgroundColor: "#FF6B35",
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    elevation: 3,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  submitButtonDisabled: {
    backgroundColor: "#CCCCCC",
  },

  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "Roboto-Bold",
  },

  resultsSection: {
    marginTop: 24,
    marginHorizontal: 16,
  },

  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
    fontFamily: "Roboto-Bold",
  },

  resultsSubtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
  },

  recipeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  recipeImage: {
    width: "100%",
    height: 180,
  },

  recipeContent: {
    padding: 16,
  },

  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
    fontFamily: "Roboto-Bold",
  },

  recipeDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: "Roboto-Regular",
  },

  recipeMetrics: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },

  metricItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  metricText: {
    fontSize: 13,
    color: "#555555",
    fontFamily: "Roboto-Regular",
  },

  viewDetailsButton: {
    backgroundColor: "#FF6B35",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  viewDetailsText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Roboto-Medium",
  },

  saveButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },

  saveButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Roboto-Medium",
  },

  emptyResults: {
    alignItems: "center",
    paddingVertical: 48,
    marginHorizontal: 16,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666666",
    marginTop: 16,
    fontFamily: "Roboto-Medium",
  },

  emptySubtext: {
    fontSize: 14,
    color: "#999999",
    marginTop: 8,
    fontFamily: "Roboto-Regular",
  },
});