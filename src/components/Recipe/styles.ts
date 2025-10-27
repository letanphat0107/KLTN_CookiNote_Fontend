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

});
