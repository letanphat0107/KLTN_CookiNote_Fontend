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
    backgroundColor: "#ffffff",
  },

  aiChatButton: {
    backgroundColor: "#ffffff",
  },

  buttonIcon: {
    fontSize: 24,
    color: "#FFFFFF",
  },

  // Modal Overlay
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  paddingHorizontal: 20,
  paddingVertical: 10,
},


  // Add Form
  addFormContainer: {
    padding: 20,
    backgroundColor: "#F8F9FA",
    marginHorizontal: 20,
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
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  showAddFormButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
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

  shoppingListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginTop: 10,
  },

   // Shopping Group Styles
  shoppingGroup: {
    marginBottom: 20,
  },

  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },

  groupTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  groupIcon: {
    fontSize: 20,
    marginRight: 12,
  },

  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
    flex: 1,
  },


  groupItems: {
    paddingLeft: 10,
  },

  // Badge for floating button
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },


  // Loading container
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    minHeight: 200,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },

  // Empty container
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    minHeight: 200,
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },

  emptyDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },

  // Checkbox styles
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    backgroundColor: '#FFFFFF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },

  checkboxIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Item info
  itemInfo: {
    flex: 1,
  },

  itemInfoChecked: {
    opacity: 0.6,
  },

  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },

  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },

  itemQuantity: {
    fontSize: 13,
    color: '#666666',
  },

  itemQuantityChecked: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },

  recipeTag: {
    fontSize: 11,
    color: '#FF6B35',
    fontStyle: 'italic',
    marginTop: 2,
  },

  removeItemButton: {
    padding: 8,
  },

  removeItemText: {
    fontSize: 16,
  },

  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  quickActionButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },

  quickActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // Recipe Suggestions
  suggestionsContainer: {
    marginTop: 10,
  },

  suggestionCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  suggestionImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },

  suggestionInfo: {
    flex: 1,
  },

  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },

  suggestionJustification: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 8,
    fontStyle: 'italic',
  },

  suggestionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  suggestionTime: {
    fontSize: 12,
    color: '#666666',
  },

  suggestionDifficulty: {
    fontSize: 12,
    fontWeight: '600',
  },

  suggestionScore: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
  },

  // Ingredient Selector Modal
  ingredientModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  ingredientModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    padding: 0,
    flex: 1,
  },

  ingredientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  ingredientTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },

  ingredientSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    paddingVertical: 10,
    backgroundColor: '#F8F9FA',
  },

  ingredientList: {
    flex: 1,
    paddingHorizontal: 15,
  },

  ingredientGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 15,
    gap: 8,
  },

  ingredientChip: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  ingredientChipSelected: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },

  ingredientChipText: {
    fontSize: 14,
    color: '#333333',
  },

  ingredientChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  ingredientActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 15,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '600',
  },

  getSuggestionsButton: {
    flex: 2,
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  getSuggestionsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  disabledButton: {
    backgroundColor: '#CCCCCC',
  },


  clearHistoryButton: {
    padding: 5,
  },

  clearHistoryText: {
    fontSize: 18,
  },

  // Loading history
  loadingHistoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },

  loadingHistoryText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },

   headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  clearCheckedButton: {
    backgroundColor: '#FF4444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  clearCheckedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  // Group actions
  groupActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  removeGroupButton: {
    padding: 4,
  },

  removeGroupText: {
    fontSize: 16,
  },

  // Checkbox processing state
  checkboxProcessing: {
    backgroundColor: '#F0F0F0',
    borderColor: '#CCCCCC',
  },

  // Updated group item count to show checked/total
  groupItemCount: {
    fontSize: 12,
    color: '#666666',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: '500',
    minWidth: 80,
    textAlign: 'center',
  },
});
