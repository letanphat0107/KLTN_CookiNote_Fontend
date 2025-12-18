import { StyleSheet } from "react-native";

export const adminStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  addContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
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
  modernModalOverlay1: {
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

  modernModalHeader1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  modernModalTitle1: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
  },

  modernModalSubtitle: {
    fontSize: 14,
    color: "#7F8C8D",
    marginTop: 4,
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

  // Modern Recipe Card
  modernRecipeCard: {
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

  modernRecipeImageWrapper: {
    width: "100%",
    height: 200,
    position: "relative",
  },

  modernRecipeImage: {
    width: "100%",
    height: "100%",
  },

  modernDifficultyBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },

  modernDifficultyText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  modernRecipeContent: {
    padding: 16,
  },

  modernRecipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 12,
  },

  modernRecipeMetaRow: {
    flexDirection: "row",
    gap: 16,
  },

  modernRecipeMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },

  modernRecipeMetaText: {
    fontSize: 12,
    color: "#7F8C8D",
  },

  modernRecipeActions: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },

  // Modern Filter
  modernFilterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  modernFilterButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#F8F9FA",
    gap: 4,
  },

  modernFilterButtonActive: {
    backgroundColor: "#FF6B6B",
  },

  modernFilterButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#7F8C8D",
  },

  modernFilterButtonTextActive: {
    color: "#FFFFFF",
  },

  // Detail Modal
  detailImageSection: {
    width: "100%",
    height: 240,
  },

  detailRecipeImage: {
    width: "100%",
    height: "100%",
  },

  detailInfoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  detailInfoItem: {
    alignItems: "center",
    gap: 4,
  },

  detailInfoLabel: {
    fontSize: 11,
    color: "#95A5A6",
    marginTop: 4,
  },

  detailInfoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
  },

  detailDifficultyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
  },

  detailDifficultyText: {
    fontSize: 16,
    fontWeight: "600",
  },

  detailDescription: {
    fontSize: 14,
    color: "#7F8C8D",
    lineHeight: 22,
    marginTop: 8,
  },

  detailActionsSection: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  detailActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#F8F9FA",
    gap: 6,
  },

  detailActionButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2C3E50",
  },

  // Add these modern form styles

// Modern Form
modernFormHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  paddingVertical: 16,
  backgroundColor: "#FFFFFF",
  borderBottomWidth: 1,
  borderBottomColor: "#F0F0F0",
  marginTop: 40,
},

modernBackButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "#F8F9FA",
  justifyContent: "center",
  alignItems: "center",
},

modernFormTitle: {
  fontSize: 20,
  fontWeight: "bold",
  color: "#2C3E50",
},

modernFormContent: {
  flex: 1,
  backgroundColor: "#F8F9FA",
},

modernSection: {
  backgroundColor: "#FFFFFF",
  marginTop: 12,
  paddingHorizontal: 20,
  paddingVertical: 20,
},

modernSectionTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#2C3E50",
  marginBottom: 16,
},

modernSectionHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
},

modernAddButton: {
  padding: 4,
},

// Image Picker
modernImagePicker: {
  width: "100%",
  borderRadius: 12,
  overflow: "hidden",
},

modernImagePreviewContainer: {
  position: "relative",
  width: "100%",
  height: 220,
},

modernCoverPreview: {
  width: "100%",
  height: "100%",
},

modernImageRemoveButton: {
  position: "absolute",
  top: 12,
  right: 12,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  borderRadius: 16,
},

modernImagePlaceholder: {
  width: "100%",
  height: 220,
  backgroundColor: "#F8F9FA",
  borderRadius: 12,
  borderWidth: 2,
  borderColor: "#E0E0E0",
  borderStyle: "dashed",
  justifyContent: "center",
  alignItems: "center",
},

modernImagePlaceholderText: {
  marginTop: 12,
  fontSize: 14,
  color: "#95A5A6",
  fontWeight: "600",
},

// Form Groups
modernFormGroup: {
  marginBottom: 10,
  flexDirection: "column",
},

