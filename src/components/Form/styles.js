import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    fontFamily: "Arial",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 18,
    marginRight: 10,
    fontFamily: "Arial",
  },
  button: {
    backgroundColor: "#0055ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#aaaaaa", // Changed background color
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Arial",
  },
});

export default styles;
