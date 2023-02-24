import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import MessageEmpty from "../../components/messages/MessageEmpty";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/actions/userActions";
import { useNavigation } from "@react-navigation/native";

export default function MessagesAll() {
  const { users } = useSelector((state) => state.getAllUsersReducer);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <View
      className="mt-4 flex-row justify-between items-center"
      style={{ paddingHorizontal: 20 }}
    >
      {users &&
        users.map((user) => (
          <Pressable
            onPress={() => navigation.navigate("PersonalMessage", { user })}
          >
            <Text>{user.email}</Text>
          </Pressable>
        ))}

      {/* <MessageEmpty
        title="Its quiet here"
        description="Negotiations goes here and messages from someone who wants to buy from you."
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({});