modernRowGroup: {
  flexDirection: "column",
  gap: 12,
},

modernLabel: {
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
  textAlignVertical: "top",
},

// Category Picker
categoryScrollPicker: {
  flexDirection: "row",
},

modernCategoryChip: {
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 20,
  backgroundColor: "#F8F9FA",
  borderWidth: 1.5,
  borderColor: "#E0E0E0",
  marginRight: 8,
},

modernCategoryChipActive: {
  backgroundColor: "#FF6B6B",
  borderColor: "#FF6B6B",
},

modernCategoryChipText: {
  fontSize: 14,
  fontWeight: "600",
  color: "#7F8C8D",
},

modernCategoryChipTextActive: {
  color: "#FFFFFF",
},

// Difficulty Picker
modernDifficultyPicker: {
  flexDirection: "row",
  gap: 12,
},

modernDifficultyChip: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 12,
  borderRadius: 10,
  backgroundColor: "#F8F9FA",
  borderWidth: 1.5,
  borderColor: "#E0E0E0",
  gap: 6,
},

modernDifficultyChipActive: {
  borderColor: "transparent",
},

modernDifficultyChipText: {
  fontSize: 14,
  fontWeight: "600",
  color: "#7F8C8D",
},

modernDifficultyChipTextActive: {
  color: "#FFFFFF",
},

// Privacy Picker
modernPrivacyPicker: {
  flexDirection: "row",
  gap: 12,
},

modernPrivacyChip: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 12,
  borderRadius: 10,
  backgroundColor: "#F8F9FA",
  borderWidth: 1.5,
  borderColor: "#E0E0E0",
  gap: 6,
},

modernPrivacyChipActive: {
  backgroundColor: "#4A90E2",
  borderColor: "#4A90E2",
},

modernPrivacyChipText: {
  fontSize: 14,
  fontWeight: "600",
  color: "#7F8C8D",
},

modernPrivacyChipTextActive: {
  color: "#FFFFFF",
},

// Ingredients
modernIngredientItem: {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  marginBottom: 12,
},

modernIngredientNumber: {
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: "#FF6B6B",
  justifyContent: "center",
  alignItems: "center",
},

modernIngredientNumberText: {
  fontSize: 14,
  fontWeight: "bold",
  color: "#FFFFFF",
},

modernIngredientInputs: {
  flex: 1,
  flexDirection: "row",
  gap: 8,
},

modernRemoveButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "#FFEBEE",
  justifyContent: "center",
  alignItems: "center",
},

// Steps
modernStepCard: {
  backgroundColor: "#F8F9FA",
  borderRadius: 12,
  padding: 16,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: "#E0E0E0",
},

modernStepHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
},

modernStepBadge: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FF6B6B",
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
  gap: 6,
},

modernStepBadgeText: {
  fontSize: 14,
  fontWeight: "bold",
  color: "#FFFFFF",
},

modernStepRemoveButton: {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 8,
  backgroundColor: "#FFEBEE",
},

modernStepRemoveText: {
  fontSize: 13,
  fontWeight: "600",
  color: "#E74C3C",
},

// Step Images
modernImagePickerButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 12,
  borderRadius: 10,
  backgroundColor: "#FFFFFF",
  borderWidth: 1.5,
  borderColor: "#FF6B6B",
  borderStyle: "dashed",
  gap: 8,
},

modernImagePickerButtonText: {
  fontSize: 14,
  fontWeight: "600",
  color: "#FF6B6B",
},

modernStepImagesGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 10,
  marginTop: 12,
},

modernStepImageItem: {
  position: "relative",
  width: 100,
  height: 100,
  borderRadius: 8,
  overflow: "hidden",
},

modernStepImagePreview: {
  width: "100%",
  height: "100%",
},

modernStepImageRemove: {
  position: "absolute",
  top: 4,
  right: 4,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  borderRadius: 12,
},

modernStepImageBadge: {
  position: "absolute",
  bottom: 4,
  left: 4,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 12,
},

modernStepImageBadgeText: {
  fontSize: 12,
  fontWeight: "bold",
  color: "#FFFFFF",
},

