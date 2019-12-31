import React from "react";
import { 
    View,
    Platform,
    FlatList,
    StyleSheet
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../Molekul/UI/HeaderButton'
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

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
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
        headerRight: (
            <HeaderButtons HeaderButtonComponent= {HeaderButton}>
                <Item
                    title= "Cart"
                    iconName= {Platform.OS === 'android' ? "md-cart" : "ios-cart"}
                    onPress={() => {
                        navData.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default ProductsOverviewScreen;