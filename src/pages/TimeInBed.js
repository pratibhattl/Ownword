import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { getTimeInBedApi, addBedTimeApi } from '../apiService/SleepTrackerApi';
import { getData, mergeData } from '../helper';
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'
import Moment from 'moment';

export default function TimeInBed() {

    const { control, handleSubmit, reset, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [token, setToken] = useState(null)
    const [bedTimeList, setBedTimeList] = useState({})
    const [isLoading, setIsLoading] = React.useState(false);
    const [asleepStartDate, setasleepStartDate] = useState(new Date())
    const [asleepStartTime, setasleepStartTime] = useState(new Date())
    const [showasleepStartDate, setShowasleepStartDate] = useState(false)
    const [showasleepStartTime, setShowasleepStartTime] = useState(false)
    const [inBedStartDate, setinBedStartDate] = useState(new Date())
    const [inBedStartTime, setInBedStartTime] = useState(new Date())
    const [showStartBedTime, setShowStartBedTime] = useState(false)
    const [showinBedStartDate, setShowinBedStartDate] = useState(false);
    const navigation = useNavigation();

    const onSubmit = (data) => {        
        setSubmitted(true);
        addBedTimeApi(token, data, navigation, setIsLoading);
        reset();

    };
    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });
    }, [])

    useEffect(() => {
        getTimeInBedApi(token, setBedTimeList, setIsLoading,navigation);
    }, [token])


    if (isLoading) {
        return <LoadingScreen />;
    }


    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={styles.formWrap}>

                    <Controller
                        control={control}
                        rules={{ required: 'Select Start Bed Time' }}
                        defaultValue={String(Moment(inBedStartTime).format('HH:MMA'))}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Text style={styles.label}>Start Bed Time*</Text>
                                <Text style={styles.label}>{String(Moment(inBedStartTime).format('HH:MM A'))}</Text>
                                <Button title="Open" onPress={() => setShowStartBedTime(true)} />
                                {errors.inBedStartTime && <Text style={styles.errorText}>{errors.inBedStartTime.message}</Text>}
                                {showStartBedTime && (

                                    <DatePicker
                                        modal
                                        mode={"time"}
                                        open={showStartBedTime}
                                        date={inBedStartTime}
                                        onConfirm={(date) => {
                                            onChange(Moment(date).format('HH:MMA'));
                                            setInBedStartTime(date)
                                            setShowStartBedTime(false)
                                        }}
                                        onCancel={() => {
                                            setShowStartBedTime(false)
                                        }}
                                    />
                                )}
                            </>
                        )}
                        name="inBedStartTime"
                    />
                    <Controller
                        control={control}
                        rules={{ required: 'Select start bed date' }}
                        defaultValue={String(Moment(inBedStartDate).format('DD/MM/YYYY'))}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Text style={styles.label}>Start Bed Date*</Text>
                                <Text style={styles.label}>{String(Moment(inBedStartDate).format('DD/MM/YYYY'))}</Text>
                                <Button title="Open" onPress={() => setShowinBedStartDate(true)} />
                                {errors.inBedStartDate && <Text style={styles.errorText}>{errors.inBedStartDate.message}</Text>}
                                {showinBedStartDate && (

                                    <DatePicker
                                        modal
                                        mode={"date"}
                                        open={showinBedStartDate}
                                        date={inBedStartDate}
                                        onConfirm={(date) => {
                                            onChange(Moment(date).format('DD/MM/YYYY'));
                                            setinBedStartDate(date)
                                            setShowinBedStartDate(false)
                                        }}
                                        onCancel={() => {
                                            setShowinBedStartDate(false)
                                        }}
                                    />
                                )}
                            </>
                        )}
                        name="inBedStartDate"
                    />

                    <Controller
                        control={control}
                        rules={{ required: 'Select start time' }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Text style={styles.label}>Start Asleep Time*</Text>
                                <Text style={styles.label}>{String(Moment(asleepStartTime).format('HH:MM A'))}</Text>
                                <Button title="Open" onPress={() => setShowasleepStartTime(true)} />
                                {errors.asleepStartTime && <Text style={styles.errorText}>{errors.asleepStartTime.message}</Text>}
                                {showasleepStartTime && (
                                    <DatePicker
                                        modal
                                        mode={"time"}
                                        open={showasleepStartTime}
                                        date={asleepStartTime}
                                        onConfirm={(date) => {
                                            onChange(Moment(date).format('HH:MM A'));
                                            setasleepStartTime(date)
                                            setShowasleepStartTime(false)
                                        }}
                                        onCancel={() => {
                                            setShowasleepStartTime(false)
                                        }}
                                    />
                                )}
                            </>
                        )}
                        name="asleepStartTime"
                    />
                    <Controller
                        control={control}
                        rules={{ required: 'Select start date' }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Text style={styles.label}>Start Asleep Date*</Text>
                                <Text style={styles.label}>{String(Moment(asleepStartDate).format('DD/MM/YYYY'))}</Text>
                                <Button title="Open" onPress={() => setShowasleepStartDate(true)} />
                                {errors.asleepStartDate && <Text style={styles.errorText}>{errors.asleepStartDate.message}</Text>}
                                {showasleepStartDate && (

                                    <DatePicker
                                        modal
                                        mode={"date"}
                                        open={showasleepStartDate}
                                        date={asleepStartDate}
                                        onConfirm={(date) => {
                                            onChange(Moment(date).format('DD/MM/YYYY'));
                                            setasleepStartDate(date)
                                            setShowasleepStartDate(false)
                                        }}
                                        onCancel={() => {
                                            setShowasleepStartDate(false)
                                        }}
                                    />
                                )}
                            </>
                        )}
                        name="asleepStartDate"
                    />

                </View>
                <TouchableOpacity style={styles.arrowButton} onPress={handleSubmit(onSubmit)} >
                    <Image style={styles.arrowStyle} source={require('../assets/right-arrow.jpg')} />
                </TouchableOpacity>
            </ScrollView>

            <Footer />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#0A142A',
    },
    arrowStyle: {
        fontSize: 20,
        height: 50,
        width: 50
    },
    arrowButton: {
        alignItems: 'flex-end',
        padding: 20
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

    buttonText: {
        color: '#000',
        fontSize: 16,
    },
})