// Footer
modernFormFooter: {
  padding: 20,
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#F0F0F0",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 8,
},

modernSubmitButton: {
  flexDirection: "row",
  backgroundColor: "#FF6B6B",
  paddingVertical: 16,
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  shadowColor: "#FF6B6B",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 4,
},

modernSubmitButtonText: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#FFFFFF",
},

modernNewImageBadge: {
  position: "absolute",
  top: 8,
  left: 8,
  backgroundColor: "#4CAF50",
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 12,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 4,
},

modernNewImageBadgeText: {
  fontSize: 10,
  fontWeight: "bold",
  color: "#FFFFFF",
},

// Add these user management styles

// Modern User Card
modernUserCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  marginHorizontal: 16,
  marginVertical: 8,
  padding: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
},

modernUserHeader: {
  flexDirection: "row",
  alignItems: "flex-start",
  marginBottom: 12,
},

modernUserAvatarWrapper: {
  position: "relative",
  marginRight: 12,
},

modernUserAvatar: {
  width: 60,
  height: 60,
  borderRadius: 30,
},

modernUserAvatarPlaceholder: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "#F8F9FA",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: "#E0E0E0",
},

modernUserDisabledBadge: {
  position: "absolute",
  bottom: 0,
  right: 0,
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: "#E74C3C",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: "#FFF",
},

modernUserInfo: {
  flex: 1,
  marginRight: 8,
},

modernUserNameRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  marginBottom: 4,
},

modernUserDisplayName: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#2C3E50",
  flex: 1,
},

modernUserUsername: {
  fontSize: 14,
  color: "#7F8C8D",
  marginBottom: 2,
},

modernUserEmail: {
  fontSize: 13,
  color: "#95A5A6",
},

modernRoleBadge: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 16,
  gap: 4,
},

modernRoleBadgeText: {
  fontSize: 11,
  fontWeight: "bold",
  color: "#FFFFFF",
},

modernUserStats: {
  flexDirection: "row",
  justifyContent: "space-around",
  paddingTop: 12,
  borderTopWidth: 1,
  borderTopColor: "#F0F0F0",
},

modernUserStat: {
  alignItems: "center",
  gap: 4,
},

modernUserStatValue: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#2C3E50",
},

modernUserStatLabel: {
  fontSize: 11,
  color: "#95A5A6",
},

// User Detail Modal
modernUserDetailInfo: {
  padding: 20,
  borderBottomWidth: 1,
  borderBottomColor: "#F0F0F0",
},

modernUserDetailAvatarWrapper: {
  alignItems: "center",
  marginBottom: 16,
},

modernUserDetailAvatar: {
  width: 100,
  height: 100,
  borderRadius: 50,
},

modernUserDetailAvatarPlaceholder: {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: "#F8F9FA",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 3,
  borderColor: "#E0E0E0",
},

modernUserDetailStats: {
  gap: 12,
},

modernUserDetailStatItem: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
},

modernUserDetailStatText: {
  fontSize: 14,
  color: "#2C3E50",
},

modernUserDetailActions: {
  padding: 16,
  borderBottomWidth: 1,
  borderBottomColor: "#F0F0F0",
},

modernToggleButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 14,
  borderRadius: 10,
  gap: 8,
},

modernToggleButtonEnable: {
  backgroundColor: "#4CAF50",
},

modernToggleButtonDisable: {
  backgroundColor: "#E74C3C",
},

modernToggleButtonText: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#FFFFFF",
},

// User Recipes Section
modernUserRecipesSection: {
  flex: 1,
  padding: 16,
},

modernUserRecipesList: {
  flex: 1,
},

modernUserRecipesLoading: {
  paddingVertical: 40,
  alignItems: "center",
  justifyContent: "center",
},

modernUserRecipesEmpty: {
  paddingVertical: 40,
  alignItems: "center",
  justifyContent: "center",
},

modernUserRecipesEmptyText: {
  marginTop: 12,
  fontSize: 14,
  color: "#95A5A6",
},

