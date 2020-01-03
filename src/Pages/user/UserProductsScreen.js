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
    const userProducts = useSelector(
        state => state.products.userProducts
    );
    const dispatch = useDispatch();

    const editProducrHandler = (id)=> {
        props.navigation.navigate('EditProduct', {productId: id});
    };

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={()=>{
                        editProducrHandler(itemData.item.id);
                    }}
                >
                    <Button 
                        color={Colors.primary} 
                        title="Edit" 
                        onPress={()=> {
                            editProducrHandler(itemData.item.id);
                        }} 
                    />
                    <Button 
                        color={Colors.primary} 
                        title="Delete" 
                        onPress={() => {
                           dispatch(productsActions.deleteProduct(
                               itemData.item.id
                            ));
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
                    title= "Menu"
                    iconName= {
                        Platform.OS === 'android' 
                        ? "md-menu" : "ios-menu"
                    }
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent= {HeaderButton}>
                <Item
                    title= "Add"
                    iconName= {
                        Platform.OS === 'android' 
                        ? "md-create" : "ios-create"
                    }
                    onPress={() => {
                        navData.navigation.navigate('EditProduct');
                    }}
                />
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
});

export default UserProductScreen;