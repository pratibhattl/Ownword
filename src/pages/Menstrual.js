import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { getMenstrualApi, addMenstrualApi } from '../apiService/MenstrualApi';
import DateTimePicker from '@react-native-community/datetimepicker'; // For Date Picker
import { getData } from '../helper';


export default function Menstrual() {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState(false)
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [token, setToken] = useState(null)
    const [menstrualList, setMenstrualList] = useState([])
    const [isLoading, setIsLoading] = React.useState(false);
    const navigation = useNavigation();
    const onSubmit = (data) => {
        setSubmitted(true);
        addMenstrualApi(token, data, setMenstrualList, setIsLoading)
    };
    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });
    }, [])

    useEffect(() => {
        getMenstrualApi(token, setMenstrualList, setIsLoading)
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
                        // rules={{ required: 'Select your date of birth' }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Text style={styles.label}>Start date*</Text>
                                <TouchableOpacity
                                    style={[styles.input, errors.start_date ? styles.isInvalid : null]}
                                    onPress={() => setShowDatePicker(true)}
                                >
                                    <Text style={{ color: value ? '#232C3F' : '#fff' }}>
                                        {value ? value.toDateString() : 'Select Date'}
                                    </Text>
                                </TouchableOpacity>
                                {errors.start_date && <Text style={styles.errorText}>{errors.start_date.message}</Text>}
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={value || new Date()}
                                        mode="date"
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            const currentDate = selectedDate || value;
                                            onChange(currentDate);
                                            setShowDatePicker(false)
                                        }}
                                    />
                                )}
                            </>
                        )}
                        name="start_date"
                    />

                    <Controller
                        control={control}
                        // rules={{ required: 'Select your date of birth' }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Text style={styles.label}>End date</Text>
                                <TouchableOpacity
                                    style={[styles.input, errors.end_date ? styles.isInvalid : null]}
                                    onPress={() => setShowEndDatePicker(true)}
                                >
                                    <Text style={{ color: value ? '#232C3F' : '#fff' }}>
                                        {value ? value.toDateString() : 'Select Date'}
                                    </Text>
                                </TouchableOpacity>
                                {errors.end_date && <Text style={styles.errorText}>{errors.end_date.message}</Text>}
                                {showEndDatePicker && (
                                    <DateTimePicker
                                        value={value || new Date()}
                                        mode="date"
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            const currentDate = selectedDate || value;
                                            onChange(currentDate);
                                            setShowEndDatePicker(false)
                                        }}
                                    />
                                )}
                            </>
                        )}
                        name="end_date"
                    />
                    <TouchableOpacity style={styles.secondoryButton} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
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