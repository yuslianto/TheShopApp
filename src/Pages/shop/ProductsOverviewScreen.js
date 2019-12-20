import React from "react";
import { 
    View,
    Text,
    FlatList,
    StyleSheet
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../Molekul/shop/ProductItem';
import * as cartActions from '../../Template/store/actions/cart';

const ProductsOverviewScreen = (props) => {
    const produts = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <FlatList
                data={produts}
                keyExtractor={item => item.id}
                renderItem={itemData => (
                    <ProductItem 
                        image={itemData.item.imageUrl} 
                        title={itemData.item.title} 
                        price={itemData.item.price} 
                        onViewDetail={()=> {
                            props.navigation.navigate('ProductDetail', {
                                productId: itemData.item.id,
                                productTitle: itemData.item.title

                            });
                        }} 
                        onAddToCart={()=> {
                            dispatch(cartActions.addToCart(itemData.item));
                        }} 
                    />
                )}
            />
        </View>
    );
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default ProductsOverviewScreen;