import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProductOverviewScreen from '../../Pages/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../../Pages/shop/ProductDetailScreen';
import CartScreen from '../../Pages/shop/CartScreen';
import OrdersScreen from '../../Pages/shop/OrderScreen';
import Colors from '../constants/Colors';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'Roboto-Bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'Roboto-Light'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});

const OrderNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrderNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(ShopNavigator);