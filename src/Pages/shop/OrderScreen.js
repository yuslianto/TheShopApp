import React from "react";
import { 
    Text,
    FlatList
} from "react-native";
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrdersScreen = (props) => {
    const orders = useSelector(state => state.orders.orders)
    
    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => <Text>{itemData.item.totalAmount}</Text> }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default OrdersScreen;