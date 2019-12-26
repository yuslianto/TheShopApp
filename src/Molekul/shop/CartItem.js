import React from "react";
import { 
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'

const CartItem = (props) => {
    return (
        <View style={styles.carItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
                <TouchableOpacity style={styles.deleteButton}
                    onPress={props.onRemove}
                >
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        color="red"
                        size={23}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    carItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: '#888'
    },
    mainText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;