import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native'
import Footer from '../components/Footer'
import { getData } from '../helper'
import LoadingScreen from '../components/LoadingScreen'
import { useNavigation } from '@react-navigation/native';
import { getMigraineReasonApi, addNewTrigger } from '../apiService/MigraineLogApi'
export default function MigraineReason() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [migraineReason, setMigraineReason] = React.useState([]);
    const [reason, setReason] = useState([])
    const navigation = useNavigation();
    const [token, setToken] = useState(null)
    const [details, setDetails] = useState(null)
    useEffect(() => {
        getData('migrainLog').then((data) => {
            setDetails(data);
        });

    }, [])

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await getData('token');
            setToken(storedToken);
            setIsLoading(false);
        };

        fetchToken();
    }, []);
    useEffect(() => {
        getMigraineReasonApi(token, setMigraineReason, setIsLoading)
    }, [token])

    const onSelectReason = (e) => {
        let arr = [...reason]
        var index = arr.indexOf(e)
        if (index !== -1) {
            arr.splice(index, 1);
        } else {
            arr.push(e);
        }
        setReason(arr)
        setDetails({
            ...details,
            painReason: arr
        })
    }

    const onSubmit = () => {
        addNewTrigger(token, details, setIsLoading, navigation)
    }


    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <View style={styles.container}>
            <ScrollView >
                {/* <View style={styles.container}> */}

                <View style={styles.grid}>
                    {migraineReason?.map((x) => {
                        return (
                            <TouchableOpacity style={[reason?.includes(x?._id) ? styles.card1 : styles.card]} onPress={() => onSelectReason(x?._id)}>
                                <Image source={{ uri: x.image }} style={styles.icon} />
                                <Text style={styles.cardText}>{x?.title}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                {/* <TouchableOpacity style={styles.secondoryButton}  >
                    <Text style={styles.buttonText}>Add new trigger</Text>
                </TouchableOpacity> */}
            </ScrollView>
            <TouchableOpacity style={styles.arrowButton} onPress={() => onSubmit()} >
                <Image style={styles.arrowStyle} source={require('../assets/arrow-right.png')} />
            </TouchableOpacity>
            <Footer />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#0A142A'
    },
    textStyle: {
        fontSize: 25,
        color: '#fff'
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
    secondoryButton: {
        // width: '30%',
        backgroundColor: '#232C3F',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        // marginBottom: 15,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    dailyTracker: {
        width: '100%',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#232C3F',
        flex: 1,
        display: 'flex',
        padding: 20,
        flexDirection: 'row'
    },
    title: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    imageStye: {
        marginRight: 70,
        width: '50%',
    },
    titleStyle: {
        width: '70%',
        marginEnd: 20
    },
    subtitle: {
        color: '#00e6e6',
        fontSize: 14,
    },
    image: {
        width: 80,
        height: 80,
        marginTop: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#232C3F',
        width: '30%',
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    card1: {
        backgroundColor: '#EB7D26',
        width: '30%',
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    cardText: {
        color: 'white',
        fontSize: 12,
    },

});

