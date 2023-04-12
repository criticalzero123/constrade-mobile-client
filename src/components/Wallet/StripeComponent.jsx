import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { useState } from "react";
import { stripePaymentIntent } from "../../../redux/actions/walletActions";

export default function StripeComponent() {
  const { user } = useGetCurrentUser();
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
        alert("Topup Confirmation Error");
      } else if (paymentIntent) {
        alert("Topup Successful");
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
