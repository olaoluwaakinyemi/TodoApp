import React, { useState, useEffect } from "react";
import { View, StatusBar, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Header from "./src/components/Header/Header";
import Tasks from "./src/components/Tasks/Tasks";
import Form from "./src/components/Form/Form";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import "firebase/firestore"; // Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnjsQwB0uSsInXJI8oJ5n2CzaVt2jBA9A",
  authDomain: "info-6132-lab.firebaseapp.com",
  projectId: "info-6132-lab",
  storageBucket: "info-6132-lab.appspot.com",
  messagingSenderId: "117903988742",
  appId: "1:117903988742:web:cc343247cf014c75d9cb87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore instance

const Tab = createBottomTabNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Set up Firestore listener to fetch tasks
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  const handleAddTask = async (newTask) => {
    if (newTask.description.trim()) {
      try {
        const task = { description: newTask.description, done: false };
        await addDoc(collection(db, "tasks"), task);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      Alert.alert("Warning", "Task description cannot be empty!");
    }
  };

  const handleStatusChange = async (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      try {
        const docRef = doc(db, "tasks", id); // Reference to a specific document
        await updateDoc(docRef, { done: !task.done });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  const handleTaskRemoval = async (id) => {
    Alert.alert(
      "Remove Task",
      "This action will permanently delete this task. This action cannot be undone!",
      [
        {
          text: "Confirm",
          onPress: async () => {
            try {
              const docRef = doc(db, "tasks", id); // Reference to a specific document
              await deleteDoc(docRef);
            } catch (error) {
              console.error("Error removing document: ", error);
            }
          },
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Header />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "List") {
                iconName = focused ? "ios-list" : "ios-list-outline";
              } else if (route.name === "Add") {
                iconName = focused
                  ? "ios-add-circle"
                  : "ios-add-circle-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="List">
            {(props) => (
              <Tasks
                {...props}
                tasks={tasks}
                onStatusChange={handleStatusChange}
                onTaskRemoval={handleTaskRemoval}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Add">
            {(props) => <Form {...props} onAddTask={handleAddTask} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}
