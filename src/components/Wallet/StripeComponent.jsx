import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
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
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [amount, setAmount] = useState(0);
  const { confirmPayment, loading } = useConfirmPayment();

  const handlePayPress = async () => {
    setLoadingPayment(true);
    if (!cardDetails?.complete) {
      alert("Please enter card details");
      return;
    }

    if (amount < 100) {
      alert("Please enter more than 100");
      return;
    }

    const billingDetails = {
      email: user.email,
    };

    const res = await stripePaymentIntent(amount);

    if (res === undefined) {
      alert("Unable to process payment");
      setLoadingPayment(false);

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
        setLoadingPayment(false);

        return;
      }

      const result = await topUp(currentWalletId, amount);

      if (result) {
        alert("Topup Successful");
        navigation.dispatch(StackActions.replace("Wallet"));
      } else {
        alert("Something Went wrong in adding balance.");
      }
      setLoadingPayment(false);
    } catch (error) {
      console.log(error);
      setLoadingPayment(false);
    }
  };

  return (
    <View>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="number-pad"
        placeholder="Enter amount..."
        className="border py-2 px-4 border-gray-400"
        style={{ borderRadius: 5 }}
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
      <Pressable
        onPress={handlePayPress}
        disabled={loadingPayment || loading}
        className={`py-4 ${
          loadingPayment ? " bg-[#cc471f6b]" : " bg-[#CC481F]"
        }`}
        style={{ borderRadius: 5 }}
      >
        {loadingPayment ? (
          <ActivityIndicator />
        ) : (
          <Text className="text-white text-center">Confirm</Text>
        )}
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
