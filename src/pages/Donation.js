import React, { useState, useEffect ,useCallback} from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Pressable, Dimensions ,ActivityIndicator} from 'react-native'
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
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(1);
    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });

    }, []);

   
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

        return {
            totalDays,
            validLeftDays,
            percentage,
        };
    };
    const fetchNextPage = useCallback(() => {
        if (!isLoading && !hasMore) return null;
    
        if (!isLoading && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      }, [isLoading, hasMore]);
    
      useEffect(() => {
        getDonationApi(token,page,setHasMore, setDonationList, setIsLoading)
    }, [token])

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper}>
                {donationList?.length > 0 && donationList?.map((data) => {
                    const { totalDays, validLeftDays, percentage } = calculateDonationDetails(data);
                    return (
                        <View style={styles.cardMain}>
                            <Pressable onPress={() => navigation.navigate("DonationDetails", { id: data?._id })} >
                                <View style={styles.cardContainer}>
                                    <Image source={{ uri: data.image }} style={styles.cardImage} />
                                    <View style={styles.cardContent}>
                                        <Text style={styles.cardText}>{data.title}</Text>
                                        <Text style={styles.founderText}>{data.foundationName}</Text>

                                        <View style={styles.progressbarwrapper}>
                                            <View style={[styles.progressbar, { width: data?.targetAmount ? `${data?.targetAmount}` : '0%' }]}></View>

                                        </View>
                                        {/* <Slider
                                            style={styles.slider}
                                            minimumValue={0}
                                            maximumValue={100}
                                            step={1}  // Step value for whole numbers
                                            value={percentage}
                                            minimumTrackTintColor="#20C3D3"
                                            maximumTrackTintColor="gray"
                                            thumbTintColor="#20C3D3"
                                        /> */}
                                        <View style={styles.donationmeta}>
                                            <Text style={styles.targetAmount}>Target - {data?.targetAmount} INR</Text>
                                            <Text style={styles.duration}>
                                                {validLeftDays}/{totalDays} Days Left
                                            </Text>
                                        </View>
                                    </View>

                                </View>
                            </Pressable>
                        </View>
                    )
                })}
                {isLoading && hasMore && (
                    <View style={{ paddingVertical: 20 }}>
                        <ActivityIndicator size="large" />
                    </View>
                )}

                {!isLoading && hasMore ? (
                    <Text
                        onPress={fetchNextPage}
                        style={{
                            color: '#fff',
                            marginVertical: 5,
                            marginHorizontal: 10,
                            textAlign: 'right',
                            fontSize: 15,
                            fontFamily: Theme.FontFamily.normal,
                        }}>
                        Load More
                    </Text>
                ) : (
                    ''
                )}
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
    slider: {
        width: '90%',
        height: 50,
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
        marginBottom: 10,
    },
    progressbarwrapper: {
        backgroundColor: '#D5D1BB',
        width: '100%',
        height: 6,
        borderRadius: 10,
        marginVertical: 10,
    },
    progressbar: {
        backgroundColor: '#964b00',
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
        color: '#6C727F',
        marginBottom: 10,
    },
    founderText: {
        fontSize: 12,
        color: '#964b00',
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