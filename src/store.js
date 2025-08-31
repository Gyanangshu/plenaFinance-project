import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { coinsReducer } from './reducers/coinsReducer';
import { portfolioReducer } from './reducers/portfolioReducer';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cryptoWatchlist');
    if (serializedState === null) {
      return { portfolio: { watchlist: [], lastUpdated: null } };
    }
    const parsed = JSON.parse(serializedState);
    return { portfolio: { 
      watchlist: parsed.watchlist || [], 
      lastUpdated: parsed.lastUpdated || null 
    }};
  } catch (err) {
    return { portfolio: { watchlist: [], lastUpdated: null }, err };
  }
};

const rootReducer = combineReducers({
  coins: coinsReducer,
  portfolio: portfolioReducer
});

export const store = createStore(rootReducer, loadState(), applyMiddleware(thunk));