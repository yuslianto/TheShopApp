import React from "react";
import { 
    View,
    Text,
    FlatList,
    StyleSheet
} from "react-native";
import { useSelector } from 'react-redux';

const ProductsOverviewScreen = (props) => {
    const produts = useSelector(state => state.products.availableProducts)

    return (
        <View style={styles.container}>
            <FlatList
                data={produts}
                keyExtractor={item => item.id}
                renderItem={itemData => <Text>{itemData.item.title}</Text>}
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