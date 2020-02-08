import React, {useReducer, useCallback} from "react";
import { 
    View,
    KeyboardAvoidingView,
    Button,
    ScrollView,
    StyleSheet
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch } from 'react-redux';

import Input from "../../Molekul/UI/Input";
import Card from "../../Molekul/UI/Card";
import Colors from "../../Template/constants/Colors";
import * as authActions from '../../Template/store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const AuthScreen = (props) => {
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });
    
    const signupHandler = () => {
        dispatch(authActions.signup(
            formState.inputValues.email,
            formState.inputValues.password
        ));
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior="padding"
            keyboardVerticalOffset= {0}
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
                            errorText="Please enter a valid email address."
                            onInputChange={inputChangeHandler}
                            initialValue= ""
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password."
                            secureTextEntry
                            onInputChange={inputChangeHandler}
                            initialValue= ""
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Login"
                                color={Colors.primary}
                                onPress={signupHandler}
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