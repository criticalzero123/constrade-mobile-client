import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export const useHideBottomTab = (flag = true) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (!flag) {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "flex",
        },
      });
    } else {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "none",
        },
      });
    }

    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);
};
