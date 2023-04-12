import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import StripeComponent from "../../components/Wallet/StripeComponent";
import { StripeProvider } from "@stripe/stripe-react-native";
import HeaderArrow from "../../components/HeaderArrow/HeaderArrow";
import BottomModal from "../../components/modal/BottomModal";
import { useState } from "react";
export default function WalletReload({ route }) {
  const { currentWalletId } = route.params;
  const [showStripe, setShowStripe] = useState(false);
  const stripePublicKey =
    "pk_test_51Mvx3FC1YMDXJxdtGT6j7vsZwU8By1JbzzWcv8Syh1QRlPK8DbXbtifyE2ouh00bpsJ1U7iy4ImYcxiwEixzLAiE009LNw9w2d";

  return (
    <ContainerSafeView>
      <HeaderArrow headerName="Top-up" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => setShowStripe(!showStripe)}
          className="bg-[#008cdd] py-4"
          style={{ borderRadius: 10 }}
        >
          <Text className="text-center text-white font-semibold text-base">
            Credit Card / Debit Card
          </Text>
        </Pressable>
      </ScrollView>
      <BottomModal isVisible={showStripe} setIsVisible={setShowStripe}>
        <View className="w-full">
          <StripeProvider publishableKey={stripePublicKey}>
            <StripeComponent currentWalletId={currentWalletId} />
          </StripeProvider>
        </View>
      </BottomModal>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
