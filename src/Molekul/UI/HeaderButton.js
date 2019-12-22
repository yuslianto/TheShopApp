import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { HeaderButton } from 'react-navigation-header-buttons';
//import {} from 'rnvi'

import Colors from '../../Template/constants/Colors';

const HeaderButton = (props) => {
    return (
        <View style={styles.container}>
            <Text>componentName</Text>
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

export default HeaderButton;