modernUserRecipeCard: {
  flexDirection: "row",
  backgroundColor: "#F8F9FA",
  borderRadius: 12,
  marginBottom: 12,
  overflow: "hidden",
  borderWidth: 1,
  borderColor: "#E0E0E0",
},

modernUserRecipeImage: {
  width: 120,
  height: 90,
},


modernUserRecipeTitle: {
  fontSize: 15,
  fontWeight: "600",
  color: "#2C3E50",
  marginBottom: 8,
},

modernUserRecipeMeta: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
},

modernUserRecipeDifficulty: {
  paddingHorizontal: 8,
  paddingVertical: 3,
  borderRadius: 10,
},

modernUserRecipeDifficultyText: {
  fontSize: 11,
  fontWeight: "bold",
  color: "#FFFFFF",
},

modernUserRecipeMetaItem: {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
},

modernUserRecipeMetaText: {
  fontSize: 12,
  color: "#7F8C8D",
},

modernUserRecipeDate: {
  fontSize: 11,
  color: "#95A5A6",
},

// Add these modern dashboard styles

// Modern Dashboard Header
modernDashboardHeader: {
  backgroundColor: "#FFFFFF",
  paddingHorizontal: 20,
  paddingTop: 20,
  paddingBottom: 20,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottomWidth: 1,
  borderBottomColor: "#F0F0F0",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 2,
},

modernDashboardHeaderContent: {
  flexDirection: "row",
  alignItems: "center",
  gap: 16,
},

modernDashboardHeaderIcon: {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: "#FFE5E5",
  justifyContent: "center",
  alignItems: "center",
},

modernDashboardHeaderText: {
  gap: 4,
},

modernDashboardTitle: {
  fontSize: 24,
  fontWeight: "bold",
  color: "#2C3E50",
},

modernDashboardSubtitle: {
  fontSize: 14,
  color: "#7F8C8D",
},

modernDashboardLogoutButton: {
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: "#FFEBEE",
  justifyContent: "center",
  alignItems: "center",
},

// Modern Stats Grid
modernStatsGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  padding: 16,
  gap: 12,
},

modernStatCard: {
  width: 80,
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  padding: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
},

modernStatCardHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
},

modernStatCardIcon: {
  width: 48,
  height: 48,
  borderRadius: 24,
  justifyContent: "center",
  alignItems: "center",
},

modernStatCardTrend: {
  width: 28,
  height: 28,
  borderRadius: 14,
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
},

modernStatCardNumber: {
  fontSize: 24,
  fontWeight: "bold",
  color: "#2C3E50",
  marginBottom: 4,
},

modernStatCardLabel: {
  fontSize: 13,
  fontWeight: "600",
},

// Modern Dashboard Section
modernDashboardSection: {
  marginTop: 12,
  backgroundColor: "#FFFFFF",
  paddingVertical: 20,
  paddingHorizontal: 6,
},

// Modern Actions Grid
modernActionsGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",

  paddingHorizontal: 16,
  gap: 12,
},

modernActionCard: {
  width: 80,
  backgroundColor: "#F8F9FA",
  borderRadius: 16,
  padding: 20,
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#E0E0E0",
},

modernActionCardIcon: {
  width: 64,
  height: 64,
  borderRadius: 32,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 12,
},

modernActionCardTitle: {
  fontSize: 14,
  fontWeight: "bold",
  color: "#2C3E50",
  marginBottom: 4,
  textAlign: "center",
},

modernActionCardSubtitle: {
  fontSize: 11,
  color: "#7F8C8D",
  textAlign: "center",
},

// System Info
modernSystemInfoCard: {
  marginHorizontal: 16,
  backgroundColor: "#F8F9FA",
  borderRadius: 16,
  padding: 20,
  borderWidth: 1,
  borderColor: "#E0E0E0",
},

modernSystemInfoRow: {
  flexDirection: "row",
  alignItems: "center",
},

modernSystemInfoItem: {
  flex: 1,
  alignItems: "center",
  gap: 8,
},

modernSystemInfoDivider: {
  width: 1,
  height: 60,
  backgroundColor: "#E0E0E0",
},

