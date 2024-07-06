import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
        <FontAwesome5 name="tasks" size={24} color="#4B0082" />
        <Text style={styles.title}>Todo App</Text>
      </View>
      <Text style={styles.author}>By Olaoluwa</Text>
    </View>
  );
}
