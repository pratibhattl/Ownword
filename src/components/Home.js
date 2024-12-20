import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image, Pressable, SafeAreaView } from 'react-native'
import Footer from '../components/Footer'
import { getData } from '../helper'
import LoadingScreen from './LoadingScreen'
import { useNavigation } from '@react-navigation/native';
import { getHomeApi } from '../apiService/Users'
import { useAuth } from '../Context/AppContext'
const screenWidth = Dimensions.get('window').width;
const notificationArr = {
    imageUrl: require('../assets/donationIcon.png'),
    name: 'Pratibha Thakur',
    title: 'sdfds dsfdsf asdasd asdasd adsd',
    date: '03-09-2024'
}
const data = [
    {
        id: '1',
        title: 'Kingpin of ring that trafficked 12,000 women held',
        image: require('../assets/Rectangle.png'), // Replace with your image path
    },
    {
        id: '2',
        title: 'Ring of traffickers dismantled in cross-border operation',
        image: require('../assets/Rectangle1.png'), // Replace with your image path
    },
    {
        id: '3',
        title: 'Trafficking ring leader arrested in major bust',
        image: require('../assets/Rectangle.png'), // Replace with your image path
    },
];
export default function Home() {
    const [isLoading, setIsLoading] = React.useState(false);
    const navigation = useNavigation();
    const [homePageData, setHomePageData] = useState([]);
    const [donationData, setdonationData] = useState({})
    const { token } = useAuth();


    useEffect(() => {
        getHomeApi(token, setHomePageData, setdonationData, setIsLoading)
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
        calculateDonationDetails(donationData)
    }, [donationData])


    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollcontainer}>
                <Pressable style={styles.dailyTrack} onPress={() => navigation.navigate('MigraineLog')}>
                    <View style={styles.dailyTracker}>
                        <View style={styles.titleStyle}>
                            <Text style={styles.title}>Track every day and see what could cause attacks</Text>
                            <Text style={styles.subtitle}>Daily Tracker <Image source={require('../assets/zapIcon.png')} /></Text>
                        </View>

                        <View style={styles.imageStye}>
                            <Image source={require('../assets/homeIcon.png')} style={styles.image} />
                        </View>
                    </View>
                </Pressable>

                <View style={styles.grid}>
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('WaterIntake')}>
                        <Image source={require('../assets/Frame.png')} style={styles.icon} />
                        <Text style={styles.cardText}>Water Intake</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Menstrual')} >
                        <Image source={require('../assets/Frame1.png')} style={styles.icon} />
                        <Text style={styles.cardText}>Menstrual Cycles</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} 
                    // onPress={() => navigation.navigate('FoodIntake')}
                    >
                        <Image source={require('../assets/Frame2.png')} style={styles.icon} />
                        <Text style={styles.cardText}>Food Intake</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TimeInBed')}>
                        <Image source={require('../assets/Frame3.png')} style={styles.icon} />
                        <Text style={styles.cardText}>Sleep Pattern</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Medication')}>
                        <Image source={require('../assets/Frame4.png')} style={styles.icon} />
                        <Text style={styles.cardText}>Medications</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <Image source={require('../assets/Frame5.png')} style={styles.icon} />
                        <Text style={styles.cardText}>Weather</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.cardMain}>
                    <Pressable onPress={() => navigation.navigate("DonationDetails", { id: donationData?._id })} >
                        <View style={styles.cardContainer}>
                            {donationData?.image == null ?
                                <Image source={require('../assets/donationIcon.png')} style={styles.cardImage} />
                                :
                                <Image source={{ uri: String(donationData?.image) }} style={styles.cardImage} />

                            }
                            
                            <View style={styles.donateContent}>
                                <Text style={styles.dcardText}>{donationData.title}</Text>
                                <Text style={styles.founderText}>{donationData.foundationName}</Text>

                                <View style={styles.progressbarwrapper}>
                                    <View style={[styles.progressbar, { width: donationData.receivedAmount ? `${donationData.receivedAmount}%` : '0%' }]}></View>
                                </View>
                                <View style={styles.donationmeta}>
                                    <Text style={styles.targetAmount}>Target - {donationData?.targetAmount} INR</Text>
                                    <Text style={styles.duration}> {leftDays}/{totalDays} Days Left</Text>
                                </View>
                            </View>
                            
                        </View>
                    </Pressable>
                </View> */}
                <View style={styles.listStyle}>
                    {homePageData?.length > 0 ?
                        <FlatList
                            data={homePageData}
                            horizontal
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <View style={styles.card1}>
                                    {item?.blog_image !== null ?
                                        <Image source={{ uri: String(item.blog_image) }} style={styles.image1} />
                                        :
                                        <Image source={require('../assets/Rectangle.png')} style={styles.image1} />
                                    }
                                    <View style={styles.cardContent}>
                                        <Text style={styles.title1}>{item.title}</Text>
                                        {/* <Text style={styles.title1}>{item.description}</Text> */}
                                        <View style={styles.iconsContainer}>
                                            {/* Add icons for likes, shares, etc. */}
                                            <Text style={styles.iconText}>{item?.likeCount} <Image source={require('../assets/heart.png')} style={styles.blogicon} /></Text>
                                            <Text style={styles.iconText}>{item?.commentCount} <Image source={require('../assets/message-text.png')} style={styles.blogicon} /></Text>
                                            <Text style={styles.iconText}>5 <Image source={require('../assets/sendIcon.png')} style={styles.blogicon} /></Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                            showsHorizontalScrollIndicator={false} // Hides the scroll bar
                        />
                        :
                        <FlatList
                            data={data}
                            horizontal
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.card1}>
                                    <Image source={item.image} style={styles.image1} />
                                    <Text style={styles.title1}>{item.title}</Text>
                                    <View style={styles.iconsContainer}>
                                        {/* Add icons for likes, shares, etc. */}
                                        <Text style={styles.iconText}>0 <Image source={require('../assets/heart.png')} style={styles.blogicon} /></Text>
                                        <Text style={styles.iconText}>0 <Image source={require('../assets/message-text.png')} style={styles.blogicon} /></Text>
                                        <Text style={styles.iconText}>0 <Image source={require('../assets/sendIcon.png')} style={styles.blogicon} /></Text>
                                    </View>
                                </View>
                            )}
                            showsHorizontalScrollIndicator={false} // Hides the scroll bar
                        />
                    }
                </View>
            </ScrollView>
            <Footer />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    scrollcontainer: {
        paddingHorizontal: 16,
    },
    container: {
        height: '100%',
        backgroundColor: '#EDE8D0',
    },

    textStyle: {
        fontSize: 25,
        color: '#fff'
    },
    dailyTracker: {
        backgroundColor: '#D5D1BB',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderRadius: 4,
        paddingRight: 7,
        marginBottom: 16,
    },
    dailyTrack: {
        flex: 1,
    },
    title: {
        color: '#6C727F',
        fontSize: 14,
        marginBottom: 23,
        maxWidth: 200,
    },
    imageStye: {
        width: 80,
        textAlign: 'right',
        marginLeft: 'auto',
        justifyContent: 'flex-end',
    },
    titleStyle: {
        flex: 1,
        paddingTop: 24,
        paddingLeft: 16,
        paddingBottom: 16,
    },
    subtitle: {
        color: '#964B00',
        fontSize: 14,
    },
    image: {
        width: 80,
        height: 80,
        marginTop: 10,
        marginLeft: 'auto',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    card: {
        width: '100%',
        maxWidth: '30%',
        backgroundColor: '#D5D1BB',
        padding: 10,
        alignItems: 'center',
        borderRadius: 4,
    },
    icon: {
        width: 36,
        height: 36,
        marginBottom: 10,
    },
    cardText: {
        color: '#6C727F',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 0,
    },
    cardMain: {
        with: '100%',
        flexDirection: 'column',
        alignItems: 'end',
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 0,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '52%'
    },
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 12,
    },
    cardText1: {
        fontSize: 16,
        color: '#fff',
    },
    card1: {
        backgroundColor: '#D5D1BB',
        borderRadius: 4,
        marginRight: 16,
        width: screenWidth * 0.6, // Adjust card width relative to screen size
    },
    cardContent: {
        padding: 10,
    },
    image1: {
        width: '100%',
        height: 140,
        objectFit: 'cover',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    blogicon: {
        width: 12,
        height: 12,
        objectFit: 'scale-down',
        marginLeft: 6,
    },
    title1: {
        color: '#964B00',
        fontSize: 10,
        marginBottom: 6,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    iconText: {
        color: '#6C727F',
        fontSize: 10,
        marginRight: 12,
    },
    listStyle: {
        marginBottom: 16,
        marginTop: 16,
    },
    progressbarwrapper: {
        backgroundColor: '#D5D1BB',
        width: '100%',
        height: 6,
        borderRadius: 10,
        marginVertical: 10,
    },
    progressbar: {
        backgroundColor: '#20C3D3',
        height: 6,
        borderRadius: 10,
    },
    donateContent: {
        width: Dimensions.get('window').width - 144, // Dynamic width for grid layout
    },
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 12,
    },
    dcardText: {
        fontSize: 14,
        color: '#6C727F',
        marginBottom: 5,
        textAlign: 'left',
    },
    founderText: {
        fontSize: 12,
        color: '#964B00',
        margin: 0,
    },
    donationmeta: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    targetAmount: {
        color: '#6C727F',
        fontSize: 11,
    },
    duration: {
        color: '#EB7D26',
        fontSize: 11,
    },
});
