import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import Advertisement from "../../components/Home/Advertisement";
import { StackActions, useNavigation } from "@react-navigation/native";
export default function SuccessfulScreen({ route }) {
  const { data } = route.params;
  const { person } = useGetCurrentUser();
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const TextContainer = ({ textL, textR }) => {
    return (
      <View className="flex-row justify-between mx-10 my-1">
        <Text className="text-gray-400 text-base">{textL}</Text>
        <Text className="text-gray-200 text-lg font-semibold capitalize">
          {textR}
        </Text>
      </View>
    );
  };

  return (
    <ContainerSafeView>
      <View style={{ height: height * 0.1 }}></View>
      <View
        className="bg-gray-800 relative mb-5"
        style={{ height: height * 0.6, borderRadius: 20 }}
      >
        <View
          className="absolute -top-16 px-7 py-8 flex-row justify-center items-center"
          style={{
            borderRadius: 1000,
            marginLeft: width * 0.27,
            backgroundColor: "rgba(0, 255, 0, 0.08)",
          }}
        >
          <Text
            className="text-white text-6xl px-3 py-4 bg-gray-500 text-center"
            style={{
              borderRadius: 1000,
              backgroundColor: "rgba(0, 255, 0, 0.2)",
            }}
          >
            <MaterialCommunityIcons name="check" size={70} color="white" />
          </Text>
        </View>
        <View className="mt-24 mb-10">
          <Text className="text-white text-center text-2xl font-semibold">
            Transfer Success!
          </Text>
          <Text className="text-gray-400 text-center mt-1 text-base font-semibold">
            Here are your invoice, thank you!
          </Text>
          <View className="my-5 border-t border-t-gray-400 border-dashed" />
          <TextContainer
            textL="Transfer Date"
            textR={new Date().toLocaleDateString()}
          />
          <TextContainer
            textL="Receiver"
            textR={data.person.firstName + " " + data.person.lastName}
          />
          <TextContainer
            textL="Sender"
            textR={person.firstName + " " + person.lastName}
          />
          <TextContainer textL="Amount" textR={data.amount} />
          <TextContainer textL="Additional Fee" textR={"0"} />
        </View>
        <Advertisement />
      </View>
      <Pressable
        onPress={() => navigation.dispatch(StackActions.replace("Wallet"))}
        style={{ height: height * 0.25 }}
        className="flex-row items-end"
      >
        <Text
          className="w-full p-4 bg-[#CC481F] text-white text-center font-semibold text-base"
          style={{ borderRadius: 10 }}
        >
          Done
        </Text>
      </Pressable>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
