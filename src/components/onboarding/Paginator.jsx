import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";
import React from "react";

export default function Paginator({ data, scrollX, size }) {
  const { width } = useWindowDimensions();

  const dot = size === "large" ? 8 : 4;
  const activeDot = size === "large" ? 32 : 16;

  return (
    <View style={{ flexDirection: "row" }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [dot, activeDot, dot],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.2],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[
              styles.dot,
              { width: dotWidth, opacity, height: dot, borderRadius: dot },
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: "#CC481F",
    marginHorizontal: 4,
  },
});
