import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#333333",
    fontFamily: "Quicksand",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: "#666666",
    lineHeight: 24,
    fontFamily: "Quicksand",
  },
  form: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#F8F8F8",
    fontFamily: "Quicksand",
  },
  primaryButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Quicksand",
  },
  linkText: {
    color: "#FF6B6B",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Quicksand",
  },
  secondaryText: {
    color: "#666666",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Quicksand",
  },

  // Additional styles for different screens
  forgotPassword: {
    alignItems: "center",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#FF6B6B",
    fontSize: 14,
    fontFamily: "Quicksand",
  },
  registerLink: {
    alignItems: "center",
  },
  registerLinkText: {
    color: "#666666",
    fontSize: 14,
    fontFamily: "Quicksand",
  },
  registerLinkTextBold: {
    color: "#FF6B6B",
    fontWeight: "bold",
    fontFamily: "Quicksand",
  },
  loginButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Quicksand",
  },

  // Register screen specific styles
  registerButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Quicksand",
  },
  loginLink: {
    alignItems: "center",
  },
  loginLinkText: {
    color: "#666666",
    fontSize: 14,
    fontFamily: "Quicksand",
  },
  loginLinkTextBold: {
    color: "#FF6B6B",
    fontWeight: "bold",
    fontFamily: "Quicksand",
  },

  // Terms and conditions
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 10,
    borderRadius: 4,
    backgroundColor: "#F8F8F8",
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: "#666666",
    fontFamily: "Quicksand",
  },
  termsLink: {
    color: "#FF6B6B",
    fontFamily: "Quicksand",
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
    fontFamily: "Quicksand",
  },
  requirement: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
    fontFamily: "Quicksand",
  },

  // Button containers
  buttonContainer: {
    gap: 12,
  },

  // Success message
  successMessage: {
    backgroundColor: "#E8F5E8",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  successText: {
    color: "#2E7D32",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Quicksand",
  },
});
