import { useEffect } from "react";
import {
  getAllTransactionWalletUser,
  getWalletUser,
} from "../../../redux/actions/walletActions";
import { useState } from "react";

export default function useWalletUser(userId) {
  const [wallet, setWallet] = useState();
  const [transactions, setTransactions] = useState();
  const [transactionsAll, setTransactionsAll] = useState();

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
      const tempList = [...res.money, ...res.other]
        .sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        })
        .reverse();
      setTransactionsAll(tempList);
      setTransactions(tempList.slice(0, 10));
    };

    fetch();
  }, [wallet]);

  return { wallet, transactions, transactionsAll };
}
