import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, Image } from "react-native";
import HomeScreen from './screens/Home';
import User from "./assets/profile.png";
import RegisterEvent from "./screens/RegisterEvent";
import { SafeAreaView } from "react-native-safe-area-context";
import { SimpleLineIcons, MaterialIcons, MaterialCommunityIcons, FontAwesome} from "@expo/vector-icons";
import { useContext } from 'react';
import { UserContext } from './UserContext';
import Sair from "./screens/Sair";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {

  const { user } = useContext(UserContext);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={
        (props) => {
          return (
            <SafeAreaView>
              <View
                style={{
                  height: 200,
                  width: '100%',
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomColor: "#f4f4f4",
                  borderBottomWidth: 1,
                  // backgroundColor: "#4E54C8"
                }}
              >
                <Image
                  source={User}
                  style={{
                    height: 130,
                    width: 130,
                    borderRadius: 65
                  }}
                />
                <Text
                  style={{
                    fontSize: 22,
                    marginVertical: 6,
                    fontWeight: "bold",
                    color: "#4E54C8"
                  }}
                >{user.user_nome}</Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#111"
                  }}
                >Técnico</Text>
              </View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          )
        }
      }
    >
      <Drawer.Screen name="Home" component={HomeScreen}
        options={{
          drawerLabel: "Home",
          title: "SOS DOS ELEVADORES",
          headerTitleStyle: {color: "#4E54C8"},
          drawerIcon: () => (
            <SimpleLineIcons name="home" size={20} color="#4E54C8" />
          )
        }} />
      <Drawer.Screen name="evento" component={RegisterEvent}
        options={{
          drawerLabel: "Registrar Evento",
          headerTitleStyle: {color: "#4E54C8"},
          title: "Eventos",
          drawerIcon: () => (
            <SimpleLineIcons name="target" size={20} color="#4E54C8" />
          )
        }} />
        <Drawer.Screen name="sair" component={Sair}
        options={{
          drawerLabel: "Sair",
          title: "sair",
          headerShown: false,
          drawerIcon: () => (
            <SimpleLineIcons name="logout" size={20} color="#4E54C8" />
          )
        }} />
    </Drawer.Navigator>
  );
}
