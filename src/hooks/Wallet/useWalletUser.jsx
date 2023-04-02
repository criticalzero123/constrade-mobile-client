import { useEffect } from "react";
import {
  getAllTransactionWalletUser,
  getWalletUser,
} from "../../../redux/actions/walletActions";
import { useState } from "react";

export default function useWalletUser(userId) {
  const [wallet, setWallet] = useState();
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    if (userId === undefined) return;

    const fetch = async () => {
      const res = await getWalletUser(userId);

      setWallet(res);
    };

    fetch();
  }, [userId]);

  useEffect(() => {
    if (wallet === undefined) return;

    const fetch = async () => {
      const res = await getAllTransactionWalletUser(wallet.walletId);

      setTransactions(res);
    };

    fetch();
  }, [wallet]);

  return { wallet, transactions };
}
