import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import Footer from '../components/Footer'

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

    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper}>
                {notificationArr?.length > 0 && notificationArr?.map((data) => {
                    return (
                        <View style={styles.cardMain}>
                            <Image source={data.imageUrl} style={styles.cardImage} />
                            <View style={styles.cardContainer}>
                                <Text style={styles.cardName}>{data.name}{" "}<Text style={styles.cardText}>{data.title}</Text></Text>

                                <View style={styles.textStyle}>
                                    <Text style={styles.dateStyle} >{data.date}</Text>
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
        backgroundColor: '#0A142A'
    },
    wrapper: {
        paddingHorizontal: 16,
    },
    textStyle: {
        justifyContent: 'end',
        alignItems: 'flex-end'
    },
    cardMain: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#232C3F',
    },
    cardContainer: {
        flexDirection: 'column',
        flex: 1,
        paddingTop: 8,
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 25, 
        marginRight: 10,
    },
    cardText: {
        fontSize: 14,
        lineHeight: 17,
        color: '#fff',
    },
    dateStyle: {
        fontSize: 11,
        color: '#868686'
    },
    cardName: {
        fontSize: 17,
        color: '#20C3D3'
    }
});