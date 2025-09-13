import { StyleSheet } from "react-native";

export const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  appName: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FF7043",
    fontFamily: "Quicksand",
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
