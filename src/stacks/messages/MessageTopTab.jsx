import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  Platform,
  Text,
  StatusBar,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import MessagesListPersonal from "../../screens/messages/MessagesListPersonal";
import MessagesListProduct from "../../screens/messages/MessagesListProduct";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { useState } from "react";
import { useEffect } from "react";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { getNotificationCount } from "../../../redux/actions/notificationAction";

const Tab = createMaterialTopTabNavigator();

export default function MessageTopTab() {
  const navigation = useNavigation();
  const [countNotif, setCountNotif] = useState();
  const { user } = useGetCurrentUser();

  useEffect(() => {
    const fetch = async () => {
      const res = await getNotificationCount(user.userId);

      setCountNotif(res);
    };

    fetch();
  }, []);

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
          {countNotif === undefined ? (
            <ActivityIndicator />
          ) : (
            <Pressable
              onPress={() => navigation.navigate("Notification")}
              className="relative"
            >
              <Ionicons name="notifications-outline" size={24} color="black" />
              {countNotif !== 0 && (
                <Text className="absolute right-0 top-0 px-1 rounded-full  text-xs text-white bg-[#CC481F] font-semibold">
                  {countNotif}
                </Text>
              )}
            </Pressable>
          )}
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
