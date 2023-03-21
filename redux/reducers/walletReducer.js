export const getWalletUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_WALLET_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_WALLET_USER_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_WALLET_USER_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};

export const getAllTransactionsWalletUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_TRANSACTION_WALLET_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ALL_TRANSACTION_WALLET_USER_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_ALL_TRANSACTION_WALLET_USER_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};

export const getAllWalletUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_WALLET_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ALL_WALLET_USER_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "GET_ALL_WALLET_USER_FAILED":
      return {
        loading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};
