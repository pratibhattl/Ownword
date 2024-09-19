import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { getMigraineLogApi ,updateNewTrigger} from '../apiService/MigraineLogApi';
import { getData } from '../helper';
import Moment from 'moment';
import { Button } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { mergeData } from '../helper';
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
        getMigraineLogApi(token, setMigraineLogs, setIsLoading)
    }, [token])

    const onGoForward = () => {
        if(!migraineLogs[0]?.endDate){
    console.log(migraineLogs[0], "sfsddfg");

            let id= migraineLogs[0]?._id
            updateNewTrigger(token, details,id, setIsLoading,navigation)
        }else{
        navigation.navigate('PainArea');
        mergeData('migrainLog', details);
        }
    }




    if (isLoading) {
        return <LoadingScreen />;
    }


    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={styles.formWrap}>
                    {!migraineLogs[0]?.endDate ?
                        <>
                            <Controller
                                control={control}
                                // rules={{ required: 'Select your date of birth' }}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Text style={styles.label}>End Time*</Text>
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
                                        <Text style={styles.label}>End Date*</Text>
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
                                        <Text style={styles.label}>Start Time*</Text>
                                        <Text style={styles.label}>{details?.start_time}</Text>
                                        <Button title="Open" onPress={() => setOpen(true)} />
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
                                        <Text style={styles.label}>Start date*</Text>
                                        <Text style={styles.label}>{details?.start_date}</Text>
                                        <Button title="Open" onPress={() => setOpenDate(true)} />
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
            <TouchableOpacity style={styles.arrowButton}
                onPress={() => onGoForward()}
            >
                <Image style={styles.arrowStyle} source={require('../assets/right-arrow.jpg')} />
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
})