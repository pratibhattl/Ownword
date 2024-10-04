import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image, Pressable } from 'react-native'
import Footer from '../components/Footer'
import { refreshTokenApi } from '../apiService/Users'
import { getData } from '../helper'
import LoadingScreen from './LoadingScreen'
import { useNavigation } from '@react-navigation/native';
import { getHomeApi } from '../apiService/Users'
import Slider from '@react-native-community/slider';

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
    const [userDetails, setUserDetails] = useState({})
    const [token, setToken] = useState(null)

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await getData('token');
            setToken(storedToken);
            setIsLoading(false);
        };
        getData('userDetails').then((data) => {
            setUserDetails(data);
        });
        fetchToken();
    }, []);

    useEffect(() => {
        // refreshTokenApi(token, userDetails?._id, setIsLoading)
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
        <View style={styles.container}>
            <ScrollView style={styles.scrollcontainer}>
                {/* <View style={styles.container}> */}
                <View style={styles.dailyTracker}>
                    <Pressable style={styles.dailyTrack} onPress={() => navigation.navigate('MigraineLog')}>
                        <View style={styles.titleStyle}>
                            <Text style={styles.title}>Track every day and see what could cause attacks</Text>
                            <Text style={styles.subtitle}>Daily Tracker <Image source={require('../assets/zapIcon.png')} /></Text>
                        </View>
                    </Pressable>
                    <View style={styles.imageStye}>
                        <Image source={require('../assets/homeIcon.png')} style={styles.image} />
                    </View>
                </View>

                <View style={styles.grid}>
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('WaterIntake')}>
                        <Image source={require('../assets/Frame.png')} style={styles.icon} />
                        <Text style={styles.cardText}>Water Intake</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Menstrual')} >
                        <Image source={require('../assets/Frame1.png')} style={styles.icon} />
                        <Text style={styles.cardText}>Menstrual Cycles</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('FoodIntake')}>
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
                <View style={styles.cardMain}>
                    <Pressable onPress={() => navigation.navigate("DonationDetails", { id: donationData?._id })} >
                        <View style={styles.cardContainer}>
                            {donationData?.image == null ?
                                <Image source={require('../assets/donationIcon.png')} style={styles.cardImage} />
                                :
                                <Image source={{ uri: String(donationData?.image) }} style={styles.cardImage} />

                            }
                            {/* <Text style={styles.cardText}>{donationData?.foundationName}</Text> */}
                            <View style={styles.donateContent}>
                                <Text style={styles.cardText}>{donationData.title}</Text>
                                <Text style={styles.founderText}>{donationData.foundationName}</Text>
                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={100}
                                    step={1}  // Step value for whole numbers
                                    value={getPercentage}
                                    minimumTrackTintColor="#20C3D3"
                                    maximumTrackTintColor="gray"
                                    thumbTintColor="#20C3D3"
                                />

                                <View style={styles.donationmeta}>
                                    <Text style={styles.targetAmount}>Target - {donationData.targetAmount} INR</Text>
                                    <Text style={styles.duration}> {leftDays}/{totalDays} Days Left</Text>
                                </View>
                            </View>
                            {/* <Text>{" "} </Text>
                            <Text style={styles.cardText}>{homePageData?.donationPost[0]?.description}</Text> */}
                        </View>
                    </Pressable>
                </View>
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
                                        <Text style={styles.iconText}>10 <Image source={require('../assets/heart.png')} style={styles.blogicon} /></Text>
                                        <Text style={styles.iconText}>15 <Image source={require('../assets/message-text.png')} style={styles.blogicon} /></Text>
                                        <Text style={styles.iconText}>5 <Image source={require('../assets/sendIcon.png')} style={styles.blogicon} /></Text>
                                    </View>
                                </View>
                            )}
                            showsHorizontalScrollIndicator={false} // Hides the scroll bar
                        />
                    }
                </View>
            </ScrollView>
            <Footer />
        </View>
    )
}
const styles = StyleSheet.create({
    scrollcontainer: {
        paddingHorizontal: 16,
    },
    container: {
        height: '100%',
        backgroundColor: '#0A142A',
    },

    textStyle: {
        fontSize: 25,
        color: '#fff'
    },
    dailyTracker: {
        width: '100%',
        alignItems: 'flex-end',
        backgroundColor: '#232C3F',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 4,
        paddingRight: 7,
        marginBottom: 16,
    },
    dailyTrack: {
        flex: 1,
    },
    title: {
        color: 'white',
        fontSize: 12,
        marginBottom: 23,
        maxWidth: 160,
    },
    imageStye: {
        marginRight: 70,
        textAlign: 'right',
    },
    titleStyle: {
        flex: 1,
        paddingTop: 24,
        paddingLeft: 16,
        paddingBottom: 16,
    },
    subtitle: {
        color: '#00e6e6',
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
        backgroundColor: '#232C3F',
        padding: 10,
        alignItems: 'center',
        borderRadius: 4,
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    cardText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
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
        backgroundColor: '#232C3F',
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
        color: '#20C3D3',
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
    donateContent: {
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
