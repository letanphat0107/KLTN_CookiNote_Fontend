import { StyleSheet } from "react-native";

export const accountStyles = StyleSheet.create({
  // Common container and layout styles
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Title styles
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333333",
    fontFamily: "Roboto",
  },

  // User info styles
  userInfo: {
    alignItems: "center",
    marginBottom: 40,
    padding: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
    fontFamily: "Roboto",
  },
  userEmail: {
    fontSize: 16,
    color: "#666666",
    fontFamily: "Roboto",
  },
  userDescription: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "Roboto",
  },

  // Menu styles
  menuContainer: {
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  menuText: {
    fontSize: 16,
    color: "#333333",
    fontFamily: "Roboto",
  },
  menuArrow: {
    fontSize: 16,
    color: "#999999",
    fontFamily: "Roboto",
  },

  // Form styles
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

  // Password requirements
  passwordRequirements: {
    backgroundColor: "#F0F8FF",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  requirementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  requirement: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
    fontFamily: "Roboto",
  },

  // Button styles
  buttonContainer: {
    gap: 12,
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
  logoutButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },

  // Profile header styles (for SharedAccountScreen)
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "Roboto",
  },

  // Stats styles
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F8F8F8",
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
  },
  statItem: {
    alignItems: "center",
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

  // Section styles
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
    fontFamily: "Roboto",
  },

  // Recipe card styles
  recipeCard: {
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
    fontFamily: "Roboto",
  },
  recipeStats: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Roboto",
  },

  // Action buttons
  actionButtons: {
    gap: 12,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  shareButton: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF6B6B",
  },
  shareButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  cancelButton: {
    backgroundColor: "transparent",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  cancelButtonText: {
    color: "#666666",
    fontSize: 16,
    fontFamily: "Roboto",
  },
});
