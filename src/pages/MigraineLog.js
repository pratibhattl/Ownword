import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { getMigraineLogApi, updateNewTrigger } from '../apiService/MigraineLogApi';
import { getData } from '../helper';
import Moment from 'moment';
import { Button } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { mergeData } from '../helper';
import { useIsFocused } from '@react-navigation/native';
export default function MigraineLog() {

    const { control, handleSubmit, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [token, setToken] = useState(null)
    const [migraineLogs, setMigraineLogs] = useState([])
    const [isLoading, setIsLoading] = React.useState(false);
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [openDate, setOpenDate] = useState(false)
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [openEndTime, setOpenEndTime] = useState(false)
    const [openEndDate, setOpenEndDate] = useState(false)
    const [details, setDetails] = useState({})
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });
    }, [])

    useEffect(() => {
        if (isFocused) {
            getMigraineLogApi(token, setMigraineLogs, setIsLoading)
        }
    }, [token, isFocused])

    const onGoForward = () => {
        if (!migraineLogs[0]?.endDate) {
            let id = migraineLogs[0]?._id
            updateNewTrigger(token, details, id, setIsLoading, navigation)
        } else {
            navigation.navigate('PainArea');
            mergeData('migrainLog', details);
        }
    }




    if (isLoading) {
        return <LoadingScreen />;
    }


    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper}>
                <View style={styles.formWrap}>
                    {!migraineLogs[0]?.endDate ?
                        <>
                            <Controller
                                control={control}
                                // rules={{ required: 'Select your date of birth' }}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Text style={styles.inputlabel}>End Time*</Text>
                                        <Text style={styles.label}>{details?.endTime}</Text>
                                        <Button title="Open" onPress={() => setOpenEndTime(true)} />
                                        {endTime &&
                                            <DatePicker
                                                modal
                                                mode={"time"}
                                                open={openEndTime}
                                                date={endDate}
                                                onConfirm={(date) => {
                                                    setOpenEndTime(false)
                                                    setDetails({
                                                        ...details,
                                                        endTime: Moment(date).format("HH:MMA")
                                                    })
                                                    onChange(Moment(date).format("HH:MMA"))
                                                }}
                                                onCancel={() => {
                                                    setOpenEndTime(false)
                                                }}
                                            />
                                        }
                                    </>
                                )}
                                name="endTime"
                            />
                            <Controller
                                control={control}
                                // rules={{ required: 'Select your date of birth' }}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Text style={styles.inputlabel}>End Date*</Text>
                                        <Text style={styles.label}>{details?.endDate}</Text>
                                        <Button title="Open" onPress={() => setOpenEndDate(true)} />
                                        {openEndDate &&
                                            <DatePicker
                                                modal
                                                mode={"date"}
                                                open={openEndDate}
                                                date={endDate}
                                                onConfirm={(date) => {
                                                    setOpenEndDate(false)
                                                    setDetails({
                                                        ...details,
                                                        endDate: Moment(date).format("DD/MM/YYYY")
                                                    })
                                                    onChange(Moment(date).format("DD/MM/YYYY"))
                                                }}
                                                onCancel={() => {
                                                    setOpenEndDate(false)
                                                }}
                                            />
                                        }
                                    </>
                                )}
                                name="endDate"
                            />
                        </>
                        :
                        <>
                            <Controller
                                control={control}
                                // rules={{ required: 'Select your date of birth' }}
                                render={({ field: { onChange, value } }) => (
                                    <>
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
                                                mode={"time"}
                                                open={open}
                                                date={startTime}
                                                onConfirm={(date) => {
                                                    setOpen(false)
                                                    setDetails({
                                                        ...details,
                                                        start_time: Moment(date).format("HH:MMA")
                                                    })
                                                    onChange(Moment(date).format("HH:MMA"))
                                                }}
                                                onCancel={() => {
                                                    setOpen(false)
                                                }}
                                            />
                                        }
                                    </>
                                )}
                                name="start_time"
                            />
                            <Controller
                                control={control}
                                // rules={{ required: 'Select your date of birth' }}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Text style={styles.inputlabel}>Start date*</Text>
                                        <View style={styles.dateblock}>
                                            <Text style={styles.datetime}>{details?.start_date}</Text>
                                            {/* <Button title="Open" onPress={() => setOpenDate(true)} /> */}
                                            <TouchableOpacity onPress={() => setOpenDate(true)} style={styles.button}>
                                                <Image source={require('../assets/calendar.png')} style={styles.image} />
                                            </TouchableOpacity>
                                        </View>
                                        {openDate &&
                                            <DatePicker
                                                modal
                                                mode={"date"}
                                                open={openDate}
                                                date={startDate}
                                                onConfirm={(date) => {
                                                    setOpenDate(false)
                                                    setDetails({
                                                        ...details,
                                                        start_date: Moment(date).format("DD/MM/YYYY")
                                                    })
                                                    onChange(Moment(date).format("DD/MM/YYYY"))
                                                }}
                                                onCancel={() => {
                                                    setOpenDate(false)
                                                }}
                                            />
                                        }
                                    </>
                                )}
                                name="start_date"
                            />


                        </>}
                </View>

            </ScrollView>
            {!migraineLogs[0]?.endDate &&
                <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate("Home")}  >
                    <Text style={{ color: "#fff" }}>Skip</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity style={styles.arrowButton} onPress={() => onGoForward()}>
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
    skipButton: {
        height: 54,
        width: 60,
        backgroundColor: '#20C3D3',
        borderRadius: 6,
        padding: 15,
        margin: 16,
        marginLeft: 'auto',
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

    formWrap: {
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
        backgroundColor: '#20C3D3',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        // marginBottom: 15,
    },

    buttonText: {
        color: '#000',
        fontSize: 16,
    },

    inputlabel: {
        fontSize: 24,
        fontWeight: '200',
        color: '#fff',
        marginBottom: 24,
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

})