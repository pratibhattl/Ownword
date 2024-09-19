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
    const [timeValue, setTimeValue] = useState( new Date())
    const [open, setOpen] = useState(false)


    const navigation = useNavigation();

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

        addMedicineApi(token, details, Alert, setMedicationList, setIsLoading)

    };



    if (isLoading) {
        return <LoadingScreen />;
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.formWrap}>
                    <View>
                        <Text style={styles.label}>Start Time*</Text>
                        <Text style={styles.label}>{details?.start_time}</Text>
                        <Button title="Open" onPress={() => setOpen(true)} />

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
                                        start_time: Moment(date).format("HH:MMA")
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

                    <Text style={styles.label}>Medicine name*</Text>
                    <TextInput
                        name='medicine_name'
                        style={styles.input}
                        onChangeText={(e) => setDetails({
                            ...details,
                            medicine_name: e
                        })}
                        // value={details?.name ? String(details?.name) : null}
                        keyboardType="name"
                        autoCapitalize="none"
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
                    <TouchableOpacity style={styles.secondoryButton} onPress={() => onSubmit()}>
                        <Text style={styles.buttonText}>Add Medicine</Text>
                    </TouchableOpacity>
                    {medicationList?.map((x) => {
                        return (
                            <View style={styles.cardMain}>
                                <Pressable >
                                    <View style={styles.cardContainer}><Image source={require('../assets/donationIcon.png')}
                                        style={styles.cardImage} />
                                        <Text style={styles.cardText}>{x.medicine_name}</Text>
                                    </View>
                                    <View >
                                        <Text style={styles.cardText}>{x.medicine_time}</Text>
                                        <Text style={styles.cardText}>{x.start_time}</Text>
                                        <Text style={styles.cardText}>{x.end_time}</Text>
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
    cardMain: {
        with: '100%',
        flexDirection: 'column',
        alignItems: 'end',
        padding: 10,
        backgroundColor: '#232C3F',
        borderRadius: 8,
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        marginRight: 10,
        marginLeft: 10
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '52%'
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 10,
    },
    cardText: {
        color: 'white',
        fontSize: 12,
    },
    cardText1: {
        fontSize: 16,
        color: '#fff',
    },
    formWrap: {
        padding: 10,
        marginBottom: 100,
    },
    input: {
        // width: '60%',
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
    buttonText: {
        color: '#000',
        fontSize: 16,
    },
})