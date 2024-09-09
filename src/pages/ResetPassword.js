import React, { useState , useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { resetPasswordApi } from '../apiService/Users';
import { getData } from '../helper';
import LoadingScreen from '../components/LoadingScreen';
const ResetPassword = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState(null)
    const navigation = useNavigation();
    const [email_otp, setEmail_otp] = useState(null)
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        getData('otp').then((otp) => {            
            setEmail_otp(otp);
            setIsLoading(false)
        });
    }, [])

    const onSubmit = (data) => {        
        setSubmitted(true);
        resetPasswordApi(data,setMessage,navigation)
    };

    
    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <View style={styles.container}>
            {/* <Text style={styles.logo}>LOGO</Text> */}

            <View style={styles.formWrap}>

                <Controller
                    control={control}
                    rules={{
                        required: 'otp is required'
                    }}
                    defaultValue={email_otp? email_otp : email_otp} 
                    name="email_otp"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Text style={styles.label}>OTP*</Text>
                            <TextInput
                                style={[styles.input, submitted && errors.email_otp ? styles.isInvalid : null]}
                                // placeholder="Password*"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                // secureTextEntry
                            />
                            {submitted && errors.email_otp && (
                                <Text style={styles.errorText}>{errors.email_otp.message}</Text>
                            )}
                        </>
                    )}
                />
                <Controller
                    control={control}
                    rules={{
                        required: 'Enter New password'
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
                        required: 'Enter Confirm new password'
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
        color: '#fff',
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
    buttonText: {
        color: '#000',
        fontSize: 16,
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

export default ResetPassword;