modernSystemInfoLabel: {
  fontSize: 12,
  color: "#7F8C8D",
  marginTop: 4,
},

modernSystemInfoValue: {
  fontSize: 14,
  fontWeight: "bold",
},

// Activity Preview
modernActivityPreview: {
  marginHorizontal: 16,
  backgroundColor: "#F8F9FA",
  borderRadius: 16,
  padding: 16,
  borderWidth: 1,
  borderColor: "#E0E0E0",
},

modernActivityItem: {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
},

modernActivityIcon: {
  width: 44,
  height: 44,
  borderRadius: 22,
  justifyContent: "center",
  alignItems: "center",
},

modernActivityContent: {
  flex: 1,
  gap: 4,
},

modernActivityTitle: {
  fontSize: 15,
  fontWeight: "600",
  color: "#2C3E50",
},

modernActivityTime: {
  fontSize: 12,
  color: "#95A5A6",
},

modernActivityDivider: {
  height: 1,
  backgroundColor: "#E0E0E0",
  marginVertical: 12,
},

modernSaveButton: {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: "#E8F5E9",
  justifyContent: "center",
  alignItems: "center",
},

modernReorderButton: {
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: "#E3F2FD",
  justifyContent: "center",
  alignItems: "center",
},

modernStepSaveButton: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 16,
  backgroundColor: "#E8F5E9",
  gap: 4,
},

modernStepSaveText: {
  fontSize: 13,
  fontWeight: "600",
  color: "#4CAF50",
},

modernStepUpdateButton: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 16,
  backgroundColor: "#E3F2FD",
  gap: 4,
},

modernStepUpdateText: {
  fontSize: 13,
  fontWeight: "600",
  color: "#4A90E2",
},

// Full screen log styles
logStreamFullScreen: {
  flex: 1,
  backgroundColor: "#1E1E1E",
  paddingTop: 40,
},

logStreamFullHeader: {
  flexDirection: "row",
  alignItems: "center",
  padding: 16,
  backgroundColor: "#FFFFFF",
  borderBottomWidth: 1,
  borderBottomColor: "#E0E0E0",
  gap: 12,
},

logStreamBackButton: {
  padding: 4,
},

logStreamFullHeaderContent: {
  flex: 1,
},

logStreamFullTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#2C3E50",
  marginBottom: 4,
},

logStreamFullStatus: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
},

logStreamFullStatusText: {
  fontSize: 13,
  color: "#7F8C8D",
},

logStreamFullActions: {
  flexDirection: "row",
  gap: 8,
},

clearLogsButtonFull: {
  padding: 10,
  borderRadius: 8,
  backgroundColor: "#FFEBEE",
},

toggleLogButtonFull: {
  padding: 10,
  borderRadius: 8,
  backgroundColor: "#4A90E2",
},

toggleLogButtonActiveFull: {
  backgroundColor: "#E74C3C",
},

logStreamPlaceholderFull: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 40,
},

logStreamPlaceholderTextFull: {
  fontSize: 16,
  color: "#95A5A6",
  marginTop: 16,
  textAlign: "center",
},

logStreamEmptyFull: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  gap: 16,
},

logStreamEmptyTextFull: {
  fontSize: 15,
  color: "#95A5A6",
},

logListFull: {
  flex: 1,
  backgroundColor: "#1E1E1E",
},

logListContentFull: {
  padding: 16,
  gap: 12,
},

logStreamFooter: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 12,
  backgroundColor: "#2C2C2C",
  borderTopWidth: 1,
  borderTopColor: "#3C3C3C",
},

logStreamFooterText: {
  fontSize: 12,
  color: "#95A5A6",
},

logStreamFooterTextGreen: {
  fontSize: 12,
  color: "#4CAF50",
  fontWeight: "bold",
},

// Navigate card for dashboard
logStreamNavigateCard: {
  backgroundColor: "#F8F9FA",
  borderRadius: 12,
  padding: 32,
  alignItems: "center",
  borderWidth: 2,
  borderColor: "#E3F2FD",
  borderStyle: "dashed",
},

