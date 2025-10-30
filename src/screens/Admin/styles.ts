import { StyleSheet } from "react-native";

export const adminStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
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

  modalInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Đảm bảo Label và Value cách xa nhau
    alignItems: "center",
    paddingVertical: 8, // Thêm khoảng cách dọc giữa các dòng
    borderBottomWidth: 1, // Đường kẻ mỏng phân tách các dòng
    borderBottomColor: "#eee", // Màu xám nhạt
  },

  /** * Style cho phần "Tác giả:", "Độ khó:", v.v. (Label)
   */
  modalLabel: {
    fontSize: 16,
    fontWeight: "600", // Đậm vừa phải để nổi bật
    color: "#555", // Màu xám đậm hơn
    flex: 1, // Chiếm một phần không gian
    marginRight: 10, // Khoảng cách nhỏ với Value
  },

  /** * Style cho giá trị thực tế, ví dụ: "Nguyễn Văn A" (Value)
   */
  modalValue: {
    fontSize: 16,
    fontWeight: "400", // Không quá đậm
    color: "#333", // Màu đen để đọc rõ
    flex: 2, // Chiếm nhiều không gian hơn Label (tùy chọn)
    textAlign: "right", // Căn phải để giữ Label và Value tách biệt
  },

  // Style bổ sung cho container tổng thể của modal (nếu cần)
  modalContentContainer: {
    padding: 20,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between", // Phân bố đều nút Đóng và Xóa
    marginTop: 20, // Thêm khoảng cách với nội dung phía trên
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  /** * Style cơ bản áp dụng cho cả hai nút (Delete và Cancel/Close). */
  modalButton: {
    flex: 1, // Để hai nút chiếm không gian bằng nhau
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5, // Khoảng cách giữa hai nút
  },

  /** * Style dành riêng cho nút Xóa/Hủy (màu đỏ). */
  deleteButton: {
    backgroundColor: "#D9534F", // Màu đỏ nổi bật cho hành động nguy hiểm
    marginRight: 10, // Ưu tiên khoảng cách với nút Đóng
  },

  /** * Style dành riêng cho nút Đóng/Hủy (màu xám hoặc xanh nhẹ). */
  cancelButton: {
    backgroundColor: "#F5F5F5", // Màu nền nhẹ nhàng
    borderWidth: 1,
    borderColor: "#ccc",
  },

  /** * Ghi đè màu chữ cho nút Đóng (Cancel) để phù hợp với nền sáng. */
  cancelButtonText: {
    color: "#333", // Màu chữ đen/xám cho nền sáng
  },

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

  modalRecipeImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#f0f0f0",
  },
  modalRecipeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
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


  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // Màu chữ mặc định (dùng cho nút Delete)
  },
});
