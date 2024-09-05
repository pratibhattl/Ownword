import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
const ChangePassword = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const navigation = useNavigation();
    const onSubmit = (data) => {
        setSubmitted(true);
        // Perform your login logic here
        Alert.alert('Login Successful', `Welcome ${data.email}!`);
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
                <Controller
                    control={control}
                    rules={{
                        required: 'New password'
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Text style={styles.label}>New Password*</Text>
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
                <Controller
                    control={control}
                    rules={{
                        required: 'Confirm new password'
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Text style={styles.label}>Confirm new Password*</Text>
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


                <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate(-1)}>
                    <Text style={styles.buttonText}>Update Password</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 35,
        paddingRight: 35,
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
        fontSize: 15
    },

    formWrap: {
        marginBottom: 100,
        // paddingBottom: 100
    },
    input: {
        height: 50,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        color: '#232C3F',
        placeholderTextColor: "#fff",
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
        backgroundColor: '#ffff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
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