import React, { useState , useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { changePasswordApi } from '../apiService/Users';
import  {getData} from "../helper";

const ChangePassword = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [token, setToken] = useState(null)
    const [message, setMessage] = useState(null)
    const navigation = useNavigation();

    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });
    }, [])

    const onSubmit = (data) => {
        setSubmitted(true);
        changePasswordApi(data,token,setMessage,navigation)
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.logo}>LOGO</Text> */}

            <View style={styles.formWrap}>

                <Controller
                    control={control}
                    rules={{
                        required: 'Current password'
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Text style={styles.label}> Current Password*</Text>
                            <TextInput
                                style={[styles.input, submitted && errors.current_password ? styles.isInvalid : null]}
                                // placeholder="Password*"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                // secureTextEntry
                            />
                            {submitted && errors.current_password && (
                                <Text style={styles.errorText}>{errors.current_password.message}</Text>
                            )}
                        </>
                    )}
                    name="current_password"
                />
                <Controller
                    control={control}
                    rules={{
                        required: 'New password'
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Text style={styles.label}>New Password*</Text>
                            <TextInput
                                style={[styles.input, submitted && errors.new_password ? styles.isInvalid : null]}
                                // placeholder="Password*"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                // secureTextEntry
                            />
                            {submitted && errors.new_password && (
                                <Text style={styles.errorText}>{errors.new_password.message}</Text>
                            )}
                        </>
                    )}
                    name="new_password"
                />
                <Controller
                    control={control}
                    rules={{
                        required: 'Confirm new password'
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Text style={styles.label}>Confirm new Password*</Text>
                            <TextInput
                                style={[styles.input, submitted && errors.confirm_password ? styles.isInvalid : null]}
                                // placeholder="Password*"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                // secureTextEntry
                            />
                            {submitted && errors.confirm_password && (
                                <Text style={styles.errorText}>{errors.confirm_password.message}</Text>
                            )}
                        </>
                    )}
                    name="confirm_password"
                />

                    <Text>{message}</Text>
                <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Update Password</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: '#0A142A',
    },

    topLabel: {
        color: '#fff',
        marginBottom: 10,
        fontSize: 25
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
        borderColor: '#fff',
        borderWidth: 0,
        borderRadius: 3,
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

export default ChangePassword;