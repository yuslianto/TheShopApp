import React from "react";
import { 
    View,
    Text,
    Platform,
    FlatList,
    StyleSheet
} from "react-native";
import { useSelector } from 'react-redux';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../Molekul/UI/HeaderButton'
import ProductItem from '../../Molekul/shop/ProductItem';

const UserProductScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts)

    return (
        <FlatList
            data={userProducts}
            keyExtractor={ProductItem.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={() => {}}
                    onAddToCart={() => {}}
                />
            )}
        />
    );
};

UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
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
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default UserProductScreen;