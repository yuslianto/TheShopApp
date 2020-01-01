import React from "react";
import { 
    View,
    Text,
    Platform,
    Button,
    FlatList,
    StyleSheet
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../Molekul/UI/HeaderButton';
import ProductItem from '../../Molekul/shop/ProductItem';
import Colors from '../../Template/constants/Colors';
import * as productsAction from '../../Template/store/actions/products';

const UserProductScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch();

    return (
        <FlatList
            data={userProducts}
            keyExtractor={ProductItem.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={()=>{}}
                >
                    <Button 
                        color={Colors.primary} 
                        title="Edit" 
                        onPress={()=> {
                            
                        }} 
                    />
                    <Button 
                        color={Colors.primary} 
                        title="Delete" 
                        onPress={() => {
                           dispatch(productsAction.deleteProduct(itemData.item.id));
                        }} 
                    />
                </ProductItem>
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