import { sendMoney } from "../../../redux/actions/walletActions";

export default function useSendMoney() {
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

    return sendMoney(info);
  };

  return [sendMoneyTrigger];
}
