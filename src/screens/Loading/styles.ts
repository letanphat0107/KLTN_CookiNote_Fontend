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
    marginBottom: 40,
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
  loadingContainer: {
    alignItems: "center",
  },
  loadingIndicator: {
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: "#333333",
    fontFamily: "Quicksand-Regular",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B6B",
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: "#FF8E8E",
    transform: [{ scale: 1.2 }],
  },
});
