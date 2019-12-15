import React from "react";
import { 
    View,
    Text,
    FlatList,
    StyleSheet
} from "react-native";

const ProductsOverviewScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>Product Overview</Text>
            <FlatList
            
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ProductsOverviewScreen;