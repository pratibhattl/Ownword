import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Pressable, Dimensions } from 'react-native'
import Footer from '../components/Footer'
import { useNavigation } from '@react-navigation/native'
import { getData } from '../helper';
import { getDonationApi } from '../apiService/DonationApi';
import LoadingScreen from '../components/LoadingScreen';

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
            <ScrollView style={styles.wrapper}>
                {donationList?.length > 0 && donationList?.map((data) => {
                    return (
                        <View style={styles.cardMain}>
                            <Pressable  onPress={()=> navigation.navigate("DonationDetails",{id:data?._id})} > 
                            <View style={styles.cardContainer}>
                                <Image source={{uri:data.image}} style={styles.cardImage} />
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardText}>{data.title}</Text>
                                    <Text style={styles.founderText}>{data.foundationName}</Text>

                                    <View style={styles.progressbarwrapper}>
                                        <View style={styles.progressbar}></View>
                                    </View>

                                    <View style={styles.donationmeta}>
                                        <Text style={styles.targetAmount}>Target - {data.targetAmount} INR</Text>
                                        <Text style={styles.duration}>9/16 Days Left</Text>
                                    </View>
                                </View>
                                
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
    wrapper: {
        paddingHorizontal: 16,
    },
    textStyle: {
        justifyContent: 'end',
        alignItems: 'flex-end'
    },
    cardMain: {
        with: '100%',
        alignItems: 'end',
    },
    progressbarwrapper: {
        backgroundColor: '#232C3F',
        width: '100%',
        height: 6,
        borderRadius: 10,
        marginVertical: 10,
    },
    progressbar: {
        backgroundColor: '#20C3D3',
        width: '30%',
        height: 6,
        borderRadius: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardContent: {
        width: Dimensions.get('window').width - 144, // Dynamic width for grid layout
    },
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 12,
    },
    cardText: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 10,
    },
    founderText: {
        fontSize: 12,
        color: '#20C3D3',
        margin: 0,
    },
    donationmeta: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    targetAmount: {
        color: '#fff',
        fontSize: 11,
    },
    duration: {
        color: '#EB7D26',
        fontSize: 11,
    },
});