import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { getTimeAsleepApi, addAsleepTimeApi,updateTimeASpleepApi } from '../apiService/SleepTrackerApi';
import { getData } from '../helper';
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'
import Moment from 'moment';

export default function TimeAsleep({route}) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [token, setToken] = useState(null)
    const [asleepTimeList, setAsleepTimeList] = useState({})
    const [isLoading, setIsLoading] = React.useState(false);
    const [startDate, setStartDate] = useState(new Date())
    const [startTime, setStartTime] = useState(new Date())
    const [showStartDate, setShowStartDate] = useState(false)
    const [showStartTime, setShowStartTime] = useState(false)
    const [endDate, setEndDate] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [showEndTime, setShowEndTime] = useState(false)
    const [showEndDate, setShowEndDate] = useState(false)
    const navigation = useNavigation();

    const onSubmit = (data) => {
        setSubmitted(true);
        if ( !asleepTimeList?.endDate) {
            let id = asleepTimeList?._id
            updateTimeASpleepApi(token, data, id, setIsLoading, navigation);
            reset();
        } else {
            addAsleepTimeApi(token, data, navigation, setIsLoading);
            reset();
        }
    }

    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });
       
    }, [])

    useEffect(() => {
        getTimeAsleepApi(token, setAsleepTimeList, setIsLoading)
    }, [token])


    if (isLoading) {
        return <LoadingScreen />;
    }


    return (
        <View style={styles.container}>
            <ScrollView>

                  <View style={styles.formWrap}>
                    { !asleepTimeList?.endDate ?

                        <>
                            <Controller
                                control={control}
                                rules={{ required: 'Select end time' }}
                                defaultValue={String(Moment(endTime).format('HH:MMA'))}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Text style={styles.label}>End time*</Text>
                                        <Text style={styles.label}>{String(Moment(endTime).format('HH:MM A'))}</Text>
                                        <Button title="Open" onPress={() => setShowEndTime(true)} />
                                        {errors.endTime && <Text style={styles.errorText}>{errors.endTime.message}</Text>}
                                        {showEndTime && (

                                            <DatePicker
                                                modal
                                                mode={"time"}
                                                open={showEndTime}
                                                date={endTime}
                                                onConfirm={(date) => {
                                                    onChange(Moment(date).format('HH:MMA'));
                                                    setEndTime(date)
                                                    setShowEndTime(false)
                                                }}
                                                onCancel={() => {
                                                    setShowEndTime(false)
                                                }}
                                            />
                                        )}
                                    </>
                                )}
                                name="endTime"
                            />
                            <Controller
                                control={control}
                                rules={{ required: 'Select end date' }}
                                defaultValue={String(Moment(endDate).format('DD/MM/YYYY'))}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Text style={styles.label}>End date*</Text>
                                        <Text style={styles.label}>{String(Moment(endDate).format('DD/MM/YYYY'))}</Text>
                                        <Button title="Open" onPress={() => setShowEndDate(true)} />
                                        {errors.endDate && <Text style={styles.errorText}>{errors.endDate.message}</Text>}
                                        {showEndDate && (

                                            <DatePicker
                                                modal
                                                mode={"date"}
                                                open={showEndDate}
                                                date={endDate}
                                                onConfirm={(date) => {
                                                    onChange(Moment(date).format('DD/MM/YYYY'));
                                                    setEndDate(date)
                                                    setShowEndDate(false)
                                                }}
                                                onCancel={() => {
                                                    setShowEndDate(false)
                                                }}
                                            />
                                        )}
                                    </>
                                )}
                                name="endDate"
                            />
                        </>
                        :
                        <>
                            <Controller
                                control={control}
                                rules={{ required: 'Select start time' }}
                                defaultValue={String(Moment(startTime).format('HH:MM A'))}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Text style={styles.label}>Start Time*</Text>
                                        <Text style={styles.label}>{String(Moment(startTime).format('HH:MM A'))}</Text>
                                        <Button title="Open" onPress={() => setShowStartTime(true)} />
                                        {errors.startTime && <Text style={styles.errorText}>{errors.startTime.message}</Text>}
                                        {showStartTime && (
                                            <DatePicker
                                                modal
                                                mode={"time"}
                                                open={showStartTime}
                                                date={startTime}
                                                onConfirm={(date) => {
                                                    onChange(Moment(date).format('HH:MM A'));
                                                    setStartTime(date)
                                                    setShowStartTime(false)
                                                }}
                                                onCancel={() => {
                                                    setShowStartTime(false)
                                                }}
                                            />
                                        )}
                                    </>
                                )}
                                name="startTime"
                            />
                            <Controller
                                control={control}
                                rules={{ required: 'Select start date' }}
                                defaultValue={String(Moment(startDate).format('DD/MM/YYYY'))}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Text style={styles.label}>Start Date*</Text>
                                        <Text style={styles.label}>{String(Moment(startDate).format('DD/MM/YYYY'))}</Text>
                                        <Button title="Open" onPress={() => setShowStartDate(true)} />
                                        {errors.startDate && <Text style={styles.errorText}>{errors.startDate.message}</Text>}
                                        {showStartDate && (

                                            <DatePicker
                                                modal
                                                mode={"date"}
                                                open={showStartDate}
                                                date={startDate}
                                                onConfirm={(date) => {
                                                    onChange(Moment(date).format('DD/MM/YYYY'));
                                                    setStartDate(date)
                                                    setShowStartDate(false)
                                                }}
                                                onCancel={() => {
                                                    setShowStartDate(false)
                                                }}
                                            />
                                        )}
                                    </>
                                )}
                                name="startDate"
                            />
                        </>

                    }
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