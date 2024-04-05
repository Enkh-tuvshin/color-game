import { Container } from "./container";
import { Button, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Text, StatusBar } from "react-native";

export const Home = ({navigation}: any) => (
  <Container>
    <View style={styles.container}>
      <Text style={styles.title}>Color Generator Game</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("color-generator")}
        style={{ borderWidth: 1, padding: 20, borderRadius: 10, borderColor: 'blue' }}
      >
        <Text style={{ fontSize: 16, color: "blue" }}>Start game</Text>
      </TouchableOpacity>
      <StatusBar />
    </View>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "500",
    fontSize: 40,
    color: "blue",
    margin: 20,
    textAlign: "center",
  },
});
