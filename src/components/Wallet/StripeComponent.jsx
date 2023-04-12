import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { useState } from "react";
import {
  stripePaymentIntent,
  topUp,
} from "../../../redux/actions/walletActions";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function StripeComponent({ currentWalletId }) {
  const { user } = useGetCurrentUser();
  const navigation = useNavigation();
  const [cardDetails, setCardDetails] = useState();
  const [amount, setAmount] = useState(0);
  const { confirmPayment, loading } = useConfirmPayment();

  const handlePayPress = async () => {
    if (!cardDetails?.complete) {
      alert("Please enter card details");
      return;
    }

    const billingDetails = {
      email: user.email,
    };

    const res = await stripePaymentIntent(amount);

    if (res === undefined) {
      alert("Unable to process payment");
      return;
    }

    try {
      const { paymentIntent, error } = await confirmPayment(res.clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails: billingDetails,
        },
      });

      if (error) {
        alert("Payment in stripe confirmation Error");
        return;
      }

      const result = await topUp(currentWalletId, amount);

      if (result) {
        alert("Topup Successful");
        navigation.dispatch(
          StackActions.replace("WalletReload", { currentWalletId })
        );
      } else {
        alert("Something Went wrong in adding balance.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>StripeComponent</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="number-pad"
        placeholder="Enter amount..."
      />
      <CardField
        postalCodeEnabled
        placeholders={{ number: "4242 4242 4242 4242" }}
        style={styles.cardContainer}
        cardStyle={styles.card}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />
      <Pressable onPress={handlePayPress} disabled={loading}>
        <Text>Top Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#efefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
