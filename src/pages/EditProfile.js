import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // For Date Picker
import { Picker } from '@react-native-picker/picker'; // For Gender Picker
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer'
import { getData } from '../helper';
import { userDetailsApi } from "../apiService/Users"
// import edit from "../assets/edit.png"
export default function EditProfile() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [fileResponse, setFileResponse] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false)
    const navigation = useNavigation();
    const [userDetails, setUserDetails] = useState({})
    const [token, setToken] = useState(null)

    useEffect(() => {
        getData('userDetails').then((data) => {
            setUserDetails(data);
        });
        getData('token').then((token) => {
            setToken(token);
        });
    }, [])

    useEffect(() => {
        userDetailsApi(userDetails?._id, token, setUserDetails)
    }, [token])

    const onSubmit = (data) => {
        console.log("sdfsdf", data);

        setSubmitted(true);
        
        // updateUserApi(data);
        Alert.alert('Updated Successful');
    };

    const handleFilePicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setFileResponse(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.log('Unknown Error: ', err);
            }
        }
    };





    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.container1}>
                    {/* <Text style={styles.logo}>LOGO</Text> */}
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.dottedBox} onPress={handleFilePicker}>
                            <Image source={require('../assets/edit.png')} />
                        </TouchableOpacity>
                    </View>
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
                                        value={value ? value : userDetails?.name}

                                    />
                                    {submitted && errors.name && (
                                        <Text style={styles.errorText}>{errors.name.message}</Text>
                                    )}
                                </>
                            )}
                            name="name"
                        />
                        {/* <View style={{display: 'flex', flexDirection:'row',width: '100%'}}>  */}
                        {/* <Controller
                            control={control}
                            // rules={{ required: 'Select your date of birth' }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Text style={styles.label}>Date of Birth*</Text>
                                    <TouchableOpacity
                                        style={[styles.input, errors.dob ? styles.isInvalid : null]}
                                        onPress={() => setShowDatePicker(true)}
                                    >
                                        <Text style={{ color: value ? '#232C3F' : '#fff' }}>
                                            {value ? value.toDateString() : 'Select Date'}
                                        </Text>
                                    </TouchableOpacity>
                                    {errors.dob && <Text style={styles.errorText}>{errors.dob.message}</Text>}
                                    {Platform.OS === 'ios' && (
                                        <DateTimePicker
                                            value={value || new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={(event, selectedDate) => {
                                                const currentDate = selectedDate || value;
                                                onChange(currentDate);
                                            }}
                                        />
                                    )}
                                </>
                            )}
                            name="dob"
                        /> */}
                        <Controller
                            control={control}
                            rules={{ required: 'Select your gender' }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Text style={styles.label}>Gender*</Text>
                                    <View style={[styles.pickerContainer, errors.gender ? styles.isInvalid : null]}>
                                        <Picker
                                            selectedValue={value ? value : userDetails?.gender}
                                            onValueChange={(itemValue) => onChange(itemValue)}
                                            style={styles.picker}
                                        >
                                            <Picker.Item label="Select Gender" value="" />
                                            <Picker.Item label="Male" value="male" />
                                            <Picker.Item label="Female" value="female" />
                                            <Picker.Item label="Other" value="other" />
                                        </Picker>
                                    </View>
                                    {errors.gender && <Text style={styles.errorText}>{errors.gender.message}</Text>}
                                </>
                            )}
                            name="gender"
                        />

                        <Controller
                            control={control}
                            rules={{
                                required: 'Enter your email'
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <Text style={styles.label}>Email*</Text>
                                    <TextInput
                                        style={[styles.input, submitted && errors.email ? styles.isInvalid : null]}
                                        // placeholder="Password*"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value ? value : userDetails?.email}

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
                                required: 'Enter your phone number'
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <Text style={styles.label}>Phone*</Text>
                                    <TextInput
                                        style={[styles.input, submitted && errors.phone ? styles.isInvalid : null]}
                                        // placeholder="Password*"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value ? value : userDetails?.phone}

                                    />
                                    {submitted && errors.phone && (
                                        <Text style={styles.errorText}>{errors.phone.message}</Text>
                                    )}
                                </>
                            )}
                            name="phone"
                        />
                        <Controller
                            control={control}
                            rules={{
                                required: 'Enter your address'
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <Text style={styles.label}>Address*</Text>
                                    <TextInput
                                        style={[styles.input, submitted && errors.address ? styles.isInvalid : null]}
                                        // placeholder="Password*"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value ? value : userDetails?.address}

                                    />
                                    {submitted && errors.address && (
                                        <Text style={styles.errorText}>{errors.address.message}</Text>
                                    )}
                                </>
                            )}
                            name="address"
                        />
                        <Controller
                            control={control}
                            rules={{
                                required: 'Enter your locality'
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <Text style={styles.label}>Locality*</Text>
                                    <TextInput
                                        style={[styles.input, submitted && errors.locality ? styles.isInvalid : null]}
                                        // placeholder="Password*"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}

                                    />
                                    {submitted && errors.locality && (
                                        <Text style={styles.errorText}>{errors.locality.message}</Text>
                                    )}
                                </>
                            )}
                            name="locality"
                        />
                        <Controller
                            control={control}
                            rules={{ required: 'Select your city' }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Text style={styles.label}>City*</Text>
                                    <View style={[styles.pickerContainer, errors.city ? styles.isInvalid : null]}>
                                        <Picker
                                            selectedValue={value ? value : userDetails?.city}
                                            onValueChange={(itemValue) => onChange(itemValue)}
                                            style={styles.picker}
                                        >
                                            <Picker.Item label="Select city" value="" />
                                            <Picker.Item label="Kolkata" value="kolkata" />
                                            <Picker.Item label="Bhuwaneshwar" value="bhuwaneshwar" />
                                            <Picker.Item label="Other" value="other" />
                                        </Picker>
                                    </View>
                                    {errors.city && <Text style={styles.errorText}>{errors.city.message}</Text>}
                                </>
                            )}
                            name="city"
                        />
                        <Controller
                            control={control}
                            rules={{ required: 'Select your state' }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Text style={styles.label}>State*</Text>
                                    <View style={[styles.pickerContainer, errors.state ? styles.isInvalid : null]}>
                                        <Picker
                                            selectedValue={value ? value : userDetails?.state}
                                            onValueChange={(itemValue) => onChange(itemValue)}
                                            style={styles.picker}
                                        >
                                            <Picker.Item label="Select state" value="" />
                                            <Picker.Item label="West Bengal" value="West Bengal" />
                                            <Picker.Item label="Udisa" value="Udisa" />
                                            <Picker.Item label="Other" value="Other" />
                                        </Picker>
                                    </View>
                                    {errors.state && <Text style={styles.errorText}>{errors.state.message}</Text>}
                                </>
                            )}
                            name="state"
                        />
                        <Controller
                            control={control}
                            rules={{
                                required: 'Enter your pin number'
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <Text style={styles.label}>Pin number*</Text>
                                    <TextInput
                                        style={[styles.input, submitted && errors.pinCode ? styles.isInvalid : null]}
                                        // placeholder="Password*"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value ? value : userDetails?.pinCode}

                                    />
                                    {submitted && errors.pinCode && (
                                        <Text style={styles.errorText}>{errors.pinCode.message}</Text>
                                    )}
                                </>
                            )}
                            name="pinCode"
                        />
                        {/* </View> */}
                        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit(onSubmit)}>
                            <Text style={styles.buttonText}>Update details</Text>
                        </TouchableOpacity>

                    </View>


                </View>
            </ScrollView>
            <Footer />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#0A142A'
    },
    textStyle: {
        fontSize: 25,
        color: '#fff'
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 35,
        backgroundColor: '#0A142A',
    },
    dottedBox: {
        width: '20%',
        height: 70,
        borderWidth: 2,
        backgroundColor: '#232C3F',
        borderColor: '#AEAEAE',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    pickerContainer: {
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        justifyContent: 'center',
    },
    picker: {
        color: '#fff',
        backgroundColor: '#232C3F'
        // marginBottom: 15,
    },
    text: {
        fontSize: 16,
        color: '#fff',
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
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'column',
        // width: 100
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
        backgroundColor: '#232C3F',
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