import React from "react";
import { 
    Text,
    FlatList,
    Platform
} from "react-native";
import { useSelector } from 'react-redux';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../Molekul/UI/HeaderButton';
import OrderItem from '../../Molekul/shop/OrderItem';

const OrdersScreen = (props) => {
    const orders = useSelector(state => state.orders.orders)
    
    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => ( 
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                /> 
            )}
        />
    );
};

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Yours Orders',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent= {HeaderButton}>
                <Item
                    title= "Cart"
                    iconName= {Platform.OS === 'android' ? "md-menu" : "ios-menu"}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    }
};

export default OrdersScreen;