/** */

import React from 'react';
import { Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import ReduxThunk from 'redux-thunk';
//remove redex devtools in your production
//import { composeWithDevTools } from 'redux-devtools-extension';

import productsReducer from './src/Template/store/reducers/products';
import cartReducer from './src/Template/store/reducers/cart';
import orderReducer from './src/Template/store/reducers/orders';
import ShopNavigator from './src/Template/navigation/ShopNavigator';

enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk) /*composeWithDevTools()*/)

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}

/*
adding \ in blacklist.js 
  /node_modules[\/\\]react[\/\\]dist[\/\\]./
  metro-config src default sharedBlacklist 
*/