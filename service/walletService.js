import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export const itemWallet = [
  {
    id: 0,
    title: "Pay now",
    icon: <MaterialCommunityIcons name="cash-fast" size={34} color="gray" />,
    to: "WalletPaynow",
  },
  {
    id: 1,
    title: "Reload",
    icon: <MaterialCommunityIcons name="cash-plus" size={34} color="gray" />,
    to: "WalletReload",
  },
  {
    id: 2,
    title: "Transfer",
    icon: <Ionicons name="arrow-undo" size={34} color="gray" />,
    to: "WalletTransfer",
  },
  {
    id: 3,
    title: "History",
    icon: <MaterialCommunityIcons name="history" size={34} color="gray" />,
    to: "WalletHistory",
  },
];
