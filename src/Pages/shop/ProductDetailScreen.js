import React, {} from "react";
import { 
    View,
    Text,
    Image,
    ScrollView,
    Button,
    StyleSheet
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../Template/constants/Colors';
import * as cartActions from '../../Template/store/actions/cart';


const ProductDetailScreen = props => {
    console.log('Product Detail')
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId)
    );
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    title="Add to Cart"
                    onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct));
                    }}
                />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};
  
ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
};
  
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'Roboto-Bold'
    },
    description: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }
});
  
export default ProductDetailScreen;