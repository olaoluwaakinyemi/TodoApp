import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomColor: "#4B0082",
    borderBottomWidth: 3,
    paddingBottom: 5,
    paddingTop: 30,
    marginTop: 30,
    paddingHorizontal: 10,
    backgroundColor: "#f8f8f8",
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#4B0082",
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginLeft: 10,
    fontFamily: "Arial",
  },
  author: {
    fontSize: 16,
    color: "#555",
    fontFamily: "Arial",
  },
});

export default styles;
