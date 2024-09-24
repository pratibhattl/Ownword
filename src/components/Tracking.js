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

   
  // Convert to Date objects
  const asleepTime = new Date(`${details?.sleep_tracker?.asleep?.startDate.split('/').reverse().join('-')}T${details?.sleep_tracker?.asleep?.startTime}:00`);
  const inBedTime = new Date(`${details?.sleep_tracker?.in_bed?.startDate.split('/').reverse().join('-')}T${details?.sleep_tracker?.in_bed?.startTime}:00`);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = asleepTime - inBedTime;

  // Convert milliseconds to minutes
  const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.cardMain}>
                    <View style={styles.cardContainer}>
                        <Image source={require('../assets/Rectangle.png')} style={styles.cardImage} />
                        <Text style={styles.cardName}>{"Water Intake"}</Text>
                    </View>
                    <View style={styles.textStyle}>
                        <Text style={styles.dateStyle} >{details?.today_water_consumption}</Text>
                    </View>

                    <Text style={styles.desTitle}>{"description"}</Text>
                    {/* <Text style={styles.desText}>{data.title}</Text> */}
                </View>

                <View style={styles.cardMain}>
                    <View style={styles.cardContainer}>
                        <Image source={require('../assets/Rectangle.png')} style={styles.cardImage} />
                        <Text style={styles.cardName}>{"Menstrual Cycles"}</Text>
                    </View>
                    <View style={styles.textStyle}>
                        <Text style={styles.dateStyle} >{details?.menstrualDetails?.day}</Text>
                    </View>

                    <Text style={styles.desTitle}>{details?.menstrualDetails?.month}</Text>
                    <Text style={styles.desText}>{details?.menstrualDetails?.year}</Text>
                </View>

                <View style={styles.cardMain}>
                    <View style={styles.cardContainer}>
                        <Image source={require('../assets/Rectangle.png')} style={styles.cardImage} />
                        <Text style={styles.cardName}>{"Food Intake"}</Text>
                    </View>
                    <View style={styles.textStyle}>
                        <Text style={styles.dateStyle} >{details?.food_consumption?.calorieAmount}</Text>
                    </View>

                    <Text style={styles.desTitle}>{details?.food_consumption?.fatAmount}</Text>
                    <Text style={styles.desText}>{details?.food_consumption?.protineAmount}</Text>
                </View>
                <View style={styles.cardMain}>
                    <View style={styles.cardContainer}>
                        <Image source={require('../assets/Rectangle.png')} style={styles.cardImage} />
                        <Text style={styles.cardName}>{"Sleep Pattern"}</Text>
                    </View>
                    <View style={styles.textStyle}>
                        <Text style={styles.dateStyle} >{details?.sleep_tracker?.asleep?.startDate}</Text>
                    </View>
                    <View style={styles.textStyle}>
                        <Text style={styles.dateStyle} >{details?.sleep_tracker?.asleep?.startTime}</Text>
                    </View>
                    <Text style={styles.desTitle}>{details?.sleep_tracker?.in_bed?.startDate}</Text>
                    <Text style={styles.desTitle}>{details?.sleep_tracker?.in_bed?.startTime}</Text>
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