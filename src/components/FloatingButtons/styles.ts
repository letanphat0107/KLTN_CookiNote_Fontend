// src/components/FloatingButtons/styles.ts
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const floatingStyles = StyleSheet.create({
  // Container
  container: {
    position: "absolute",
    bottom: 100,
    right: 20,
    zIndex: 1000,
  },

  // Floating Buttons
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 15,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  shoppingListButton: {
    backgroundColor: "#4CAF50",
  },

  aiChatButton: {
    backgroundColor: "#2196F3",
  },

  buttonIcon: {
    fontSize: 24,
    color: "#FFFFFF",
  },

  // Modal Overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  // Shopping List Modal
  shoppingListModal: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.7,
    paddingBottom: 20,
  },

  // AI Chat Modal
  aiChatModal: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.8,
    paddingBottom: 20,
  },

  // Modal Header
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },

  closeButton: {
    fontSize: 20,
    color: "#666666",
    padding: 5,
  },

  // Shopping List Content
  shoppingListContent: {
    flex: 1,
    paddingHorizontal: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666666",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },

  emptyDescription: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
  },

  // Add Form
  addFormContainer: {
    padding: 20,
    backgroundColor: "#F8F9FA",
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 12,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 10,
  },

  formButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  cancelButtonText: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "600",
  },

  addButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  showAddFormButton: {
    backgroundColor: "#4CAF50",
    marginHorizontal: 20,
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  showAddFormButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // Shopping List Items
  shoppingListItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    marginTop: 10,
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },

  itemQuantity: {
    fontSize: 14,
    color: "#666666",
  },

  removeItemButton: {
    padding: 8,
  },

  removeItemText: {
    fontSize: 18,
  },

  // Chat Content
  chatContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  messageContainer: {
    marginVertical: 5,
    maxWidth: "80%",
  },

  userMessage: {
    alignSelf: "flex-end",
  },

  aiMessage: {
    alignSelf: "flex-start",
  },

  messageText: {
    fontSize: 16,
    lineHeight: 22,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 18,
  },

  userMessageText: {
    backgroundColor: "#2196F3",
    color: "#FFFFFF",
  },

  aiMessageText: {
    backgroundColor: "#F0F0F0",
    color: "#333333",
  },

  messageTime: {
    fontSize: 12,
    color: "#999999",
    marginTop: 4,
    textAlign: "right",
  },

  loadingMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 18,
  },

  loadingMessageText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666666",
    fontStyle: "italic",
  },

  // Chat Input
  chatInputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    backgroundColor: "#FFFFFF",
  },

  chatInput: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 10,
  },

  sendButton: {
    backgroundColor: "#2196F3",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  sendButtonDisabled: {
    backgroundColor: "#CCCCCC",
  },

  sendButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
});
