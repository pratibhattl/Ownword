import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For Gender Picker
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer'
import { getData, mergeData } from '../helper';
import { userDetailsApi, getCountryApi, getStateApi, updateUserApi } from "../apiService/Users"
import DocumentPicker from 'react-native-document-picker';
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'
import Moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import { useAuth } from '../Context/AppContext';
// import edit from "../assets/edit.png"
export default function EditProfile() {
    const { control, formState: { errors } } = useForm();
    const [fileResponse, setFileResponse] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false)
    const navigation = useNavigation();
    const [address, setAddress] = useState(null)
    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])
    const [dob, setDob] = useState(new Date())
    const [isLoading, setIsLoading] = React.useState(false);
    const isFocused = useIsFocused();
    const { setUserDetails, userDetails, setToken, token } = useAuth()
    const [details, setDetails] = useState({})
    useEffect(() => {
        getData('userDetails').then((data) => {            
            setAddress(data?.address?.address)
            onCountrySelect(data?.address?.country)
            setDetails(data);
            setUserDetails(data)
        });

    }, [])
    const getUserDetailsFunc = async () => {
        try {
            const response = await userDetailsApi(details?._id, token, setIsLoading)
            setIsLoading(false);
            if (response?.data?.status == 200) {
                mergeData('userDetails', response?.data?.user);
                setDetails(response?.data?.user);
                setUserDetails(response?.data?.user)
            }
        }
        catch (error) {
            setIsLoading(false);
            if (error.response) {
                alert(error?.response?.data?.error?.message)
            }
            throw error;
        }
    }

    useEffect(() => {
        if (isFocused, details?._id) {
            getUserDetailsFunc();
            getCountryApi(token, setCountryList);
        }
    }, [isFocused, details?._id]);


    const onCountrySelect = (country) => {
        getStateApi(token, country, setStateList)
    }

    const onSubmit = async () => {
        var formData = new FormData();
        formData.append('image', details?.profile_img)
        formData.append('name', details?.name)
        formData.append('email', details?.email)
        formData.append('phone', details?.phone)
        formData.append('gender', details?.gender)
        formData.append('dob', details?.dob)
        formData.append('address', address)
        formData.append('location', details?.location ? details?.location : details?.address?.location)
        formData.append('state', details?.state ? details?.state : details?.address?.state)
        formData.append('country', details?.country ? details?.country : details?.address?.country)
        formData.append('pincode', details?.pincode ? details?.pincode : details?.address?.pincode)
        try {
            const response = await updateUserApi(token, formData, setIsLoading);            
            setIsLoading(false)
            if (response?.data?.status == 200) {
                mergeData('userDetails', response?.data?.user);
                setUserDetails(response?.data?.user);
                getUserDetailsFunc()
                alert(' Profile Updated Successfully');
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response) {
                alert(error?.response?.data?.error?.message)
            }
            throw error;
        }
    };

    const handleFilePicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setFileResponse(res[0]);

            setDetails({
                ...details,
                profile_img: res[0]
            })
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
                            {fileResponse?.uri ?
                                <Image style={styles.imageStyle} source={{ uri: fileResponse?.uri }} />
                                :
                                <Image style={styles.imageStyle} source={{ uri: String(details?.profile_img) }} />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formWrap}>

                        <Text style={styles.label}>Name*</Text>
                        <TextInput
                            style={styles.input}
                            // style={[styles.input, submitted && errors.name ? styles.isInvalid : null]}
                            // placeholder="Password*"
                            onChangeText={(e) => setDetails({
                                ...details,
                                name: e ? e : details?.name
                            })}
                            defaultValue={details?.name}

                        />

                        {/* <View style={{display: 'flex', flexDirection:'row',width: '100%'}}>  */}

                        <Text style={styles.label}>Select Date of Birth*</Text>
                        <View style={styles.datepicker}>
                            <Text style={styles.datevalue}>
                                {details?.dob ? String(details?.dob) : ''}
                            </Text>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button}>
                                <Image source={require('../assets/calendar.png')} style={styles.image} />
                            </TouchableOpacity>
                        </View>
                        {/* {errors.dob && <Text style={styles.errorText}>{errors.dob.message}</Text>} */}
                        {showDatePicker && (

                            <DatePicker
                                modal
                                mode={"date"}
                                open={showDatePicker}
                                date={dob}
                                onConfirm={(date) => {
                                    setDob(date)
                                    setDetails({
                                        ...details,
                                        dob: Moment(date).format('DD/MM/YYYY')
                                    })
                                    setShowDatePicker(false)
                                }}
                                onCancel={() => {
                                    setShowDatePicker(false)
                                }}
                            />
                        )}

                        <Controller
                            control={control}
                            defaultValue={details?.gender}
                            rules={{ required: 'Select your country' }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Text style={styles.label}>Gender*</Text>
                                    <View
                                        // style={[styles.pickerContainer, errors.gender ? styles.isInvalid : null]}
                                        style={styles.pickerContainer}
                                    >
                                        <Picker
                                            selectedValue={value ? value : details?.gender}
                                            onValueChange={(itemValue) => {
                                                onChange(itemValue);
                                                setDetails({
                                                    ...details,
                                                    gender: itemValue ? itemValue : details?.gender
                                                })
                                            }}
                                            style={styles.picker}
                                        >
                                            <Picker.Item label="Select Gender" value="" />
                                            <Picker.Item label="Male" value="male" />
                                            <Picker.Item label="Female" value="female" />
                                            <Picker.Item label="Other" value="other" />
                                        </Picker>
                                    </View>

                                </>
                            )}
                            name="country"
                        />
                        <Text style={styles.label}>Email*</Text>
                        <TextInput
                            style={styles.input}
                            // style={[styles.input, submitted && errors.email ? styles.isInvalid : null]}
                            // placeholder="Password*"
                            onChangeText={(e) => setDetails({
                                ...details,
                                email: e ? e : details?.email
                            })}
                            defaultValue={details?.email}

                        />
                        {/* {submitted && errors.email && (
                                        <Text style={styles.errorText}>{errors.email.message}</Text>
                                    )} */}


                        <Text style={styles.label}>Phone*</Text>
                        <TextInput
                            style={styles.input}
                            // style={[styles.input, submitted && errors.phone ? styles.isInvalid : null]}
                            // placeholder="Password*"
                            onChangeText={(e) => setDetails({
                                ...details,
                                phone: e ? e : details?.phone
                            })}
                            defaultValue={details?.phone}

                        />
                        {/* {submitted && errors.phone && (
                                        <Text style={styles.errorText}>{errors.phone.message}</Text>
                                    )} */}


                        <Text style={styles.label}>Address*</Text>
                        <TextInput
                            style={styles.input}
                            // style={[styles.input, submitted && errors.address ? styles.isInvalid : null]}
                            // placeholder="Password*"
                            onChangeText={(e) => setAddress(e)}
                            defaultValue={address}

                        />
                        {/* {submitted && errors.address && (
                                        <Text style={styles.errorText}>{errors.address.message}</Text>
                                    )} */}


                        <Text style={styles.label}>Location*</Text>
                        <TextInput
                            // style={[styles.input, submitted && errors.location ? styles.isInvalid : null]}
                            // placeholder="Password*"
                            style={styles.input}
                            onChangeText={(e) => setDetails({
                                ...details,
                                location: e ? e : details?.location
                            })}
                            defaultValue={details?.address?.location}

                        />
                        {/* {submitted && errors.location && (
                                        <Text style={styles.errorText}>{errors.location.message}</Text>
                                    )} */}

                        <Controller
                            control={control}
                            defaultValue={details?.address?.country}
                            rules={{ required: 'Select your country' }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Text style={styles.label}>Country*</Text>
                                    <View
                                        // style={[styles.pickerContainer, errors.country ? styles.isInvalid : null]}
                                        style={styles.pickerContainer}
                                    >
                                        <Picker
                                            selectedValue={value ? value : details?.address?.country}
                                            onValueChange={(itemValue) => {
                                                onChange(itemValue);
                                                onCountrySelect(itemValue);
                                                setDetails({
                                                    ...details,
                                                    country: itemValue ? itemValue : details?.country
                                                })
                                            }}
                                            style={styles.picker}
                                        >
                                            <Picker.Item label="Select country" value="" />
                                            {countryList?.length > 0 && countryList?.map((x) => {
                                                return (
                                                    <Picker.Item label={x?.country} value={x?.country} />
                                                )
                                            })}
                                        </Picker>

                                    </View>
                                    {/* {errors.country && <Text style={styles.errorText}>{errors.country.message}</Text>} */}
                                </>
                            )}
                            name="country"
                        />
                        <Controller
                            control={control}
                            defaultValue={details?.address?.state}
                            rules={{ required: 'Select your state' }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Text style={styles.label}>State*</Text>
                                    <View
                                        // style={[styles.pickerContainer, errors.state ? styles.isInvalid : null]}
                                        style={styles.pickerContainer}
                                    >
                                        <Picker
                                            selectedValue={value ? value : details?.address?.state}
                                            onValueChange={(itemValue) => {
                                                onChange(itemValue);
                                                setDetails({
                                                    ...details,
                                                    state: itemValue ? itemValue : details?.state
                                                })
                                            }
                                            }
                                            style={styles.picker}
                                        >
                                            <Picker.Item label="Select state" value="" />
                                            {stateList?.length > 0 && stateList?.map((x) => {
                                                return (
                                                    <Picker.Item label={x} value={x} />
                                                )
                                            })}
                                        </Picker>
                                    </View>
                                    {/* {errors.state && <Text style={styles.errorText}>{errors.state.message}</Text>} */}
                                </>
                            )}
                            name="state"
                        />


                        <Text style={styles.label}>Pin number*</Text>
                        <TextInput
                            // style={[styles.input, submitted && errors.pincode ? styles.isInvalid : null]}
                            // placeholder="Password*"
                            style={styles.input}
                            onChangeText={(e) => setDetails({
                                ...details,
                                pincode: e ? e : details?.pincode
                            })}
                            defaultValue={details?.address?.pincode}

                        />
                        {/* {submitted && errors.pincode && (
                                        <Text style={styles.errorText}>{errors.pincode.message}</Text>
                                    )} */}

                        {/* </View> */}


                    </View>
                    <TouchableOpacity style={styles.primaryButton} onPress={() => onSubmit()}>
                        <Text style={styles.buttonText}>Update details</Text>
                    </TouchableOpacity>

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
    imageStyle: {
        height: 100,
        width: 100
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 24,
        paddingRight: 24,
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
        marginBottom: 15,
        justifyContent: 'center',
        borderRadius: 3,
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
    datepicker: {
        backgroundColor: '#232C3F',
        height: 54,
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
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
    datevalue: {
        color: '#fff',
        fontSize: 16,
    },

});