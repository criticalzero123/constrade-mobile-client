import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMoney } from "../../../redux/actions/walletActions";

export default function useSendMoney() {
  const dispatch = useDispatch();
  const { result, loading, error } = useSelector(
    (state) => state.sendMoneyReducer
  );
  const sendMoneyTrigger = (currentWalletId, otherWalletId, amount) => {
    if (amount === 0) {
      alert("Please enter an amount!");
      return;
    }

    const info = {
      senderWalletId: currentWalletId,
      receiverWalletId: otherWalletId,
      amount: amount,
      DateSend: new Date(),
    };

    dispatch(sendMoney(info));
  };

  return [sendMoneyTrigger, result, loading, error];
}
