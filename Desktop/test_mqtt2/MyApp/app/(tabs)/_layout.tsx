// import { Tabs } from 'expo-router';
// import React from 'react';

// import { HapticTab } from '@/components/haptic-tab';
// import { IconSymbol } from '@/components/ui/icon-symbol';
// import { Colors } from '@/constants/theme';
// import { useColorScheme } from '@/hooks/use-color-scheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }


// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const MyComponent: React.FC = () => {
//   return (
//     <View style={styles.container}>

//       <Text style={styles.text}>Hello, this is a simple component!</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//   },
//   text: {
//     fontSize: 18,
//     color: '#333',
//   },
// });

// export default MyComponent;


import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from "react-native";
import init from "react_native_mqtt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Client, Message } from "paho-mqtt";

global.AsyncStorage = AsyncStorage;

// Initialize MQTT
init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {},
});

const MyComponent: React.FC = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const mqttClient = new Client(
      "broker.hivemq.com",
      8000,
      "expo-client-" + Date.now()
    );

    mqttClient.onConnectionLost = (responseObject) => {
      console.log("Connection lost:", responseObject?.errorMessage);
      setConnected(false);
    };

    mqttClient.onMessageArrived = (msg: Message) => {
      console.log("Received:", msg.payloadString);
      setMessages((prev) => [...prev, msg.payloadString]);
    };

    mqttClient.connect({
      onSuccess: () => {
        console.log("Connected ✅");
        setConnected(true);
        mqttClient.subscribe("busmate/test");
      },
      onFailure: (err) => {
        console.log("Connect failed ❌", err);
      },
      useSSL: false,
    });

    setClient(mqttClient);

    return () => {
      if (mqttClient && mqttClient.isConnected()) {
        mqttClient.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (!connected) return alert("Not connected yet");
    if (!client) return;

    const msg = new Message(message);
    msg.destinationName = "busmate/test";
    client.send(msg);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
      />
      <Button title="Send" onPress={sendMessage} />
      <Text style={styles.title}>Received Messages:</Text>
      <ScrollView style={styles.scroll}>
        {messages.map((msg, i) => (
          <Text key={i} style={styles.message}>{msg}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: "#f0f0f0",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
  },
  scroll: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default MyComponent;
