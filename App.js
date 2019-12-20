/** */

import React from 'react';
import { Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
//remove redex devtools in your production
//import { composeWithDevTools } from 'redux-devtools-extension';

import productsReducer from './src/Template/store/reducers/products';
import cartReducer from './src/Template/store/reducers/cart';
import ShopNavigator from './src/Template/navigation/ShopNavigator';

enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

const store = createStore(rootReducer, /*composeWithDevTools()*/)

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}