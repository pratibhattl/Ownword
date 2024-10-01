import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For Gender Picker
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer'
import { getData } from '../helper';
import { userDetailsApi, getCountryApi, getStateApi, updateUserApi } from "../apiService/Users"
import DocumentPicker from 'react-native-document-picker';
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'
import Moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
// import edit from "../assets/edit.png"
export default function EditProfile() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [fileResponse, setFileResponse] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false)
    const navigation = useNavigation();
    const [userDetails, setUserDetails] = useState({})
    const [token, setToken] = useState(null)
    const [address, setAddress] = useState(null)
    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])
    const [dob, setDob] = useState(new Date())
    const [isLoading, setIsLoading] = React.useState(false);
    const isFocused = useIsFocused();
    useEffect(() => {
        getData('userDetails').then((data) => {
            setUserDetails(data);
            setAddress(data?.address?.address)
            onCountrySelect(data?.address?.country)
        });
        getData('token').then((token) => {
            setToken(token);
        });
    }, [])

    useEffect(() => {
        if (isFocused) {
            userDetailsApi(userDetails?._id, token, setUserDetails,setIsLoading)
            getCountryApi(token, setCountryList)
        }
      }, [isFocused]);
  

    const onCountrySelect = (country) => {
        getStateApi(token, country, setStateList)
    }

    const onSubmit = () => {
        var formData = new FormData();
        formData.append('image', userDetails?.profile_img)
        formData.append('name', userDetails?.name)
        formData.append('email', userDetails?.email)
        formData.append('phone', userDetails?.phone)
        formData.append('gender', userDetails?.gender)
        formData.append('dob', userDetails?.dob)
        formData.append('address', address)
        formData.append('location', userDetails?.location ? userDetails?.location : userDetails?.address?.location)
        formData.append('state', userDetails?.state ? userDetails?.state : userDetails?.address?.state)
        formData.append('country', userDetails?.country ? userDetails?.country : userDetails?.address?.country)
        formData.append('pincode', userDetails?.pincode ? userDetails?.pincode : userDetails?.address?.pincode)
        
        updateUserApi(token, formData, navigation,setUserDetails,setIsLoading);  // Ensure updateUserApi is defined
    };

    const handleFilePicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setFileResponse(res[0]);

            setUserDetails({
                ...userDetails,
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
                                <Image style={styles.imageStyle} source={{ uri: String(userDetails?.profile_img) }} />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formWrap}>

                        <Text style={styles.label}>Name*</Text>
                        <TextInput
                            style={styles.input}
                            // style={[styles.input, submitted && errors.name ? styles.isInvalid : null]}
                            // placeholder="Password*"
                            onChangeText={(e) => setUserDetails({
                                ...userDetails,
                                name: e ? e : userDetails?.name
                            })}
                            defaultValue={userDetails?.name}

                        />

                        {/* <View style={{display: 'flex', flexDirection:'row',width: '100%'}}>  */}

                        <Text style={styles.label}>Select Date of Birth*</Text>
                        <View style={styles.datepicker}>
                            <Text style={styles.datevalue}>
                                {String(userDetails?.dob)}
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
                                    setUserDetails({
                                        ...userDetails,
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
                            defaultValue={userDetails?.gender}
                            rules={{ required: 'Select your country' }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Text style={styles.label}>Gender*</Text>
                                    <View
                                        // style={[styles.pickerContainer, errors.gender ? styles.isInvalid : null]}
                                        style={styles.pickerContainer}
                                    >
                                        <Picker
                                            selectedValue={value ? value : userDetails?.gender}
                                            onValueChange={(itemValue) => {
                                                onChange(itemValue);
                                                setUserDetails({
                                                    ...userDetails,
                                                    gender: itemValue ? itemValue : userDetails?.gender
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
                            onChangeText={(e) => setUserDetails({
                                ...userDetails,
                                email: e ? e : userDetails?.email
                            })}
                            defaultValue={userDetails?.email}

                        />
                        {/* {submitted && errors.email && (
                                        <Text style={styles.errorText}>{errors.email.message}</Text>
                                    )} */}


                        <Text style={styles.label}>Phone*</Text>
                        <TextInput
                            style={styles.input}
                            // style={[styles.input, submitted && errors.phone ? styles.isInvalid : null]}
                            // placeholder="Password*"
                            onChangeText={(e) => setUserDetails({
                                ...userDetails,
                                phone: e ? e : userDetails?.phone
                            })}
                            defaultValue={userDetails?.phone}

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
                            onChangeText={(e) => setUserDetails({
                                ...userDetails,
                                location: e ? e : userDetails?.location
                            })}
                            defaultValue={userDetails?.address?.location}

                        />
                        {/* {submitted && errors.location && (
                                        <Text style={styles.errorText}>{errors.location.message}</Text>
                                    )} */}

                        <Controller
                            control={control}
                            defaultValue={userDetails?.address?.country}
                            rules={{ required: 'Select your country' }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Text style={styles.label}>Country*</Text>
                                    <View
                                        // style={[styles.pickerContainer, errors.country ? styles.isInvalid : null]}
                                        style={styles.pickerContainer}
                                    >
                                        <Picker
                                            selectedValue={value ? value : userDetails?.address?.country}
                                            onValueChange={(itemValue) => {
                                                onChange(itemValue);
                                                onCountrySelect(itemValue);
                                                setUserDetails({
                                                    ...userDetails,
                                                    country: itemValue ? itemValue : userDetails?.country
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
                            defaultValue={userDetails?.address?.state}
                            rules={{ required: 'Select your state' }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Text style={styles.label}>State*</Text>
                                    <View
                                        // style={[styles.pickerContainer, errors.state ? styles.isInvalid : null]}
                                        style={styles.pickerContainer}
                                    >
                                        <Picker
                                            selectedValue={value ? value : userDetails?.address?.state}
                                            onValueChange={(itemValue) => {
                                                onChange(itemValue);
                                                setUserDetails({
                                                    ...userDetails,
                                                    state: itemValue ? itemValue : userDetails?.state
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
                            onChangeText={(e) => setUserDetails({
                                ...userDetails,
                                pincode: e ? e : userDetails?.pincode
                            })}
                            defaultValue={userDetails?.address?.pincode}

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