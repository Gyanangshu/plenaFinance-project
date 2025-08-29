import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { coinsReducer } from './reducers/coinsReducer';
import { portfolioReducer } from './reducers/portfolioReducer';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cryptoWatchlist');
    if (serializedState === null) {
      return { portfolio: { watchlist: [] } };
    }
    return { portfolio: { watchlist: JSON.parse(serializedState) } };
  } catch (err) {
    return { portfolio: { watchlist: [] } , err};
  }
};

const rootReducer = combineReducers({
  coins: coinsReducer,
  portfolio: portfolioReducer
});

export const store = createStore(rootReducer, loadState(), applyMiddleware(thunk));