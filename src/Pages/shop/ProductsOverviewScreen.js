import React, { useEffect, useState, useCallback } from "react";
import { 
    Platform,
    FlatList,
    Button,
    StyleSheet,
    ActivityIndicator,
    View,
    Text
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../Molekul/UI/HeaderButton'
import ProductItem from '../../Molekul/shop/ProductItem';
import * as cartActions from '../../Template/store/actions/cart';
import * as productsActions from '../../Template/store/actions/products';
import Colors from '../../Template/constants/Colors';

const ProductsOverviewScreen = props => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    
    const loadProducts = useCallback(async () => {
        console.log('Load Products');
        setError(null);
        //setIsLoading(true);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        //setIsLoading(false);
        setIsRefreshing(false)
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'willFocus',
            loadProducts
        );

        return () => {
            willFocusSub.remove();
        };
    }, [loadProducts]);
    
    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts]);
  
    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        });
    };

    //handling error
    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occurred!</Text>
                <Button
                    title="Try again"
                    onPress={loadProducts}
                    color={Colors.primary}
                />
            </View>
        );
      }
    
    // handling loading
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }
    
    // 
    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. Maybe start adding some!</Text>
            </View>
        );
    }
  
    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                    }}
                >
                    <Button
                        color={Colors.primary}
                        title="View Details"
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title);
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title="To Cart"
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item));
                        }}
                    />
                </ProductItem>
            )}
        />
    );
};
  
ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Cart"
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('Cart');
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
  
export default ProductsOverviewScreen;  