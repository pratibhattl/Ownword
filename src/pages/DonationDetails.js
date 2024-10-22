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
    const [totalDays, setTotalDays] = useState(0)
    const [leftDays, setLeftDays] = useState(0)
    const [getPercentage, setGetPercentage] = useState(0);

    const calculateDonationDetails = (donationDetails) => {
        const today = new Date();
        const totalMilliseconds = new Date(donationDetails?.endDate) - new Date(donationDetails?.startDate);
        const totalDays = Math.ceil(totalMilliseconds / (1000 * 60 * 60 * 24));

        // Days left (today to endDate)
        const leftMilliseconds = new Date(donationDetails?.endDate) - today;
        const leftDays = Math.ceil(leftMilliseconds / (1000 * 60 * 60 * 24));

        // Ensure leftDays is not negative
        const validLeftDays = leftDays > 0 ? leftDays : 0;

        // Calculate percentage of target achieved
        const target = donationDetails?.targetAmount;
        const received = donationDetails?.receivedAmount;
        const percentage = (received / target) * 100;
        setTotalDays(totalDays);
        setLeftDays(validLeftDays);
        setGetPercentage(percentage);
        return {
            totalDays,
            validLeftDays,
            percentage,
        };
    };

    useEffect(() => {
        calculateDonationDetails(donationDetails)
    }, [donationDetails])




    if (isLoading) {
        return <LoadingScreen />;
    }




    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper}>
                <View style={styles.imageStyle}>
                    {donationDetails?.image !== null ?
                        <Image style={styles.imageHeight} source={{ uri: donationDetails?.image }} />
                        :
                        <Image source={require('../assets/donationIcon.png')} />
                    }
                </View>
                <Text style={styles.textStyle}>{donationDetails?.title}</Text>
                <Text style={styles.daysStyle}>{donationDetails?.description} </Text>
                <Text style={styles.duration}>{leftDays}/{totalDays} Days Left</Text>

                <View style={styles.donationBlock}>
                    <View style={styles.donationhead}>
                        <Text style={styles.donationText}>Donation raised</Text>
                        <Text style={styles.donationAmount}>{donationDetails?.targetAmount} INR</Text>
                    </View>

                    <View style={styles.donationContext}>
                        <View style={styles.progressbarwrapper}>
                            <View style={[styles.progressbar,{width: getPercentage ? `${getPercentage}%`: '0%'}]}></View>
                        </View>
                       
                        <Text style={styles.donationpercent}>{getPercentage}%</Text>
                     
                    </View>
                </View>
                <Text style={styles.campaignText}>Campaign by</Text>

                <View style={styles.founderSection}>
                    <View style={styles.founderImage}>
                        <Image source={require('../assets/don.png')} />
                    </View>

                    <View style={styles.founderContent}>
                        <Text style={styles.foundername}>{donationDetails?.foundationName}</Text>
                        <View style={styles.verifiedbox}>
                            <Image source={require('../assets/verify.png')} />
                            <Text style={styles.verifiedText}>Verified User</Text>
                        </View>
                    </View>

                    <Image source={require('../assets/shield.png')} />
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
    wrapper: {
        paddingHorizontal: 16,
    },
    slider: {
        width: '90%',
        height: 50,
    },
    progressbarwrapper: {
        backgroundColor: '#0A142A',
        height: 10,
        borderRadius: 10,
        marginVertical: 10,
        flex: 1,
    },
   
    progressbar: {
        backgroundColor: '#20C3D3',
        height: 10,
        borderRadius: 10,
    },
    donationContext: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    donationpercent: {
        fontSize: 14,
        color: '#EB7D26',
        paddingLeft: 18,
    },
    imageHeight: {
        width: '100%',
        height: 240,
        objectFit: 'cover',
        borderRadius: 12,
        marginBottom: 24,
    },
    imageStyle: {
        alignItems: 'center',
        width: '100%'
    },
    donationBlock: {
        backgroundColor: '#232C3F',
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderRadius: 4,
        marginVertical: 24,
    },
    textStyle: {
        color: '#fff',
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '300',
        marginBottom: 10,
    },
    daysStyle: {
        alignItems: 'flex-start',
        color: '#fff',
        fontSize: 15,
        lineHeight: 20,
        fontWeight: '300',
        marginBottom: 24,
    },
    duration: {
        color: '#EB7D26',
        fontSize: 14,
    },
    primaryButton: {
        backgroundColor: '#ffff',
        borderRadius: 5,
        alignItems: 'center',
        margin: 16,
        backgroundColor: '#20C3D3',
        borderRadius: 6,
        height: 54,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        lineHeight: 54,
    },
    campaignText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 24,
    },
    donationhead: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    donationText: {
        fontSize: 14,
        color: '#20C3D3',
    },
    donationAmount: {
        fontSize: 14,
        color: '#fff',
    },
    founderSection: {
        backgroundColor: '#232C3F',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        padding: 10,
    },
    founderImage: {
        padding: 17,
        backgroundColor: '#0A142A',
        borderRadius: 2,
        width: 64,
        height: 64,
    },
    founderContent: {
        flex: 1,
        paddingHorizontal: 10,
    },
    foundername: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 10,
    },
    verifiedbox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    verifiedText: {
        color: '#20C3D3',
        fontSize: 13,
    },
});