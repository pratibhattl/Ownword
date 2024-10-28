import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import Footer from '../components/Footer'
import { getData } from '../helper'
import { getNotificationApi } from '../apiService/Users';
import LoadingScreen from './LoadingScreen';
import Moment from 'moment';

const notificationArr = [{
    imageUrl: require('../assets/Ellipse.png'),
    name: 'Pratibha Thakur',
    title: 'sdfds dsfdsf asdasd asdasd adsd',
    date: '03-09-2024'
},
{
    imageUrl: require('../assets/Ellipse.png'),
    name: 'Pratibha Thakur',
    title: 'sdfds dsfdsf asdasd asdasd adsd',
    date: '03-09-2024'
},
{
    imageUrl: require('../assets/Ellipse.png'),
    name: 'Pratibha Thakur',
    title: 'sdfds dsfdsf asdasd asdasd adsd',
    date: '03-09-2024'
},
{
    imageUrl: require('../assets/Ellipse.png'),
    name: 'Pratibha Thakur',
    title: 'sdfds dsfdsf asdasd asdasd adsd',
    date: '03-09-2024'
}
]
export default function Notification() {
    const [notificationList, setNotificationList] = useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [token, setToken] = useState(null)

    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });

    }, []);
    useEffect(() => {
        getNotificationApi(token, setNotificationList, setIsLoading)

    }, [token])


    
    if (isLoading) {
        return <LoadingScreen />;
    }


    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper}>
                {notificationList?.length > 0 && notificationList?.map((data) => {
                    return (
                        <View style={styles.cardMain}>
                            <Image source={require('../assets/Ellipse.png')} style={styles.cardImage} />
                            <View style={styles.cardContainer}>
                                <Text style={styles.cardName}><Text style={styles.cardText}>{data.message}</Text></Text>

                                <View style={styles.textStyle}>
                                    <Text style={styles.dateStyle} >{Moment(data.createdAt).format("DD/MM/YYYY")}</Text>
                                </View>
                            </View>
                        </View>
                    )
                })}

            </ScrollView>
            <Footer />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#EDE8D0',
    },
    wrapper: {
        paddingHorizontal: 16,
    },
    textStyle: {
        justifyContent: 'end',
        alignItems: 'flex-end',
        marginTop: 5,
    },
    cardMain: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#D5D1BB',
        marginBottom: 1,
    },
    cardContainer: {
        flexDirection: 'column',
        flex: 1,
        paddingTop: 8,
    },
    cardImage: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 10,
    },
    cardText: {
        fontSize: 14,
        lineHeight: 17,
        color: '#6C727F',
        marginBottom: 10,
    },
    dateStyle: {
        fontSize: 11,
        color: '#868686',
    },
    cardName: {
        fontSize: 17,
        color: '#20C3D3'
    }
});