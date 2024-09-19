import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native'
import Footer from '../components/Footer'
import { useNavigation } from '@react-navigation/native'
import { getData } from '../helper';
import { getDonationApi } from '../apiService/DonationApi';
import LoadingScreen from '../components/LoadingScreen';

const notificationArr = [{
    imageUrl: require('../assets/donationIcon.png'),
    name: 'Pratibha Thakur',
    title: 'sdfds dsfdsf asdasd asdasd adsd',
    date: '03-09-2024'
},
{
    imageUrl: require('../assets/donationIcon.png'),
    name: 'Pratibha Thakur',
    title: 'sdfds dsfdsf asdasd asdasd adsd',
    date: '03-09-2024'
},
{
    imageUrl: require('../assets/donationIcon.png'),
    name: 'Pratibha Thakur',
    title: 'sdfds dsfdsf asdasd asdasd adsd',
    date: '03-09-2024'
},
{
    imageUrl: require('../assets/donationIcon.png'),
    name: 'Pratibha Thakur',
    title: 'sdfds dsfdsf asdasd asdasd adsd',
    date: '03-09-2024'
}
]
export default function Donation() {
const navigation = useNavigation();
const [token, setToken] = useState(null)
const [donationList, setDonationList] = useState([])
const [isLoading, setIsLoading] = React.useState(false);
useEffect(() => {
    getData('token').then((token) => {
        setToken(token);
    });
   
}, []);

useEffect(() => {
    getDonationApi(token, setDonationList, setIsLoading)
}, [token])


if (isLoading) {
    return <LoadingScreen />;
}

    return (
        <View style={styles.container}>
            <ScrollView >
                {donationList?.length > 0 && donationList?.map((data) => {
                    return (
                        <View style={styles.cardMain}>
                            <Pressable  onPress={()=> navigation.navigate("DonationDetails",{id:data?._id})} > 
                            <View style={styles.cardContainer}><Image source={{uri:data.image}} style={styles.cardImage} />
                                <Text style={styles.cardText}>{data.description}</Text>
                            </View>
                            </Pressable>
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
    textStyle: {
        justifyContent: 'end',
        alignItems: 'flex-end'
    },
    cardMain: {
        with: '100%',
        flexDirection: 'column',
        alignItems: 'end',
        padding: 10,
        backgroundColor: '#232C3F',
        borderRadius: 8,
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        marginRight: 10,
        marginLeft: 10
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%'
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 10,
    },
    cardText: {
        fontSize: 16,
        color: '#fff',
    },
   
   
});