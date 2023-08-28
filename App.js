import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login';
import AppDrawer from './AppDrawer'; // Seu DrawerNavigator atual
import OrderDetails from "./screens/OrderDetails"
import { UserProvider } from './UserContext';
import TratarChamado from "./screens/TratarChamado";
import orcamento from "./screens/orcamento";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AppDrawers" component={AppDrawer} options={{ headerShown: false }} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: true, title: 'Detalhamento', headerTitleStyle: {color: "#4E54C8"}, }} />
          <Stack.Screen name="TratarChamado" component={TratarChamado} options={{ headerShown: true, title: 'Detalhamento', headerTitleStyle: {color: "#4E54C8"} }} />
          <Stack.Screen name="orcamento" component={orcamento} options={{ headerShown: true, title: 'Orçamento', headerTitleStyle: {color: "#4E54C8"} }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
