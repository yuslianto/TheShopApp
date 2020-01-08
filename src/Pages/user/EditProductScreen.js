import React, {useState, useEffect, useCallback, useReducer} from "react";
import { 
    View,
    Text,
    TextInput,
    ScrollView,
    Platform,
    Alert,
    StyleSheet
} from "react-native";
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../Molekul/UI/HeaderButton';
import * as productActions from '../../Template/store/actions/products';

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

const EditProductScreen = (props) => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === prodId)
    );

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title :'',
            imageUrl: editedProduct ? editedProduct.imageUrl :'',
            description: editedProduct ? editedProduct.description :'',
            price: ''
        }, 
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        }, 
        formIsValid: editedProduct ? true : false,
    });
    {/*
        const [title, setTitle] = useState(
            editedProduct ? editedProduct.title :''
        );
        const [titleIsValid, setTitleIsValid] = useState(false);
        const [imageUrl, setImageUrl] = useState(
            editedProduct ? editedProduct.imageUrl :''
        );
        const [price, setPrice] = useState('');
        const [description, setDescription] = useState(
            editedProduct ? editedProduct.description :''
        );
    
    */}

    const submitHandler = useCallback(() => {
        //console.warn('Submiting');
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the error in the form.', [
                {
                    text: 'Okay'
                }
            ]);
            return;
        }
        if (editedProduct) {
            dispatch(
                productActions.updateProduct(
                    prodId, 
                    formState.inputValues.title, 
                    formState.inputValues.description, 
                    formState.inputValues.imageUrl
                )
            );
        } else {
            dispatch(
                productActions.createProduct(
                    formState.inputValues.title, 
                    formState.inputValues.description, 
                    formState.inputValues.imageUrl, 
                    +formState.inputValues.price
                )
            );
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    // make useeffect
    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        });
    }, [submitHandler]);

    const textChangeHandler = (inputUdentifier, text) => {
        let isValid = false;
        if (text.trim().length > 0) {
            //setTitleIsValid(false)
            isValid = true;
        }
        //setTitle(text);
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: text,
            isValid: isValid,
            input: inputUdentifier
        });
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formContol}>
                    <Text style={styles.label} >Title</Text>
                    <TextInput 
                        style={styles.input}
                        value={formState.inputValues.title}
                        onChangeText={textChangeHandler.bind(this, 'title')}
                        keyboardType= 'default'
                        autoCapitalize= 'sentences'
                        autoCorrect
                        returnKeyType= 'next'
                        onEndEditing= {() => console.warn('onEndEditing')}
                        onSubmitEditing= {()=> console.warn('onSubmitEditing')}
                    />
                    {!formState.inputValidities.title && <Text>Please enter a valid title!</Text>}
                </View>
                <View style={styles.formContol}>
                    <Text style={styles.label} >Image URL</Text>
                    <TextInput 
                        style={styles.input}
                        value={formState.inputValues.imageUrl}
                        onChangeText={textChangeHandler.bind(this, 'imageUrl')}
                    />
                </View>
                {editedProduct
                    ? null
                    : (
                        <View style={styles.formContol}>
                            <Text style={styles.label} >Price</Text>
                            <TextInput 
                                style={styles.input}
                                value={formState.inputValues.price}
                                onChangeText={textChangeHandler.bind(this, 'price')}
                                keyboardType='decimal-pad'
                            />
                        </View>
                    )
                }
                <View style={styles.formContol}>
                    <Text style={styles.label} >Description</Text>
                    <TextInput 
                        style={styles.input}
                        value={formState.inputValues.description}
                        onChangeText={textChangeHandler.bind(this, 'description')}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add Product',
        headerRight: (
            <HeaderButtons HeaderButtonComponent= {HeaderButton}>
                <Item
                    title= "Save"
                    iconName= {
                        Platform.OS === 'android' ? "md-checkmark" : "ios-checkmark"
                    }
                    onPress={submitFn}
                />
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formContol: {
        width: '100%'
    },
    label: {
        fontFamily: 'Roboto-BOld',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen;