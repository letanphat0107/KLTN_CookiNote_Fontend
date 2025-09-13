import { StyleSheet } from "react-native";

export const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF6B6B",
    fontFamily: "Quicksand-Bold",
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    color: "#666666",
    fontFamily: "Quicksand-Regular",
    marginTop: 8,
    textAlign: "center",
  },
});
