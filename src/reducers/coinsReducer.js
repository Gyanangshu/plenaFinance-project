import { actionTypes } from "../actions/types";

export const coinsReducer = (state = { coins: [], loading: false, error: null, selectedCoins: [] }, action) => {
  switch (action.type) {
    case actionTypes.SET_COINS:
      return { ...state, coins: action.payload };
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.SET_SELECTED_COINS:
      return { ...state, selectedCoins: action.payload };
    case actionTypes.CLEAR_SELECTED_COINS:
      return { ...state, selectedCoins: [] };
    default:
      return state;
  }
};