import { actionTypes } from './types';

export const actions = {
  fetchCoins: () => async (dispatch) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    dispatch({ type: actionTypes.SET_ERROR, payload: null });
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h'
      );
      if (!response.ok) throw new Error('Failed to fetch coins');
      const data = await response.json();
      dispatch({ type: actionTypes.SET_COINS, payload: data });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: actionTypes.SET_LOADING, payload: false });
    }
  },
  
  addToWatchlist: (coins) => async (dispatch) => {
    const enrichedCoins = coins.map(coin => ({
      ...coin,
      holdings: 0,
      value: 0
    }));
    dispatch({ type: actionTypes.ADD_TO_WATCHLIST, payload: enrichedCoins });
    dispatch({ type: actionTypes.CLEAR_SELECTED_COINS });
  },
  
  removeFromWatchlist: (coinId) => ({
    type: actionTypes.REMOVE_FROM_WATCHLIST,
    payload: coinId
  }),
  
  updateHoldings: (coinId, holdings) => ({
    type: actionTypes.UPDATE_HOLDINGS,
    payload: { coinId, holdings }
  }),
  
  updateWatchlistData: () => async (dispatch, getState) => {
    const { watchlist } = getState().portfolio;
    if (watchlist.length === 0) return;
    
    try {
      const ids = watchlist.map(coin => coin.id).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&sparkline=true&price_change_percentage=24h`
      );
      if (!response.ok) throw new Error('Failed to update prices');
      const data = await response.json();
      dispatch({ type: actionTypes.UPDATE_WATCHLIST_DATA, payload: data });
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  },
  
  toggleCoinSelection: (coin) => (dispatch, getState) => {
    const { selectedCoins } = getState().coins;
    const isSelected = selectedCoins.some(c => c.id === coin.id);
    
    if (isSelected) {
      dispatch({
        type: actionTypes.SET_SELECTED_COINS,
        payload: selectedCoins.filter(c => c.id !== coin.id)
      });
    } else {
      dispatch({
        type: actionTypes.SET_SELECTED_COINS,
        payload: [...selectedCoins, coin]
      });
    }
  }
};
