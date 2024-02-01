import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./components/Home";
import { NavigationContainer } from "@react-navigation/native";
import ColorGenerator from "./components/color-generator";

const HomeStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="color-generator" component={ColorGenerator} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}
