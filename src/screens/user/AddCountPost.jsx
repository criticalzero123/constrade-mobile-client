import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import React from "react";
import { useState } from "react";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { addCountPost, getUserInfo } from "../../../redux/actions/userActions";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import { useDispatch } from "react-redux";
export default function AddCountPost() {
  const [counts, setCounts] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user, person } = useGetCurrentUser();

  const handleSubmit = async () => {
    setLoading(true);
    const res = await addCountPost(user.userId, counts);

    if (res === "NotEnough") {
      alert("Balance is not enough. Please top-up to have more balance.");
    }

    if (res === "Success") {
      alert("Adding Count Success");

      const userInfo = {
        user: {
          ...user,
          countPost: parseInt(counts) + parseInt(user.countPost),
        },
        person: { ...person },
      };

      dispatch(getUserInfo(userInfo));
    }

    setLoading(false);
    setCounts(0);
  };

  return (
    <ContainerSafeView>
      <HeaderArrow headerName={"Add Count"} />
      <View className="mt-5" />
      <Text className="text-center">
        Add count post to post more products in{" "}
        <Text className="text-[#CC481F] font-semibold">ConsTrade</Text>.
      </Text>
      <Text className="mb-5 mt-2 text-center">
        It is only 1 peso every refill.
      </Text>
      <TextInput
        placeholder="Input count"
        keyboardType="number-pad"
        value={counts}
        onChangeText={setCounts}
        className=" border-gray-300 border py-3 px-2 rounded"
      />

      <View className="flex-1 justify-end">
        <Text className="text-center mb-5">
          You got <Text className="text-[#CC481F]">{user.countPost}</Text> Count
          Post
        </Text>
        <Pressable onPress={handleSubmit} disabled={loading}>
          <Text className="py-4 text-center bg-[#CC481F] text-white mb-4 rounded">
            {loading ? <ActivityIndicator /> : "Submit"}
          </Text>
        </Pressable>
      </View>
    </ContainerSafeView>
  );
}
