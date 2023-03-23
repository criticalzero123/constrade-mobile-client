import { MaterialCommunityIcons } from "@expo/vector-icons";
export const itemWallet = [
  {
    id: 0,
    title: "Reload",
    icon: <MaterialCommunityIcons name="cash-plus" size={34} color="gray" />,
    to: "WalletReload",
  },
  {
    id: 1,
    title: "Transfer",
    icon: <MaterialCommunityIcons name="cash-fast" size={34} color="gray" />,
    to: "WalletTransfer",
  },
  {
    id: 2,
    title: "History",
    icon: <MaterialCommunityIcons name="history" size={34} color="gray" />,
    to: "WalletHistory",
  },
];
