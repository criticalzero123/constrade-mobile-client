import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerSafeView from "../../components/CustomViews/ContainerSafeView";
import StripeComponent from "../../components/Wallet/StripeComponent";
import { StripeProvider } from "@stripe/stripe-react-native";
export default function WalletReload({ route }) {
  const { currentWalletId } = route.params;
  const stripePublicKey =
    "pk_test_51Mvx3FC1YMDXJxdtGT6j7vsZwU8By1JbzzWcv8Syh1QRlPK8DbXbtifyE2ouh00bpsJ1U7iy4ImYcxiwEixzLAiE009LNw9w2d";

  return (
    <ContainerSafeView>
      <StripeProvider publishableKey={stripePublicKey}>
        <StripeComponent currentWalletId={currentWalletId} />
      </StripeProvider>
      <Text>WalletReload</Text>
    </ContainerSafeView>
  );
}

const styles = StyleSheet.create({});
