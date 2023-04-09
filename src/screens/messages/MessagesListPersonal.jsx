import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

import usePersonalList from "../../hooks/Message/usePersonalList";
import { ActivityIndicator } from "react-native-paper";
import ChatInfoItem from "../../components/messages/ChatInfoItem";
import MessageEmpty from "../../components/messages/MessageEmpty";
import { useState } from "react";
import { useEffect } from "react";

export default function MessagesListPersonal() {
  const { data, searchUser } = usePersonalList();
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.trim() === "") setSearchData([]);
  }, [search]);

  const onSearch = async () => {
    const res = await searchUser(search);

    if (res.length === 0) alert("No user found!");

    setSearchData(res);
  };

  if (data === undefined)
    return (
      <View
        className="mt-4 flex-row justify-center items-center h-full"
        style={{ paddingHorizontal: 20 }}
      >
        <ActivityIndicator size="large" />
      </View>
    );

  if (data.length === 0)
    return (
      <View className="mt-4" style={{ paddingHorizontal: 20 }}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search user..."
          className="py-2 px-3 border mt-2 mb-6 border-gray-400"
          style={{ borderRadius: 5 }}
          onSubmitEditing={onSearch}
        />
        {searchData.map((chat, index) => (
          <ChatInfoItem info={chat} key={index} search={true} />
        ))}
        <MessageEmpty
          title="Its quiet here"
          description="Negotiations goes here and messages from someone who wants to buy from you."
        />
      </View>
    );

  if (searchData.length > 0 && search.trim() !== "")
    return (
      <View className="mt-4" style={{ paddingHorizontal: 20 }}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search user..."
          className="py-2 px-3 border mt-2 mb-6 border-gray-400"
          style={{ borderRadius: 5 }}
          onSubmitEditing={onSearch}
        />
        {searchData.map((chat, index) => (
          <ChatInfoItem info={chat} key={index} search={true} />
        ))}
      </View>
    );

  return (
    <View className="mt-4" style={{ paddingHorizontal: 20 }}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search user..."
        className="py-2 px-3 border mt-2 mb-6 border-gray-400"
        style={{ borderRadius: 5 }}
        onSubmitEditing={onSearch}
      />
      {data.map((chat, index) => (
        <ChatInfoItem info={chat} key={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
