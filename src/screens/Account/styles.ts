import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZES, FONT_WEIGHTS } from "../../constants";

export const accountStyles = StyleSheet.create({
  // Common container and layout styles
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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

  // Header styles
  header: {
    backgroundColor: "#FF6B35",
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 50,
    zIndex: 1,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: "#ffffff",
  },
  headerTitle: {
    position: "absolute",
    left: 60,
    top: 46,
    zIndex: 1,
    fontSize: 26,
    color: "#FFFFFF",
    fontWeight: "medium",
    fontFamily: "Roboto",
  },

  // Logo section
  logoSection: {
    backgroundColor: "#FF6B35",
    paddingTop: 40,
    marginBottom: 100,
    alignItems: "center",
  },
  logoContainer: {
    width: 160,
    height: 160,
    paddingTop: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 160,
    height: 160,
  },
  appName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B35",
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
    fontFamily: "Roboto",
    textAlign: "center",
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

  // Menu container
  menuContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  menuArrow: {
    fontSize: 20,
    color: "#999999",
    fontWeight: "bold",
  },

  // Form styles
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Roboto",
  },

  // Read-only field
  readOnlyField: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  readOnlyText: {
    fontSize: 16,
    color: "#666666",
    fontFamily: "Roboto",
  },

  // Editable field
  editableField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingRight: 12,
  },
  fieldText: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontFamily: "Roboto",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontFamily: "Roboto",
  },
  editIcon: {
    padding: 8,
  },
  editIconText: {
    fontSize: 18,
    color: "#FF6B35",
  },

  // Save button
  saveButton: {
    backgroundColor: "#FF6B35",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Roboto",
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
  logoutContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  logoutButton: {
    backgroundColor: "#FF6B35",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  logoutButtonDisabled: {
    backgroundColor: "#CCCCCC",
    opacity: 0.7,
  },
  logoutButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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

  // User info section styles
  userInfoSection: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
  },
  userInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  userInfoLabel: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  userInfoValue: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
});
