import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "flex-start",
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
    color: "#FF7043",
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
    marginTop: 15,
    padding: 15,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#FF6B35",
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  requirementItem: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
    lineHeight: 16,
  },
  passwordStrength: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "500",
  },
  passwordMatch: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "500",
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

  // Demo credentials
  demoContainer: {
    backgroundColor: "#FFF3CD",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FFEAA7",
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#856404",
    marginBottom: 4,
    fontFamily: "Quicksand",
  },
  demoText: {
    fontSize: 12,
    color: "#856404",
    fontFamily: "Quicksand",
  },

  // Loading and error states
  disabledButton: {
    opacity: 0.6,
  },
  errorText: {
    color: "#DC3545",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Quicksand",
  },

  // New rounded GUI styles
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
    fontFamily: "Quicksand",
  },
  roundedInput: {
    height: 48,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 24,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    fontFamily: "Quicksand",
  },
  roundedButton: {
    backgroundColor: "#FF7043",
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  roundedButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Quicksand",
  },

  // OTP styles
  otpEmailContainer: {
    backgroundColor: "#F8F9FA",
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
    alignItems: "center",
  },
  otpDescription: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 20,
  },
  otpEmailText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B35",
  },
  otpInput: {
    textAlign: "center",
    fontSize: 18,
    letterSpacing: 4,
    fontWeight: "bold",
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
    color: "#666666",
  },
  resendButton: {
    fontSize: 14,
    color: "#FF6B35",
    fontWeight: "bold",
  },
  resendButtonDisabled: {
    color: "#CCCCCC",
  },
  helpContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#F0F8FF",
    borderRadius: 8,
  },
  helpText: {
    fontSize: 12,
    color: "#666666",
    lineHeight: 18,
  },
  infoContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 12,
    color: "#999999",
    textAlign: "center",
    lineHeight: 16,
  },
});
