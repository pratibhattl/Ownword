import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { getMenstrualApi, addMenstrualApi,updateMenstrualApi } from '../apiService/MenstrualApi';
import { getData } from '../helper';
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'
import Moment from 'moment';
export default function Menstrual() {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState(false)
    const { control, handleSubmit,reset, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [token, setToken] = useState(null)
    const [menstrualList, setMenstrualList] = useState([])

    const [isLoading, setIsLoading] = React.useState(false);
    const navigation = useNavigation();
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const onSubmit = (data) => {
        if(menstrualList[0]?.endMonth == ""){
            let id = menstrualList[0]?._id
            updateMenstrualApi(token, data,id, setMenstrualList, setIsLoading)
        }else{
        setSubmitted(true);
        addMenstrualApi(token, data, setMenstrualList, setIsLoading);
        reset();
    }
    };
    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });
    }, []);

    useEffect(() => {
        getMenstrualApi(token, setMenstrualList, setIsLoading)
    }, [token])

    

    if (isLoading) {
        return <LoadingScreen />;
    }


    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper}>

                <View style={styles.formWrap}>
                    {menstrualList[0]?.endMonth == ""?
                        <>
                            <Controller
                                control={control}
                                rules={{ required: 'Select end date' }}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Text style={styles.inputlabel}>Select end date*</Text>
                                        <View style={styles.dateblock}>
                                        <Text style={styles.datetime}>{String(Moment(endDate).format('DD/MM/YYYY'))}</Text>
                                        {/* <Button title="Open" onPress={() => setShowEndDatePicker(true)} /> */}
                                        <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.button}>
                                            <Image source={require('../assets/calendar.png')} style={styles.image} />
                                        </TouchableOpacity>
                                        </View>
                                        {showEndDatePicker && (
                                            <DatePicker
                                                modal
                                                mode={"date"}
                                                open={showEndDatePicker}
                                                date={endDate}
                                                onConfirm={(date) => {
                                                    setShowEndDatePicker(false)
                                                    setEndDate(date)
                                                    onChange(Moment(date).format('DD/MM/YYYY'))
                                                }}
                                                onCancel={() => {
                                                    setShowEndDatePicker(false)
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
                                rules={{ required: 'Select start date' }}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Text style={styles.inputlabel}>Select start date*</Text>
                                        <View style={styles.dateblock}>
                                        <Text style={styles.datetime}>{String(Moment(startDate).format('DD/MM/YYYY'))}</Text>
                                        {/* <Button title="Open" onPress={() => setShowDatePicker(true)} /> */}
                                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button}>
                                            <Image source={require('../assets/calendar.png')} style={styles.image} />
                                        </TouchableOpacity>
                                        </View>
                                        {showDatePicker && (

                                            <DatePicker
                                                modal
                                                mode={"date"}
                                                open={showDatePicker}
                                                date={startDate}
                                                onConfirm={(date) => {
                                                    setShowDatePicker(false)
                                                    setStartDate(date)
                                                    onChange(Moment(date).format('DD/MM/YYYY'))
                                                }}
                                                onCancel={() => {
                                                    setShowDatePicker(false)
                                                }}
                                            />
                                        )}
                                        {/* {errors.start_date && <Text style={styles.errorText}>{errors.start_date.message}</Text>} */}

                                    </>
                                )}
                                name="startDate"
                            />
                        </>}


                </View>
                <TouchableOpacity style={styles.secondoryButton} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
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