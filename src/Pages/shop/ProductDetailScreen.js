import React, {} from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import { useSelector } from 'react-redux';


const ProductDetail = (props) => {
    const produkId = props.navigation.getParam('productId');
    // to selected product by id
    const selectedProduct = useSelector(state => 
        state.products.availableProducts.find(prod => prod.id === produkId
    ));

    return (
        <View style={styles.container}>
            <Text>{selectedProduct.title}</Text>
        </View>
    );
};

ProductDetail.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ProductDetail;