logStreamNavigateIcon: {
  marginBottom: 16,
},

logStreamNavigateTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#2C3E50",
  marginBottom: 8,
},

logStreamNavigateSubtitle: {
  fontSize: 14,
  color: "#7F8C8D",
  marginBottom: 16,
  textAlign: "center",
},

logStreamNavigateArrow: {
  marginTop: 8,
},

// Log Stream Styles
logStreamContainer: {
  backgroundColor: "#1E1E1E",
  borderRadius: 12,
  overflow: "hidden",
  minHeight: 300,
  maxHeight: 500,
},

logStreamPlaceholder: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 80,
},

logStreamPlaceholderText: {
  fontSize: 14,
  color: "#95A5A6",
  marginTop: 12,
  textAlign: "center",
},

logStreamError: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  backgroundColor: "#FFEBEE",
  padding: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#FFCDD2",
},

logStreamErrorText: {
  fontSize: 13,
  color: "#E74C3C",
  flex: 1,
},

logStreamHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 12,
  backgroundColor: "#2C2C2C",
  borderBottomWidth: 1,
  borderBottomColor: "#3C3C3C",
},

logStreamStatus: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
},

logStreamIndicator: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: "#4CAF50",
},

logStreamIndicatorError: {
  backgroundColor: "#E74C3C",
},

logStreamStatusText: {
  fontSize: 13,
  color: "#FFFFFF",
  fontWeight: "600",
},

logCount: {
  fontSize: 12,
  color: "#95A5A6",
},

logStreamEmpty: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 60,
  gap: 12,
},

logStreamEmptyText: {
  fontSize: 13,
  color: "#95A5A6",
},

logList: {
  flex: 1,
  backgroundColor: "#1E1E1E",
},

logListContent: {
  padding: 12,
  gap: 8,
},

logItem: {
  backgroundColor: "#2C2C2C",
  borderRadius: 8,
  padding: 12,
  borderLeftWidth: 3,
  borderLeftColor: "#4A90E2",
},

logHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 6,
},

logLevelContainer: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
},

logLevel: {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 0.5,
},

logTimestamp: {
  fontSize: 11,
  color: "#95A5A6",
  fontFamily: "monospace",
},

logMessage: {
  fontSize: 12,
  color: "#ECEFF1",
  lineHeight: 18,
  fontFamily: "monospace",
},

toggleLogButton: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 6,
  backgroundColor: "#4A90E2",
},

toggleLogButtonActive: {
  backgroundColor: "#E74C3C",
},

toggleLogButtonText: {
  fontSize: 13,
  color: "#FFFFFF",
  fontWeight: "600",
},

clearLogsButton: {
  paddingHorizontal: 8,
  paddingVertical: 6,
  borderRadius: 6,
  backgroundColor: "#FFEBEE",
},
logStreamIndicatorInactive: {
  backgroundColor: "#95A5A6",
},

logStreamFooterTextOrange: {
  fontSize: 12,
  color: "#FF9800",
  fontWeight: "bold",
},
logExpandButton: {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "flex-start",
  gap: 4,
  marginTop: 8,
  paddingVertical: 4,
  paddingHorizontal: 8,
  borderRadius: 4,
  backgroundColor: "rgba(74, 144, 226, 0.1)",
},

logExpandButtonText: {
  fontSize: 12,
  color: "#4A90E2",
  fontWeight: "600",
},

logMetadata: {
  marginTop: 8,
  paddingTop: 8,
  borderTopWidth: 1,
  borderTopColor: "#3C3C3C",
},

logMetadataText: {
  fontSize: 11,
  color: "#95A5A6",
  fontStyle: "italic",
},

modernRecipeActionsUser: {
  position: 'absolute',
  right: 8,
  top: 24,
  flexDirection: 'row',
  gap: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: 20,
  padding: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},


// Update existing styles
modernUserRecipeCardUser: {
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  marginBottom: 12,
  padding: 12,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
  borderWidth: 1,
  borderColor: '#E0E0E0',
},

