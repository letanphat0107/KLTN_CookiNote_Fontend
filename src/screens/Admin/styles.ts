import { StyleSheet } from "react-native";

export const adminStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    color: "#333333",
    fontFamily: "Roboto",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    fontFamily: "Roboto",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  activeFilter: {
    backgroundColor: "#FF6B6B",
    borderColor: "#FF6B6B",
  },
  filterText: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Roboto",
  },
  activeFilterText: {
    color: "#FFFFFF",
    fontFamily: "Roboto",
  },
  // Status badges
  approvedStatus: {
    backgroundColor: "#4CAF50",
  },
  pendingStatus: {
    backgroundColor: "#FF9800",
  },
  rejectedStatus: {
    backgroundColor: "#F44336",
  },
  blockedStatus: {
    backgroundColor: "#F44336",
  },
  activeStatus: {
    backgroundColor: "#4CAF50",
  },
  adminStatus: {
    backgroundColor: "#9C27B0",
  },
  // Text styles
  author: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  description: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: "Roboto",
  },
  // Action buttons
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  viewButton: {
    flex: 1,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  viewButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  editButton: {
    flex: 1,
    backgroundColor: "#FF9800",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  approveButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  approveButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  rejectButton: {
    flex: 1,
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  rejectButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  blockButton: {
    flex: 1,
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  blockButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  unblockButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  unblockButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  disabledButton: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  disabledButtonText: {
    color: "#999999",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  primaryButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
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
    borderColor: "#E0E0E0",
  },
  secondaryButtonText: {
    color: "#666666",
    fontSize: 16,
    fontFamily: "Roboto",
  },

  // Dashboard specific styles
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B6B",
    fontFamily: "Roboto",
  },
  statLabel: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
    fontFamily: "Roboto",
  },
  menuContainer: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
    fontFamily: "Roboto",
  },
  menuDescription: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Roboto",
  },
  menuArrow: {
    fontSize: 16,
    color: "#999999",
    fontFamily: "Roboto",
  },
  recentActivity: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
    fontFamily: "Roboto",
  },
  activityItem: {
    padding: 12,
    backgroundColor: "#F0F8FF",
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  activityText: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 4,
    fontFamily: "Roboto",
  },
  activityTime: {
    fontSize: 12,
    color: "#666666",
    fontFamily: "Roboto",
  },

  // Form styles for AddRecipeScreen
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#F8F8F8",
    fontFamily: "Roboto",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#F8F8F8",
  },
  imageButton: {
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  imageButtonText: {
    fontSize: 16,
    color: "#666666",
    fontFamily: "Roboto",
  },
  buttonContainer: {
    gap: 12,
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },

  // User management specific styles
  userCard: {
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "Roboto",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
    fontFamily: "Roboto",
  },
  userEmail: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
    fontFamily: "Roboto",
  },
  userJoinDate: {
    fontSize: 12,
    color: "#999999",
    fontFamily: "Roboto",
  },
  userStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  statItem: {
    alignItems: "center",
  },
  userActions: {
    flexDirection: "row",
    gap: 8,
  },
});
