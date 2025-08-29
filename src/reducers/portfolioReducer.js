import { actionTypes } from "../actions/types";

export const portfolioReducer = (state = { watchlist: [] }, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_WATCHLIST: {
            const newWatchlist = [...state.watchlist, ...action.payload];
            localStorage.setItem('cryptoWatchlist', JSON.stringify(newWatchlist));
            return { ...state, watchlist: newWatchlist };
        }

        case actionTypes.REMOVE_FROM_WATCHLIST: {
            const filtered = state.watchlist.filter(coin => coin.id !== action.payload);
            localStorage.setItem('cryptoWatchlist', JSON.stringify(filtered));
            return { ...state, watchlist: filtered };
        }

        case actionTypes.UPDATE_HOLDINGS: {
            const updated = state.watchlist.map(coin =>
                coin.id === action.payload.coinId
                    ? { ...coin, holdings: action.payload.holdings, value: coin.current_price * action.payload.holdings }
                    : coin
            );
            localStorage.setItem('cryptoWatchlist', JSON.stringify(updated));
            return { ...state, watchlist: updated };
        }

        case actionTypes.UPDATE_WATCHLIST_DATA: {
            const updatedData = state.watchlist.map(coin => {
                const newData = action.payload.find(c => c.id === coin.id);
                if (newData) {
                    return {
                        ...coin,
                        ...newData,
                        holdings: coin.holdings,
                        value: newData.current_price * coin.holdings
                    };
                }
                return coin;
            });
            localStorage.setItem('cryptoWatchlist', JSON.stringify(updatedData));
            return { ...state, watchlist: updatedData };
        }

        default:
            return state;
    }
};
