import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Platform, Text, StatusBar, View, Pressable } from "react-native";
import MessagesListPersonal from "../../screens/messages/MessagesListPersonal";
import MessagesListProduct from "../../screens/messages/MessagesListProduct";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";

const Tab = createMaterialTopTabNavigator();

export default function MessageTopTab() {
  const navigation = useNavigation();
  return (
    <ContainerSafeView horizontalSpace={false}>
      <View
        style={{
          paddingHorizontal: 20,
        }}
        className="mb-6"
      >
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-lg font-bold">Messages</Text>
          <Pressable onPress={() => navigation.navigate("Notification")}>
            <Ionicons name="notifications-outline" size={22} color="black" />
          </Pressable>
        </View>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: "700" },
          tabBarStyle: {
            backgroundColor: "rgba(0,0,0,0)",
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0,0,0,0.1)",
            shadowColor: "white",
          },
          tabBarInactiveTintColor: "rgba(0,0,0,0.3)",
          tabBarActiveTintColor: "black",
          tabBarIndicatorStyle: {
            backgroundColor: "rgba(0,0,0,0.65)",
            height: "4%",
            width: "40%",
            marginLeft: 20,
          },
        }}
      >
        <Tab.Screen
          name="MessagesListPersonal"
          component={MessagesListPersonal}
          options={{
            tabBarLabel: "Personal",
            tabBarLabelStyle: {
              textTransform: "capitalize",
            },
          }}
        />
        <Tab.Screen
          name="MessagesListProduct"
          component={MessagesListProduct}
          options={{
            tabBarLabel: "Product",
            tabBarLabelStyle: { textTransform: "capitalize" },
          }}
        />
      </Tab.Navigator>
    </ContainerSafeView>
  );
}
