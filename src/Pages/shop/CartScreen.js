import React from "react";
import { 
    View,
    Text,
    FlatList,
    Button,
    StyleSheet
} from "react-native";
import { useSelector } from 'react-redux';
import Colors from "../../Template/constants/Colors";

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
        return transformedCarItems;
    });
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amountText}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button
                    title="Order Now"
                    color= {Colors.accent}
                    disabled={cartItems.length === 0}
                    onPress={() => {

                    }}
                />
            </View>
            <View>
                <Text>CART ITEMS</Text>
            </View>
        </View>
    );
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
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
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