import gamesCategories from "../assets/Discover/games.jpg";
import consoleCategories from "../assets/Discover/consoles.jpg";

export const categoriesData = [
  {
    id: 1,
    title: "Trade - in",
    description: "Console games",
    image: consoleCategories,
    value: "trade-in",
  },
  {
    id: 2,
    title: "Swap",
    description: "Console games",
    image: gamesCategories,
    value: "swap",
  },
  {
    id: 3,
    title: "Cash",
    description: "Console games",
    image: consoleCategories,
    value: "cash",
  },
];

export const tempDataItem = [
  {
    id: 1,
    title: "Legend of Zelda with somethings somethings somethings",
    user: {
      imageUrl:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    person: {
      firstName: "john",
      lastName: " doe",
    },

    preferTrade: "trade-in",
  },
  {
    id: 2,
    title: "MineCraft somethings somethings somethings",
    user: {
      imageUrl:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    person: {
      firstName: "john",
      lastName: " did",
    },
    preferTrade: "trade",
  },
  {
    id: 3,
    title: "Legend of JD with somethings somethings somethings",
    user: {
      imageUrl:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    person: {
      firstName: "john",
      lastName: " does",
    },
    preferTrade: "cash only",
  },
  {
    id: 4,
    title: "Legend of ME with somethings somethings somethings",
    user: {
      imageUrl:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    person: {
      firstName: "john",
      lastName: " die",
    },
    preferTrade: "trade-in",
  },
];
