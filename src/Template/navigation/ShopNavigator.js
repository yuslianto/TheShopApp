import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {} from 'react-navigation-'
import { Platform } from 'react-native';

import ProductOverviewScreen from '../../Pages/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../../Pages/shop/ProductDetailScreen';
import CartScreen from '../../Pages/shop/CartScreen';
import ordersScreen from '../../Pages/shop/OrderScreen';
import Colors from '../constants/Colors';

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: {
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
});

export default createAppContainer(ProductsNavigator);