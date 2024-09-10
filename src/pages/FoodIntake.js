import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'; // For Date Picker
import { getData } from '../helper';


export default function FoodIntake() {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showEndDatePicker, setShowEndDatePicker] = useState(false)
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [token, setToken] = useState(null)
    const [intakeList, setIntakeList] = useState([])
    const [isLoading, setIsLoading] = React.useState(false);
    const navigation = useNavigation();
    const onSubmit = (data) => {
        setSubmitted(true);
        // createWaterIntakeApi(token,data, setIntakeList, setIsLoading)
    };
    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });
    }, [])

    useEffect(() => {
        // getWaterIntakeApi(token, setIntakeList, setIsLoading)
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
                                <Text style={styles.label}>Name*</Text>
                                <TouchableOpacity
                                    style={[styles.input, errors.name ? styles.isInvalid : null]}
                                    onPress={() => setShowDatePicker(true)}
                                />
                            </>
                        )}
                        name="name"
                    />

                    <Controller
                        control={control}
                        // rules={{ required: 'Select your date of birth' }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Text style={styles.label}>Calory Amount</Text>
                                <TouchableOpacity
                                    style={[styles.input, errors.caloryAmount ? styles.isInvalid : null]}
                                    onPress={() => setShowEndDatePicker(true)}
                                />
                            </>
                        )}
                        name="caloryAmount"
                    />

                </View>

            </ScrollView >
            <TouchableOpacity style={styles.secondoryButton} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Submit</Text>
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