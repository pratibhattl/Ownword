import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { getData } from '../helper';
import { Picker } from '@react-native-picker/picker';
import { getFoodIntakeApi, createFoodIntakeApi, createUserFoodIntakeApi } from '../apiService/IntakeApi';

export default function FoodIntake() {
    const { control, handleSubmit, reset, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [token, setToken] = useState(null)
    const [intakeList, setIntakeList] = useState([])
    const [isLoading, setIsLoading] = React.useState(false);
    const [details, setDetails] = useState(null);
    const [showText, setShowText] = useState(false)
    const navigation = useNavigation();

    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });
    }, [])

    useEffect(() => {
        getFoodIntakeApi(token, setIntakeList, setIsLoading)
    }, [token])

    const onChange = (e) => {
        let obj = {}
        if (e === 'others') {
            setShowText(true)

        } else {
            setShowText(false)
            let arr = intakeList.find((item) => item._id === e)
            obj.name = e,
                obj.caloryAmount = arr?.caloryAmount
        }
        setDetails(obj)

    }
    const onTextChangeFunc = (e) => {
        setDetails({
            ...details,
            name: e,
        })
    }

    const onCaloryChangeFunc = (e) => {
        setDetails({
            ...details,
            caloryAmount: e,
        })
    }
    const onSubmit = () => {
        // setSubmitted(true);
        if (details == null) {
            Alert.alert("Please select a food !!")
        }
        else {
            console.log(details, "detailssss");
            if (showText) {
                if (!details?.caloryAmount && !details?.fatAmount &&
                    !details?.name && !details?.proteinAmount) {
                    Alert.alert("Please enter all values !!")
                }
                else {
                    createFoodIntakeApi(token, details, Alert, setIsLoading, setDetails)
                    reset();
                    setShowText(false)
                }
            }

            else {
                if(details == {}){
                    Alert.alert("Please select a food !!")
                }else{
                createUserFoodIntakeApi(token, details, Alert, setIsLoading, setDetails)
                reset();
                setShowText(false);
                }
            }
        }
    };







    if (isLoading) {
        return <LoadingScreen />;
    }


    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={styles.formWrap}>

                    <Text style={styles.label}>Name*</Text>
                    <View>
                        <Picker
                            selectedValue={details?.name}
                            onValueChange={(item) => onChange(item)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select name" value={details?.name} />
                            {intakeList?.length > 0 && intakeList?.map((x) => {
                                return (
                                    <Picker.Item label={x?.foodName} value={x?._id} />
                                )
                            })}
                            <Picker.Item label={'Others'} value={'others'} />
                        </Picker>

                    </View>
                    {showText &&
                        <>
                            <TextInput
                                style={styles.input}
                                onChangeText={onTextChangeFunc}
                                value={details?.name ? String(details?.name) : null}
                                keyboardType="name"
                                autoCapitalize="none"
                            />
                            {!details?.name && details?.name == '' &&
                                <Text style={styles.errorText}>{'Please enter food name'}</Text>}


                            <Text style={styles.label}>calory amount*</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={onCaloryChangeFunc}
                                value={details?.caloryAmount ? String(details?.caloryAmount) : null}
                                keyboardType="caloryAmount"
                                autoCapitalize="none"
                            // editable={showText ? true : false}
                            />
                            {!details?.caloryAmount && details?.caloryAmount == '' && (
                                <Text style={styles.errorText}>{'enter calory'}</Text>
                            )}
                            <Text style={styles.label}>Fat amount*</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(e) => setDetails({
                                    ...details,
                                    fatAmount: e,
                                })}
                                value={details?.fatAmount ? String(details?.fatAmount) : null}
                                keyboardType="fatAmount"
                                autoCapitalize="none"
                            // editable={showText ? true : false}
                            />
                            {!details?.fatAmount && details?.fatAmount == '' && (
                                <Text style={styles.errorText}>{'enter fat amount'}</Text>
                            )}
                            <Text style={styles.label}>Protein amount*</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(e) => setDetails({
                                    ...details,
                                    proteinAmount: e,
                                })}
                                value={details?.proteinAmount ? String(details?.proteinAmount) : null}
                                keyboardType="proteinAmount"
                                autoCapitalize="none"
                            // editable={showText ? true : false}
                            />
                            {!details?.proteinAmount && details?.proteinAmount == '' && (
                                <Text style={styles.errorText}>{'enter protein amount'}</Text>
                            )}
                        </>}


                </View>

            </ScrollView >
            <TouchableOpacity style={styles.secondoryButton} onPress={onSubmit}>
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