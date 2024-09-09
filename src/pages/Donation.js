import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native'
import Footer from '../components/Footer'
import { useNavigation } from '@react-navigation/native'

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


    return (
        <View style={styles.container}>
            <ScrollView >
                {notificationArr?.length > 0 && notificationArr?.map((data) => {
                    return (
                        <View style={styles.cardMain}>
                            <Pressable  onPress={()=> navigation.navigate("DonationDetails")} > 
                            <View style={styles.cardContainer}><Image source={data.imageUrl} style={styles.cardImage} />
                                <Text style={styles.cardText}>{data.title}</Text>
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
        width: '52%'
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