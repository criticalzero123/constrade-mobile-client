import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
  Animated,
  View,
} from "react-native";
import React, { useState, useRef } from "react";
import OnboardingItems from "../../components/onboarding/OnboardingItems";
import Paginator from "../../components/onboarding/Paginator";
import slides from "../../../service/onboarding-slider";

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginVertical: 20 }}></View>
      <Paginator data={slides} scrollX={scrollX} />
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItems item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
