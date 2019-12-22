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


const ProductDetail = (props) => {
    const produkId = props.navigation.getParam('productId');
    // to selected product by id
    const selectedProduct = useSelector(state => 
        state.products.availableProducts.find(prod => prod.id === produkId
    ));

    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{uri: selectedProduct.imageUrl}}
            />
            <View style={styles.actions}>
                <Button
                    title="Add to cart"
                    onPress={()=>{
                        dispatch(cartActions.addToCart(selectedProduct));
                    }}
                    color= {Colors.primary}
                />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductDetail.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
};

const styles = StyleSheet.create({
    image: {
        height: 300,
        width: '100%'
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },
    description: {
        fontSize: 14,fontFamily: 'Roboto-Light',
        textAlign: 'center',
        marginHorizontal: 20
    },
});

export default ProductDetail;