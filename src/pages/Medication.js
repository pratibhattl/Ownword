import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, Alert, Pressable, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { getData } from '../helper';
import { Picker } from '@react-native-picker/picker';
import { getMedicationApi, addMedicineApi } from '../apiService/MedicationApi';
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'
import Moment from 'moment';
const notificationArr = [{
    imageUrl: require('../assets/donationIcon.png'),
    name: 'Pratibha Thakur',
    title: 'sdfds dsfdsf asdasd asdasd adsd',
    date: '03-09-2024'
},
{
    imageUrl: require('../assets/donationIcon.png'),
    name: 'Pratibha Thakur',
    title: 'sdfds dsfdsf asdasd asdasd adsd',
    date: '03-09-2024'
},
{
    imageUrl: require('../assets/donationIcon.png'),
    name: 'Pratibha Thakur',
    title: 'sdfds dsfdsf asdasd asdasd adsd',
    date: '03-09-2024'
},
]
const daysList = [{
    label: 'Sunday',
    value: 'sun'
},
{
    label: 'Monday',
    value: 'mon'
},
{
    label: 'Tuesday',
    value: 'tue'
},
{
    label: 'Wednessday',
    value: 'wed'
},
{
    label: 'Thursday',
    value: 'thu'
},
{
    label: 'Friday',
    value: 'fri'
},
{
    label: 'Saturday',
    value: 'sat'
},
{
    label: 'Daily',
    value: 'daily'
}]
export default function Medication() {

    const [token, setToken] = useState(null)
    const [medicationList, setMedicationList] = useState([])
    const [isLoading, setIsLoading] = React.useState(false);
    const [details, setDetails] = useState(null);
    const [timeValue, setTimeValue] = useState(new Date())
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });
    }, [])

    useEffect(() => {
        getMedicationApi(token, setMedicationList, setIsLoading)
        setDetails(null)
    }, [token])


    const onSubmit = () => {
        if (details == null || !details?.days || !details?.medicine_name || 
            !details?.medicine_time || !details?.start_time) {
            Alert.alert("Please enter all values !!!")
        } else {            
            addMedicineApi(token, details,setDetails, Alert, setMedicationList, setIsLoading)
        }
    };
    


    if (isLoading) {
        return <LoadingScreen />;
    }


    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper}>
                <View style={styles.formWrap}>
                    <View>
                        <Text style={styles.inputlabel}>Start Time*</Text>
                        <View style={styles.dateblock}>
                            <Text style={styles.datetime}>{details?.start_time}</Text>
                            {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
                            <TouchableOpacity onPress={() => setOpen(true)} style={styles.button}>
                                <Image source={require('../assets/clock.png')} style={styles.image} />
                            </TouchableOpacity>
                        </View>
                        {open &&
                            <DatePicker
                                modal
                                mode="time"
                                open={open}
                                date={timeValue}
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDetails({
                                        ...details,
                                        start_time: Moment(date).format("hh:MM A")
                                    })
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                        }
                    </View>
                    {!details?.start_time && details?.start_time == '' &&
                        <Text style={styles.errorText}>{'Please enter start time'}</Text>}

                    <TextInput
                        name='medicine_name'
                        style={styles.input}
                        onChangeText={(e) => setDetails({
                            ...details,
                            medicine_name: e
                        })}
                        // value={details?.name ? String(details?.name) : null}
                        keyboardType="name"
                        placeholder='Medicine name'
                        autoCapitalize="none"
                        placeholderTextColor='#fff'
                    />
                    {!details?.medicine_name && details?.medicine_name == '' &&
                        <Text style={styles.errorText}>{'Please enter medicine name'}</Text>}

                    <View style={styles.label}>
                        <Picker
                            selectedValue={details?.days}
                            onValueChange={(item) => setDetails({
                                ...details,
                                days: item
                            })}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select day" value={details?.days} />
                            {daysList?.map((x) => {
                                return (
                                    <Picker.Item label={x?.label} value={x.value} />
                                )
                            })}
                        </Picker>
                    </View>
                    <View style={styles.label}>
                        <Picker
                            selectedValue={details?.medicine_time}
                            onValueChange={(item) => setDetails({
                                ...details,
                                medicine_time: item
                            })}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select time" value={details?.medicine_time} />
                            <Picker.Item label={'before food'} value={'before food'} />
                            <Picker.Item label={'after food'} value={'after food'} />
                        </Picker>
                    </View>
                    <TouchableOpacity style={styles.primaryButton} onPress={() => onSubmit()}>
                        <Text style={styles.buttonText}>Add Medicine</Text>
                    </TouchableOpacity>
                    {medicationList?.map((x) => {
                        return (
                            <View style={styles.medbox}>
                                <Pressable style={styles.cardMain}>
                                    <View style={styles.cardContainer}>
                                        <Image source={require('../assets/Frame4.png')}
                                            style={styles.cardImage} />
                                    </View>
                                    <View style={styles.cardContent}>
                                        <Text style={styles.medicine_name}>{x.medicine_name}</Text>
                                        <View style={styles.medicine_timewrap}>
                                            <View style={styles.medicine_timewrap}>
                                                <Text style={styles.medicine_time}>{x.start_time}</Text><Text style={styles.medicine_time}> - </Text><Text style={styles.medicine_time}>{x.end_time}</Text>
                                            </View>
                                            <Text style={styles.medicine_time}>{x.medicine_time}</Text>
                                        </View>

                                    </View>
                                </Pressable>
                            </View>
                        )
                    })}
                </View>

            </ScrollView >

            <Footer />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#0A142A',
    },
    wrapper: {
        paddingHorizontal: 16,
    },
    medbox: {
        marginBottom: 16,
    },
    cardMain: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#232C3F',
        borderRadius: 4,
        padding: 16,
    },
    cardContainer: {
        width: 20,
        marginRight: 10,
    },
    cardContent: {
        flex: 1,
    },
    cardImage: {
        width: 20,
        height: 20,
    },
    cardText: {
        color: 'white',
        fontSize: 12,
    },
    cardText1: {
        fontSize: 16,
        color: '#fff',
    },
    input: {
        // width: '60%',
        height: 44,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 16,
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
    topLabel: {
        color: '#fff',
        marginBottom: 10,
        fontSize: 25
    },
    label: {
        color: '#fff',
        marginBottom: 10,
        fontSize: 20
    },
    primaryButton: {
        width: '100%',
        backgroundColor: '#20C3D3',
        borderRadius: 6,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 40,
        height: 44,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        lineHeight: 44,
    },
    secondoryButton: {
        // width: '30%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        // marginBottom: 15,
    },
    pickerContainer: {
        borderColor: '#fff',
        marginBottom: 16,
        justifyContent: 'center',
        height: 44,
    },
    picker: {
        color: '#fff',
        backgroundColor: '#232C3F',
        marginBottom: 16,
        borderRadius: 4,
        height: 44,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
    },
    dateblock: {
        flexDirection: 'row',
        backgroundColor: '#232C3F',
        borderRadius: 4,
        height: 100,
        alignItems: 'center',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    datetime: {
        fontSize: 40,
        fontWeight: '200',
        color: '#fff',
    },
    inputlabel: {
        fontSize: 24,
        fontWeight: '200',
        color: '#fff',
        marginBottom: 24,
    },
    medicine_name: {
        fontSize: 16,
        color: '#fff',
    },
    medicine_time: {
        fontSize: 14,
        color: '#6C727F',
    },
    medicine_timewrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})