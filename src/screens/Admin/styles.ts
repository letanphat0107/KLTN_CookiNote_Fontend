import { StyleSheet } from "react-native";

export const adminStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  addContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20
  }
  ,
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: "1%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  section: {
    marginTop: 16,
    backgroundColor: "#fff",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  actionContent: {
    flex: 1,
    marginLeft: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  actionSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  activityText: {
    marginLeft: 8,
    color: "#666",
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 14,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: "#FF6B6B",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  filterButtonTextActive: {
    color: "#fff",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  userEmail: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  userMeta: {
    flexDirection: "row",
    marginTop: 4,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
  },
  roleBadgeText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "600",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
  },


  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalBody: {
    padding: 20,
    alignItems: "center",
  },
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  modalName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  modalEmail: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
  },
  toggleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
  },
  comingSoonText: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },

  actionIcon: {
    fontSize: 24,
    color: "#FF6B6B", // Màu chủ đạo
    marginRight: 10,
  },
  actionArrow: {
    fontSize: 20,
    color: "#FF6B6B", // Màu chủ đạo
    marginLeft: "auto",
  },

  // Recipe Management Styles
  recipeCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recipeImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  recipeInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  recipeOwner: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  recipeMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "600",
  },
  recipeViews: {
    fontSize: 12,
    color: "#666",
  },
  recipeRating: {
    fontSize: 12,
    color: "#666",
  },


  // Style bổ sung cho container tổng thể của modal (nếu cần)
  modalContentContainer: {
    padding: 20,
  },

  

  /** * Style dành riêng cho nút Xóa/Hủy (màu đỏ). */

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  imagePickerButton: {
    backgroundColor: "#f5f5f5",
    padding: 40,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
  },
  coverPreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  stepContainer: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#FF6B6B",
  },
  removeButton: {
    marginTop: 12,
    padding: 8,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#FF6B6B",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },



  // -----------------------------------------------------------------
  // STYLE CHO CÁC DÒNG THÔNG TIN (Label-Value)
  // -----------------------------------------------------------------

  // -----------------------------------------------------------------
  // STYLE CHO NÚT TẠO MỚI (Create Recipe Button)
  // -----------------------------------------------------------------
  createButton: {
    backgroundColor: "#FF6B6B", // ⬅️ Dùng màu chủ đạo
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    marginVertical: 15,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },




  // Modal Styles - Full Screen
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "95%",
    height: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalRecipeImage: {
    width: "100%",
    height: 280,
    backgroundColor: "#F8F9FA",
  },
  modalRecipeTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#212529",
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  modalInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F5",
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6C757D",
    flex: 1,
  },
  modalValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#212529",
    textAlign: "right",
    flex: 1.5,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    marginHorizontal: 24,
    marginBottom: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#F1F3F5",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  deleteButton: {
    backgroundColor: "#DC3545",
  },
  cancelButton: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  cancelButtonText: {
    color: "#6C757D",
  },
  fabButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF6B6B",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 999,
  },
  fabIcon: {
    fontSize: 32,
    fontWeight: "300",
    color: "#FFFFFF",
    lineHeight: 32,
  },
  recipeActions: {
    flexDirection: "column",
    gap: 8,
    marginLeft: 8,
    justifyContent: "center",
  },
  actionIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIconText: {
    fontSize: 16,
  },
  stepImagesContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 10,
  marginTop: 10,
  marginBottom: 10,
},
stepImageWrapper: {
  position: "relative",
  width: 100,
  height: 100,
},
stepImagePreview: {
  width: "100%",
  height: "100%",
  borderRadius: 8,
  backgroundColor: "#f0f0f0",
},
stepImageRemoveButton: {
  position: "absolute",
  top: -8,
  right: -8,
  backgroundColor: "#FF4444",
  width: 24,
  height: 24,
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
stepImageRemoveButtonText: {
  color: "#FFFFFF",
  fontSize: 14,
  fontWeight: "bold",
  lineHeight: 14,
},
stepImageNumber: {
  position: "absolute",
  bottom: 4,
  right: 4,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  width: 20,
  height: 20,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
},
stepImageNumberText: {
  color: "#FFFFFF",
  fontSize: 11,
  fontWeight: "bold",
},
imageRemoveButton: {
  position: "absolute",
  top: 0,
  right: 8,
  backgroundColor: "#FF4444",
  width: 30,
  height: 30,
  borderRadius: 15,
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
imageRemoveButtonText: {
  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: "bold",
  lineHeight: 18,
},

categoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  categoryImageContainer: {
    marginBottom: 12,
  },

  categoryImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },

  categoryImagePlaceholder: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },

  categoryInfo: {
    marginBottom: 12,
  },

  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },

  categoryDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },

  categoryRecipeCount: {
    fontSize: 12,
    color: "#999",
  },

  categoryActions: {
    flexDirection: "row",
    gap: 8,
  },

  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  modalInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  imagePreview: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },

  pickImageButton: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderStyle: "dashed",
  },

  pickImageButtonText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },

  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },

  modalCancelButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  modalCancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },

  modalSubmitButton: {
    flex: 1,
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  modalSubmitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  disabledButton: {
    opacity: 0.5,
  },

  // Picker styles
  pickerContainer: {
    maxHeight: 200,
    marginBottom: 12,
  },

  pickerItem: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },

  pickerItemSelected: {
    backgroundColor: "#FFE5E5",
    borderColor: "#FF6B6B",
  },

  pickerItemText: {
    fontSize: 16,
    color: "#666",
  },

  pickerItemTextSelected: {
    color: "#FF6B6B",
    fontWeight: "600",
  },

  modernCategoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  modernCategoryImageWrapper: {
    width: "100%",
    height: 180,
  },

  modernCategoryImage: {
    width: "100%",
    height: "100%",
  },

  modernCategoryImagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
  },

  modernCategoryContent: {
    padding: 16,
  },

  modernCategoryName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 8,
  },

  modernCategoryDescription: {
    fontSize: 14,
    color: "#7F8C8D",
    lineHeight: 20,
  },

  modernCategoryActions: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },

  modernActionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },

  // Modern Modal
  modernModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },

  modernModalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: "95%",
    overflow: "hidden",
  },

  modernModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  modernModalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
  },

  modernModalSubtitle: {
    fontSize: 14,
    color: "#7F8C8D",
    marginTop: 4,
  },

  modernModalContent: {
    padding: 20,
  },

  // Image Section
  imageSection: {
    marginBottom: 24,
  },

  modernImagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },

  modernImagePlaceholder: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    marginBottom: 12,
  },

  imagePlaceholderText: {
    marginTop: 8,
    fontSize: 14,
    color: "#95A5A6",
  },

  modernPickImageButton: {
    flexDirection: "row",
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  modernPickImageText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // Form
  formGroup: {
    marginBottom: 20,
  },

  formLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 8,
  },

  modernInput: {
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#2C3E50",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  modernTextArea: {
    height: 120,
    paddingTop: 14,
  },

  modernModalFooter: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  modernCancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    justifyContent: "center",
  },

  modernCancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7F8C8D",
  },

  modernSubmitButton: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#FF6B6B",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  modernSubmitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  modernButtonDisabled: {
    opacity: 0.5,
  },

  // Detail Modal
  detailInfoSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  detailCategoryImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },

  detailCategoryDescription: {
    fontSize: 14,
    color: "#7F8C8D",
    lineHeight: 22,
  },

  // Move Section
  moveSection: {
    padding: 20,
    backgroundColor: "#FFF5F5",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  moveSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 12,
  },

  categoryPickerScroll: {
    marginVertical: 12,
  },

  categoryPickerItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    marginRight: 8,
  },

  categoryPickerItemSelected: {
    backgroundColor: "#FF6B6B",
    borderColor: "#FF6B6B",
  },

  categoryPickerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7F8C8D",
  },

  categoryPickerTextSelected: {
    color: "#FFFFFF",
  },

  modernMoveButton: {
    flexDirection: "row",
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },

  modernMoveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Recipe List
  recipeListSection: {
    flex: 1,
    padding: 20,
  },


  recipeList: {
    flex: 1,
  },

  recipeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#F0F0F0",
  },

  recipeItemSelected: {
    borderColor: "#FF6B6B",
    backgroundColor: "#FFF5F5",
  },

  recipeCheckbox: {
    marginRight: 12,
  },

  recipeItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },

  recipeItemInfo: {
    flex: 1,
  },

  recipeItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 4,
  },

  recipeItemMeta: {
    fontSize: 12,
    color: "#95A5A6",
  },

  emptyRecipeList: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  emptyRecipeText: {
    marginTop: 12,
    fontSize: 14,
    color: "#95A5A6",
  },

  // Header
  modernHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    gap: 12,
  },

  searchWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },

  modernSearchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#2C3E50",
  },

  modernCreateButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B6B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  listContainer: {
    paddingVertical: 8,
  },
});
