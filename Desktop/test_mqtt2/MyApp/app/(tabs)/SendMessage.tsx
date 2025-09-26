import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from "react-native";
import init from "react_native_mqtt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Client, Message } from "paho-mqtt"; // Paho types

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

export default function MQTTExample(): JSX.Element {
  const [client, setClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const mqttClient = new Client(
      "broker.hivemq.com", // broker
      8000,                // WS port
      "expo-client-" + Date.now() // unique client ID
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
      <ScrollView>
        {messages.map((msg, i) => (
          <Text key={i} style={styles.message}>{msg}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10 },
  title: { fontSize: 18, marginVertical: 10 },
  message: { fontSize: 16, paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: "#ccc" },
});
