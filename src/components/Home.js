import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView,  FlatList, StyleSheet, Dimensions, TouchableOpacity, Image, Pressable } from 'react-native'
import Footer from '../components/Footer'
import { getData } from '../helper'
import LoadingScreen from './LoadingScreen'
import { useNavigation } from '@react-navigation/native';
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
      image:require('../assets/Rectangle.png'), // Replace with your image path
    },
  ];
export default function Home() {
    const [isLoading, setIsLoading] = React.useState(false);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await getData('token');
            setToken(storedToken);
            setIsLoading(false);
        };

        fetchToken();
    }, []);
    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <View style={styles.container}>
            <ScrollView >
                {/* <View style={styles.container}> */}
                <View style={styles.dailyTracker}>
                    <View style={styles.titleStyle}>
                        <Text style={styles.title}>Track every day and see what could cause attacks</Text>
                        <Text style={styles.subtitle}>Daily Tracker ⚡</Text>

                    </View>
                    <View style={styles.imageStye}>
                        <Image source={require('../assets/homeIcon.png')} style={styles.image} />
                    </View>
                </View>

                <View style={styles.grid}>
                    <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('WaterIntake')}>
                        <Image source={require('../assets/Frame.png')} style={styles.icon} />
                        <Text style={styles.cardText}>Water Intake</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} >
                        <Image source={require('../assets/Frame1.png')} style={styles.icon} />
                        <Text style={styles.cardText}>Menstrual Cycles</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <Image source={require('../assets/Frame2.png')} style={styles.icon} />
                        <Text style={styles.cardText}>Food Intake</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <Image source={require('../assets/Frame3.png')} style={styles.icon} />
                        <Text style={styles.cardText}>Sleep Pattern</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <Image source={require('../assets/Frame4.png')} style={styles.icon} />
                        <Text style={styles.cardText}>Medications</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <Image source={require('../assets/Frame5.png')} style={styles.icon} />
                        <Text style={styles.cardText}>Weather</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardMain}>
                    <Pressable onPress={() => navigation.navigate("DonationDetails")} >
                        <View style={styles.cardContainer}><Image source={notificationArr.imageUrl} 
                        style={styles.cardImage} />
                            <Text style={styles.cardText}>{notificationArr.title}</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.listStyle}> 
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
                                <Text style={styles.iconText}>❤️ 10</Text>
                                <Text style={styles.iconText}>💬 15</Text>
                                <Text style={styles.iconText}>🔄 5</Text>
                            </View>
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false} // Hides the scroll bar
                />
                </View>
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
        fontSize: 25,
        color: '#fff'
    },

    dailyTracker: {
        width: '100%',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#232C3F',
        flex: 1,
        display: 'flex',
        padding: 20,
        flexDirection: 'row'
    },
    title: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    imageStye: {
        marginRight: 70,
        width: '50%',
    },
    titleStyle: {
        width: '70%',
        marginEnd: 20
    },
    subtitle: {
        color: '#00e6e6',
        fontSize: 14,
    },
    image: {
        width: 80,
        height: 80,
        marginTop: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#232C3F',
        width: '30%',
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    cardText: {
        color: 'white',
        fontSize: 12,
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
        width: '52%'
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 10,
    },
    cardText1: {
        fontSize: 16,
        color: '#fff',
    },
    card1: {
        backgroundColor: '#232C3F',
        borderRadius: 10,
        marginRight: 10,
        width: screenWidth * 0.6, // Adjust card width relative to screen size
        padding: 10,
      },
      image1: {
        width: '100%',
        height: 120,
        borderRadius: 10,
      },
      title1: {
        color: 'white',
        fontSize: 14,
        marginVertical: 10,
      },
      iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      iconText: {
        color: '#a0a0a0',
        fontSize: 12,
      },
      listStyle:{
        margin: 10
      }
});
