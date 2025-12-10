// src/components/Recipe/styles.ts
import { StyleSheet } from "react-native";

export const editRecipeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },

  cancelButton: {
    fontSize: 16,
    color: "#666666",
  },

  saveButton: {
    fontSize: 16,
    color: "#FF6B35",
    fontWeight: "600",
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  section: {
    marginVertical: 20,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },

  addButton: {
    fontSize: 16,
    color: "#FF6B35",
    fontWeight: "600",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },

  textArea: {
    height: 80,
    textAlignVertical: "top",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },

  halfWidth: {
    flex: 1,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },

  picker: {
    height: 50,
  },

  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  removeButton: {
    padding: 8,
  },

  removeButtonText: {
    fontSize: 18,
  },

  stepContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },

  stepHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  stepNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B35",
  },
  optionGroup: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 15,
},
optionButton: {
  flex: 1,
  paddingVertical: 10,
  marginHorizontal: 5,
  backgroundColor: "#F2F2F2",
  borderRadius: 8,
  alignItems: "center",
},
optionButtonSelected: {
  backgroundColor: "#FF6B35",
},
optionText: {
  color: "#333",
  fontWeight: "500",
},
optionTextSelected: {
  color: "#FFF",
},
// Add these styles to src/components/Recipe/styles.ts at the end

  // AI Suggestion styles
  aiButtonContainer: {
    marginBottom: 10,
  },
  aiSuggestButton: {
    backgroundColor: "#8B5CF6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  aiSuggestButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Roboto-Medium",
  },
  aiInputContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#F9F5FF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  aiInputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B21A8",
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
  },
  aiTextArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  aiButtonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  aiCancelButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
  },
  aiCancelButtonText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Roboto-Medium",
  },
  aiApplyButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#8B5CF6",
  },
  aiApplyButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Roboto-Medium",
  },
});
