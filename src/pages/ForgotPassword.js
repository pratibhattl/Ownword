import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { sendOtpApi } from '../apiService/Users';

const ForgotPassword = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);

    const navigation = useNavigation();
    const onSubmit = (data) => {
        setSubmitted(true);
        sendOtpApi(data,navigation);
        // alert('Login Successful', `Welcome ${data.email}!`);
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.logo}>LOGO</Text> */}
            <Text style={styles.topLabel}>Forgot Password</Text>

            <View style={styles.formWrap}>

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
               
                <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

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
        fontSize: 20,
        lineHeight: 54,
    },
    skipText: {
        alignItems: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        paddingLeft: 35,
        paddingRight: 35,

    },
    footertext: {
        textAlign: 'center',
        color: '#fff',
    },
});

export default ForgotPassword;