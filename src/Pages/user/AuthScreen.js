import React from "react";
import { 
    View,
    Text,
    KeyboardAvoidingView,
    Button,
    ScrollView,
    StyleSheet
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import Input from "../../Molekul/UI/Input";
import Card from "../../Molekul/UI/Card";
import Colors from "../../Template/constants/Colors";

const AuthScreen = (props) => {
    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior="padding"
            keyboardVerticalOffset= {50}
        >
            <LinearGradient colors={['#ffedff', '#ffe3ff']}
                style={styles.gradient}
            >
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage="Please enter a valid email address."
                            onInputChange={() => {}}
                            initialVzalue= ""
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorMessage="Please enter a valid password."
                            secureTextEntry
                            onInputChange={() => {}}
                            initialVzalue= ""
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Login"
                                color={Colors.primary}
                                onPress={() => {}}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Switch to Sign Up"
                                color={Colors.accent}
                                onPress={() => {}}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authContainer: {
        padding: 20,
        maxHeight: 400,
        maxWidth: 400,
        width: '80%'
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen;