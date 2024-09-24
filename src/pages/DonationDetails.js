import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { getSingleDonationApi } from '../apiService/DonationApi';
import LoadingScreen from '../components/LoadingScreen';
import { getData } from '../helper';

export default function DonationDetails({ route }) {
    const { id } = route.params;
    const navigation = useNavigation();
    const [token, setToken] = useState(null)
    const [donationDetails, setDonationDetails] = useState({})
    const [isLoading, setIsLoading] = React.useState(false);
    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });

    }, []);

    useEffect(() => {
        getSingleDonationApi(token, id, setDonationDetails, setIsLoading)
    }, [token])





    if (isLoading) {
        return <LoadingScreen />;
    }




    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.imageStyle}>
                    <Text style={styles.textStyle}>{donationDetails?.title}</Text>

                    {donationDetails?.image !== null ?
                        <Image style={styles.imageHeight} source={{ uri: donationDetails?.image }} />
                        :
                        <Image source={require('../assets/donationIcon.png')} />
                    }
                    <View>
                        <Text style={styles.daysStyle}>{donationDetails?.description} </Text>

                    </View>
                </View>

            </ScrollView>
            <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Payment')} >
                <Text style={styles.buttonText}>Donate now</Text>
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
    imageHeight: {
        width: '100%',
        height: '200%'
    },
    imageStyle: {
        alignItems: 'center',
        height: 200,
        width: '100%'
    },
    textStyle: {
        color: '#fff',
        fontSize: 20,
        marginTop: 20
    },
    daysStyle: {
        alignItems: 'flex-start',
        color: '#EB7D26',
        fontSize: 15,
        marginTop: 20,
        marginLeft: 40

    },
    primaryButton: {
        backgroundColor: '#ffff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        margin: 15,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
    },
});