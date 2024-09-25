import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import Footer from '../components/Footer'
import { getData } from '../helper'
import LoadingScreen from './LoadingScreen'
import { getTrackingApi } from '../apiService/InsightsApi'


export default function Tracking() {
    const [details, setDetails] = useState({});
    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = React.useState(false);
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });
        getData('userDetails').then((data) => {
            setUserDetails(data);
        });
    }, []);

    useEffect(() => {
        getTrackingApi(token, setDetails, setIsLoading)
    }, [token]);
    // useEffect(() => {
    //     // In-bed data
    //     const data = {
    //         inBed: {
    //             startTime: details?.sleep_tracker?.in_bed?.startTime,
    //             startDate: details?.sleep_tracker?.in_bed?.startDate,
    //             endTime: details?.sleep_tracker?.in_bed?.endTime,
    //             endDate: details?.sleep_tracker?.in_bed?.endDate
    //         },

    //         // Asleep data
    //         asleep: {
    //             startTime: details?.sleep_tracker?.asleep?.startTime,
    //             startDate: details?.sleep_tracker?.asleep?.startDate,
    //             endTime: details?.sleep_tracker?.asleep?.endTime,
    //             endDate: details?.sleep_tracker?.asleep?.endDate
    //         }
    //     }
    // }, [details]);
    const data = {
        in_bed: {
            startTime: details?.sleep_tracker?.in_bed?.startTime,
            startDate: details?.sleep_tracker?.in_bed?.startDate,
            endTime: details?.sleep_tracker?.in_bed?.endTime,
            endDate: details?.sleep_tracker?.in_bed?.endDate
        },

        // Asleep data
        asleep: {
            startTime: details?.sleep_tracker?.asleep?.startTime,
            startDate: details?.sleep_tracker?.asleep?.startDate,
            endTime: details?.sleep_tracker?.asleep?.endTime,
            endDate: details?.sleep_tracker?.asleep?.endDate
        }
    }


    const asleepDifference = calculateDifference(
        data.asleep.startDate,
        data.asleep.startTime,
        data.asleep.endDate,
        data.asleep.endTime
    );

    const inBedDifference = calculateDifference(
        data.in_bed.startDate,
        data.in_bed.startTime,
        data.in_bed.endDate,
        data.in_bed.endTime
    );


    const calculateDifference = (startDate, startTime, endDate, endTime) => {
        // Ensure all values are defined before proceeding
        if (!startDate || !startTime || !endDate || !endTime) {
            return { hours: 0, minutes: 0 };  // Return zero if any value is missing
        }
    
        // Convert date format from DD/MM/YYYY to MM/DD/YYYY for proper parsing
        const formattedStartDate = startDate.split('/').reverse().join('/');
        const formattedEndDate = endDate.split('/').reverse().join('/');
    
        // Create Date objects with corrected format
        const startDateTime = new Date(`${formattedStartDate} ${startTime}`);
        const endDateTime = new Date(`${formattedEndDate} ${endTime}`);
    
        if (isNaN(startDateTime) || isNaN(endDateTime)) {
            return { hours: 0, minutes: 0 };  // Handle invalid date formats
        }
    
        // Calculate the difference in milliseconds
        const differenceMs = endDateTime - startDateTime;
    
        // Convert the difference to hours and minutes
        const hours = Math.floor(differenceMs / (1000 * 60 * 60));
        const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
    
        return { hours, minutes };
    }

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.cardMain}>
                    <View style={styles.cardContainer}>
                        {/* <Image source={require('../assets/Rectangle.png')} style={styles.cardImage} /> */}
                        <Text style={styles.cardName}>{"Water Intake"}</Text>
                    </View>
                    <View style={styles.textStyle}>
                        <Text style={styles.desText} >{details?.today_water_consumption}</Text>
                    </View>
                </View>
                <View style={styles.cardMain}>
                    <View style={styles.cardContainer}>
                        {/* <Image source={require('../assets/Rectangle.png')} style={styles.cardImage} /> */}
                        <Text style={styles.cardName}>{"Menstrual Cycles"}</Text>
                    </View>
                    <View style={styles.textStyle}>
                        <Text style={styles.desText}>{details?.menstrualDetails?.day} {" "} {details?.menstrualDetails?.month} {" "} {details?.menstrualDetails?.year}</Text>
                    </View>
                </View>
                <View style={styles.cardMain}>
                    <View style={styles.cardContainer}>
                        {/* <Image source={require('../assets/Rectangle.png')} style={styles.cardImage} /> */}
                        <Text style={styles.cardName}>{"Food Intake"}</Text>
                    </View>
                    <Text style={styles.desText} >Calorie Amount : {details?.food_consumption?.calorieAmount}</Text>
                    <Text style={styles.desText}> Fat Amount : {details?.food_consumption?.fatAmount}</Text>
                    <Text style={styles.desText}> Protine Amount : {details?.food_consumption?.protineAmount}</Text>
                </View>
                <View style={styles.cardMain}>
                    <View style={styles.cardContainer}>
                        {/* <Image source={require('../assets/Rectangle.png')} style={styles.cardImage} /> */}
                        <Text style={styles.cardName}>{"Sleep Pattern"}</Text>
                    </View>
                    <View style={styles.textStyle}>
                        <Text style={styles.desText} >Asleep Time : {asleepDifference.hours} hours {asleepDifference.minutes} minutes</Text>
                    </View>
                    <Text style={styles.desText}>In Bed Time : {inBedDifference.hours} hours {inBedDifference.minutes} minutes
                    </Text>
                </View>
            </ScrollView>
            <Footer />
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
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
    secondaryButton1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
    },
    optionIcon: {
        margin: 20,
        flexDirection: 'row'
    },
    secondaryButton: {
        backgroundColor: '#0A142A',
        padding: 15,
    },
    banner: {
        width: '100%',
        height: 180
    },
    optionButton: {
        fontSize: 15,
        color: '#fff'
    },
    container: {
        height: '100%',
        backgroundColor: '#0A142A'
    },
    buttonStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    primaryButton: {
        backgroundColor: '#ffff',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15,
        width: '48%'
    },
    selected: {
        backgroundColor: '#20C3D3',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15,
        width: '48%'
    },

    buttonText: {
        color: '#000',
        fontSize: 16,
    },
    textStyle: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    imageStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    cardMain: {
        with: '100%',
        flexDirection: 'column',  // Horizontal layout
        alignItems: 'end',
        padding: 10,
        backgroundColor: '#232C3F',
        borderRadius: 8,
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,  // For Android shadow,
        marginRight: 10,
        marginLeft: 10
    },
    cardContainer: {
        flexDirection: 'row',  // Horizontal layout
        alignItems: 'center',  // Center content vertically
        width: '52%'
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 25,  // Circular image
        marginRight: 10,
    },
    cardText: {
        fontSize: 16,
        color: '#fff',
    },
    dateStyle: {
        fontSize: 16,
        color: '#868686'
    },
    cardName: {
        fontSize: 16,
        color: '#20C3D3'
    },
    desTitle: {
        fontSize: 17,
        color: '#20C3D3'
    },
    desText: {
        color: '#fff'
    }
});