import { Container } from "./container";
import { Button, StyleSheet, View } from "react-native";
import { Text, StatusBar } from "react-native";

export const Home = ({navigation}: any) => {
  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>Color Generator</Text>
        <Button title="Тоглоомыг эхлүүлэх" onPress={() => navigation.navigate("color-generator")} />
        <StatusBar />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "blue",
    margin: 20,
  },
});