modernUserRecipeContentWrapper: {
  flex: 1,
  justifyContent: 'space-between',
},

modernUserRecipeInfo: {
  flex: 1,
  marginBottom: 8,
},

modernRecipeActionsRow: {
  flexDirection: 'row',
  gap: 8,
  paddingTop: 8,
  borderTopWidth: 1,
  borderTopColor: '#F0F0F0',
  alignItems: 'center',
  justifyContent: 'flex-end',
},

modernActionButtonUser: {
  width: 36,
  height: 36,
  borderRadius: 18,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#E0E0E0',
  marginLeft: 10,
},

// Add these styles to the adminStyles object

  // AI Buttons
  modernAIButtonsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  modernAIButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498DB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modernAIButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },

  // Modal Styles
  modernModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modernModalContent: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    width: "100%",
    maxWidth: 500,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modernModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ECF0F1",
    gap: 12,
  },
  modernModalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#2C3E50",
  },
  modernModalCloseButton: {
    padding: 4,
  },
  modernModalBody: {
    padding: 20,
  },
  modernModalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 8,
  },
  modernModalInput: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: "#2C3E50",
  },
  modernModalHint: {
    fontSize: 12,
    color: "#7F8C8D",
    marginTop: 8,
    fontStyle: "italic",
  },
  modernModalFooter2: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#ECF0F1",
  },
  modernModalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ECF0F1",
    borderRadius: 12,
  },
  modernModalCancelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7F8C8D",
  },
  modernModalConfirmButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498DB",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  modernModalConfirmText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFF",
  },

    // AI Input Container Styles
  modernAIInputContainer: {
    marginTop: 12,
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  modernAIInputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 8,
  },
  modernAITextArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  modernAIButtonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  modernAICancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ECF0F1",
    borderRadius: 12,
  },
  modernAICancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7F8C8D",
  },
  modernAIApplyButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9B59B6",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  modernAIApplyButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFF",
  },


  // Recent Activities Card
    viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewAllButtonText: {
    fontSize: 14,
    color: "#FF6B35",
    fontWeight: "600",
  },

  loginHistoryPreviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#E8F4F8",
  },
  loginHistoryPreviewIcon: {
    marginBottom: 16,
  },
  loginHistoryPreviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 8,
  },
  loginHistoryPreviewSubtitle: {
    fontSize: 14,
    color: "#7F8C8D",
    textAlign: "center",
    marginBottom: 20,
  },
  loginHistoryPreviewStats: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
  },
  loginHistoryPreviewStatItem: {
    alignItems: "center",
  },
  loginHistoryPreviewStatNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 4,
  },
  loginHistoryPreviewStatLabel: {
    fontSize: 12,
    color: "#7F8C8D",
  },
  loginHistoryPreviewStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E0E0E0",},

    loginHistoryItem: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B35",
  },
  loginHistoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  loginHistoryUser: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loginHistoryUsername: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  loginHistoryTime: {
    fontSize: 12,
    color: "#7F8C8D",
  },
  loginHistoryDetails: {
    gap: 6,
  },
  loginHistoryDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loginHistoryDetailText: {
    fontSize: 13,
    color: "#666",
  },

  modalCloseButton: {
    padding: 4,
  },
  datePickerContainer: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  datePickerLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: "#FF6B35",
  },
  datePickerText: {
    fontSize: 15,
    color: "#FF6B35",
    fontWeight: "600",
  },

    modalLoadingContainer: {
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  modalLoadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#7F8C8D",
  },
  emptyStateContainer: {
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 15,
    color: "#95A5A6",
    textAlign: "center",
  },

  loginHistoryList: {
    maxHeight: 400,
  },

  // Add these to adminStyles:

  loadMoreContainer: {
    paddingVertical: 16,
    alignItems: "center",
  },
  loadMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#FFF3E0",
    borderRadius: 8,
    gap: 8,
  },
  loadMoreButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6B6B",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#7F8C8D",
  },
  clearSearchButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FF6B35",
    borderRadius: 8,
  },
  clearSearchButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
