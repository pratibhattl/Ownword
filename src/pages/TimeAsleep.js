import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { updateBedTimeApi } from '../apiService/SleepTrackerApi';
import { getData } from '../helper';
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'
import Moment from 'moment';

export default function TimeAsleep({ route }) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = React.useState(false);
    const [asleepEndDate, setasleepEndDate] = useState(new Date())
    const [asleepEndTime, setasleepEndTime] = useState(new Date())
    const [showasleepEndDate, setShowasleepEndDate] = useState(false)
    const [showasleepEndTime, setShowasleepEndTime] = useState(false)
    const [inBedEndDate, setinBedEndDate] = useState(new Date())
    const [inBedEndTime, setinBedEndTime] = useState(new Date())
    const [showinBedEndTime, setShowinBedEndTime] = useState(false)
    const [showinBedEndDate, setShowinBedEndDate] = useState(false)
    const navigation = useNavigation();

    const onSubmit = (data) => {
        setSubmitted(true);
        updateBedTimeApi(token, data, setIsLoading, navigation);
        reset();
    }

    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });

    }, [])


    if (isLoading) {
        return <LoadingScreen />;
    }


    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={styles.formWrap}>
                    <Controller
                        control={control}
                        rules={{ required: 'Select asleep end time' }}
                        defaultValue={String(Moment(asleepEndTime).format('HH:MM A'))}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Text style={styles.inputlabel}>Asleep End Time*</Text>
                                <View style={styles.dateblock}>
                                <Text style={styles.datetime}>{String(Moment(asleepEndTime).format('HH:MM A'))}</Text>
                                {/* <Button title="Open" onPress={() => setShowasleepEndTime(true)} /> */}
                                <TouchableOpacity onPress={() => setShowasleepEndTime(true)} style={styles.button}>
                                            <Image source={require('../assets/calendar.png')} style={styles.image} />
                                        </TouchableOpacity>
                                    </View>
                                {errors.asleepEndTime && <Text style={styles.errorText}>{errors.asleepEndTime.message}</Text>}
                                {showasleepEndTime && (
                                    <DatePicker
                                        modal
                                        mode={"time"}
                                        open={showasleepEndTime}
                                        date={asleepEndTime}
                                        onConfirm={(date) => {
                                            onChange(Moment(date).format('HH:MM A'));
                                            setasleepEndTime(date)
                                            setShowasleepEndTime(false)
                                        }}
                                        onCancel={() => {
                                            setShowasleepEndTime(false)
                                        }}
                                    />
                                )}
                            </>
                        )}
                        name="asleepEndTime"
                    />
                    <Controller
                        control={control}
                        rules={{ required: 'Select asleep end date' }}
                        defaultValue={String(Moment(asleepEndDate).format('DD/MM/YYYY'))}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Text style={styles.inputlabel}>Asleep End Date*</Text>
                                <View style={styles.dateblock}>
                                <Text style={styles.datetime}>{String(Moment(asleepEndDate).format('DD/MM/YYYY'))}</Text>
                                {/* <Button title="Open" onPress={() => setShowasleepEndDate(true)} /> */}
                                <TouchableOpacity onPress={() => setShowasleepEndDate(true)} style={styles.button}>
                                            <Image source={require('../assets/calendar.png')} style={styles.image} />
                                        </TouchableOpacity>
                                    </View>
                                {errors.asleepEndDate && <Text style={styles.errorText}>{errors.asleepEndDate.message}</Text>}
                                {showasleepEndDate && (

                                    <DatePicker
                                        modal
                                        mode={"date"}
                                        open={showasleepEndDate}
                                        date={asleepEndDate}
                                        onConfirm={(date) => {
                                            onChange(Moment(date).format('DD/MM/YYYY'));
                                            setasleepEndDate(date)
                                            setShowasleepEndDate(false)
                                        }}
                                        onCancel={() => {
                                            setShowasleepEndDate(false)
                                        }}
                                    />
                                )}
                            </>
                        )}
                        name="asleepEndDate"
                    />
                    <Controller
                        control={control}
                        rules={{ required: 'Select bed end time' }}
                        defaultValue={String(Moment(inBedEndTime).format('HH:MMA'))}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Text style={styles.inputlabel}>Bed End time*</Text>
                                <View style={styles.dateblock}>
                                <Text style={styles.datetime}>{String(Moment(inBedEndTime).format('HH:MM A'))}</Text>
                                {/* <Button title="Open" onPress={() => setShowinBedEndTime(true)} /> */}
                                <TouchableOpacity onPress={() => setShowinBedEndTime(true)} style={styles.button}>
                                            <Image source={require('../assets/calendar.png')} style={styles.image} />
                                        </TouchableOpacity>
                                    </View>
                                {errors.inBedEndTime && <Text style={styles.errorText}>{errors.inBedEndTime.message}</Text>}
                                {showinBedEndTime && (

                                    <DatePicker
                                        modal
                                        mode={"time"}
                                        open={showinBedEndTime}
                                        date={inBedEndTime}
                                        onConfirm={(date) => {
                                            onChange(Moment(date).format('HH:MMA'));
                                            setinBedEndTime(date)
                                            setShowinBedEndTime(false)
                                        }}
                                        onCancel={() => {
                                            setShowinBedEndTime(false)
                                        }}
                                    />
                                )}
                            </>
                        )}
                        name="inBedEndTime"
                    />
                    <Controller
                        control={control}
                        rules={{ required: 'Select bed end date' }}
                        defaultValue={String(Moment(inBedEndDate).format('DD/MM/YYYY'))}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Text style={styles.inputlabel}>Bed end date*</Text>
                                <View style={styles.dateblock}>
                                <Text style={styles.datetime}>{String(Moment(inBedEndDate).format('DD/MM/YYYY'))}</Text>
                                {/* <Button title="Open" onPress={() => setShowinBedEndDate(true)} /> */}
                                <TouchableOpacity onPress={() => setShowinBedEndDate(true)} style={styles.button}>
                                            <Image source={require('../assets/calendar.png')} style={styles.image} />
                                        </TouchableOpacity>
                                    </View>
                                {errors.inBedEndDate && <Text style={styles.errorText}>{errors.inBedEndDate.message}</Text>}
                                {showinBedEndDate && (

                                    <DatePicker
                                        modal
                                        mode={"date"}
                                        open={showinBedEndDate}
                                        date={inBedEndDate}
                                        onConfirm={(date) => {
                                            onChange(Moment(date).format('DD/MM/YYYY'));
                                            setinBedEndDate(date)
                                            setShowinBedEndDate(false)
                                        }}
                                        onCancel={() => {
                                            setShowinBedEndDate(false)
                                        }}
                                    />
                                )}
                            </>
                        )}
                        name="inBedEndDate"
                    />



                </View>
                
            </ScrollView>
            <TouchableOpacity style={styles.arrowButton} onPress={handleSubmit(onSubmit)} >
            <Image style={styles.arrowStyle} source={require('../assets/arrow-right.png')} />
                </TouchableOpacity>
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
        height: 24,
        width: 24,
        backgroundColor: '#20C3D3',
        borderRadius: 6,
    },
    wrapper: {
        paddingHorizontal: 16,
    },
    arrowButton: {
        height: 54,
        width: 54,
        backgroundColor: '#20C3D3',
        borderRadius: 6,
        padding: 15,
        margin: 16,
        marginLeft: 'auto',
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
})