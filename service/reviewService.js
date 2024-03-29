import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";

export const getStar = (num) => {
  const starDisplay = (index) => {
    return index < num ? (
      <AntDesign name="star" size={24} color={starColor()} key={index} />
    ) : (
      <AntDesign name="star" size={24} color="silver" key={index} />
    );
  };

  const starColor = () => {
    switch (num) {
      case 1:
        return "red";

      case 2:
      case 3:
        return "#d4af37";

      case 4:
      case 5:
        return "green";
    }
  };

  return [...Array(5)].map((_, index) => starDisplay(index));
};

export const dynamicStar = (num, setNum) => {
  const starDisplay = (index) => {
    return index < num ? (
      <View key={index}>
        <AntDesign
          name="star"
          size={45}
          color={starColor()}
          onPress={() => setNum(index + 1)}
        />
      </View>
    ) : (
      <View key={index}>
        <AntDesign
          name="star"
          size={45}
          color="silver"
          onPress={() => setNum(index + 1)}
        />
      </View>
    );
  };

  const starColor = () => {
    switch (num) {
      case 1:
        return "red";

      case 2:
      case 3:
        return "#d4af37";

      case 4:
      case 5:
        return "green";
    }
  };

  return [...Array(5)].map((_, index) => starDisplay(index));
};
