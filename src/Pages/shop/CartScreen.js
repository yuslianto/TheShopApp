import React from "react";
import { 
    View,
    Text,
    FlatList,
    Button,
    StyleSheet
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';

import Colors from "../../Template/constants/Colors";
import CartItem from '../../Molekul/shop/CartItem';
import * as cartAction from '../../Template/store/actions/cart';
import * as orderActions from '../../Template/store/actions/orders';
import Cart from '../../Molekul/UI/Cart';

const CartScreen = (props) => {
    const cartTotalAmount = useSelector (state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCarItems = [];
        for (const key in state.cart.items) {
            transformedCarItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return transformedCarItems.sort((a, b) => 
            a.productId > b.productId ? 1 : -1
        );
    });

    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <Cart style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:{' '}
                    <Text style={styles.amountText}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                <Button
                    title="Order Now"
                    color= {Colors.accent}
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
                    }}
                />
            </Cart>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={ itemData => (
                    <CartItem 
                        quantity={itemData.item.quantity} 
                        title={itemData.item.productTitle} 
                        amount={itemData.item.sum} 
                        deletable
                        onRemove={()=>{
                            dispatch(cartAction.removeFromCart(itemData.item.productId));
                        }} 
                    />
                )}
            />
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Yours Orders'
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18
    },
    amountText: {
        color: Colors.primary
    }
});

export default CartScreen;