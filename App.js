/** */

import React from 'react';
import { Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';

import productsReducer from './src/Template/store/reducers/products';
import ShopNavigator from './src/Template/navigation/ShopNavigator';

enableScreens();

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}