import { AntDesign } from "@expo/vector-icons";

export const getStar = (num) => {
  const starDisplay = (index) => {
    return index < num ? (
      <AntDesign name="star" size={24} color={starColor()} />
    ) : (
      <AntDesign name="star" size={24} color="silver" />
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
