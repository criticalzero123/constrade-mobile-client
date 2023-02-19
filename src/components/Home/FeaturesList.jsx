import { Animated, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import Paginator from "../onboarding/Paginator";
import FeatureItem from "./FeatureItem";

export default function FeaturesList() {
  const tempData = [
    {
      id: 1,
      title: "Introducing Trade-ins",
      description: "Curated trade-in items just for you.",
    },
    {
      id: 2,
      title: "Introducing Price Generator",
      description: "Automatically give you the amount for your item.",
    },
    {
      id: 3,
      title: "Introducing the shit",
      description: "Automatically give you load of shits",
    },
  ];

  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View className="w-full">
      <FlatList
        data={tempData}
        renderItem={({ item, index }) => (
          <FeatureItem item={item} index={index} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        // pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={32}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <View className="w-full items-center mt-4">
        <Paginator data={tempData} scrollX={scrollX} size="small" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
