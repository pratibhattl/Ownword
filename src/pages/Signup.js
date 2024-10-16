import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { userSignUpApi } from '../apiService/AuthApi';
import { useAuth } from '../Context/AppContext';
import { mergeData,storeData } from '../helper';

const Signup = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const navigation = useNavigation();
    const [isLoading,setIsLoading] = useState(false);
    const { setUserDetails, setToken, setIsLoggedin } = useAuth();

    const onSubmit = async (data) => {
        setSubmitted(true);
        try {
            const response = await userSignUpApi(data, setIsLoading);
            setIsLoading(false);
            
            if (response?.data?.status == 201) {
                mergeData('userDetails', response?.data?.user);
                storeData('token', response?.data?.token)
                setUserDetails(response?.data?.user)
                setToken(response?.data?.token)
                setIsLoggedin(true);
                navigation.replace('Home');
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response) {
                Alert.alert(error?.response?.data?.message)
            }
            throw error;
        }
    };


    return (
        <View style={styles.container}>
            {/* <Text style={styles.logo}>LOGO</Text> */}
            <Text style={styles.topLabel}>Let's get started</Text>

            <View style={styles.formWrap}>
                <Controller
                    control={control}
                    rules={{
                        required: 'Enter your name'
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Text style={styles.label}>Name*</Text>
                            <TextInput
                                style={[styles.input, submitted && errors.name ? styles.isInvalid : null]}
                                // placeholder="Password*"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            // secureTextEntry
                            />
                            {submitted && errors.name && (
                                <Text style={styles.errorText}>{errors.name.message}</Text>
                            )}
                        </>
                    )}
                    name="name"
                />
                <Controller
                    control={control}
                    rules={{
                        required: 'Enter your email-id',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Enter a valid email-id'
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Text style={styles.label}>Email Address*</Text>
                            <TextInput
                                style={[styles.input, submitted && errors.email ? styles.isInvalid : null]}
                                // placeholder="Email*"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            {submitted && errors.email && (
                                <Text style={styles.errorText}>{errors.email.message}</Text>
                            )}
                        </>
                    )}
                    name="email"
                />
                <Controller
                    control={control}
                    rules={{
                        required: 'Enter your password'
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Text style={styles.label}>Password*</Text>
                            <TextInput
                                style={[styles.input, submitted && errors.password ? styles.isInvalid : null]}
                                // placeholder="Password*"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry
                            />
                            {submitted && errors.password && (
                                <Text style={styles.errorText}>{errors.password.message}</Text>
                            )}
                        </>
                    )}
                    name="password"
                />

                <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.footer} >
                <Text style={styles.footertext} onPress={() => navigation.navigate('Login')}>Already have an Account? Login</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 24,
        width: '100%',
        backgroundColor: '#0A142A',
        paddingTop: 80,
    },

    topLabel: {
        color: '#fff',
        marginBottom: 32,
        fontSize: 24,
    },
    label: {
        color: '#fff',
        marginBottom: 10,
        fontSize: 14,
        opacity: 0.3,
    },

    formWrap: {
        marginBottom: 100,
        // paddingBottom: 100
    },
    input: {
        height: 50,
        borderColor: '#fff',
        borderWidth: 0,
        borderRadius: 6,
        paddingHorizontal: 10,
        marginBottom: 24,
        color: '#fff',
        placeholderTextColor: "#fff",
        backgroundColor: '#232C3F',
        height: 54,
    },
    isInvalid: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    linkText: {
        color: '#fff',
        textAlign: 'left',
        marginBottom: 15,
    },
    primaryButton: {
        width: '100%',
        backgroundColor: '#20C3D3',
        borderRadius: 6,
        alignItems: 'center',
        marginBottom: 40,
        height: 54,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
        borderColor: '#fff',
        borderWidth: 1,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        lineHeight: 54,
    },
    skipText: {
        alignItems: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 24,
        right: 24,
        width: '100%',
        paddingBottom: 40,
        marginTop: 'auto',
    },
    footertext: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        margin: 0,
    },
});

export default Signup;