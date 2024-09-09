import React from 'react'
import { View, Text, StyleSheet, ScrollView,TouchableOpacity, Image } from 'react-native'
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';

export default function DonationDetails() {
const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.imageStyle}>
                    <Image source={require('../assets/donationIcon.png')} />
                    <Text style={styles.textStyle}>{"Help people who can’t continue their education"}</Text>
                </View>
                <View>
                <Text style={styles.daysStyle}>{"9/16 Days Left"} </Text>

                </View>
            </ScrollView>
             <TouchableOpacity style={styles.primaryButton} onPress={()=> navigation.navigate('Payment')} >
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
    imageStyle: {
        alignItems: 'center',
    },
    textStyle: {
        color: '#fff',
        fontSize: 20,
        marginTop: 20
    },
    daysStyle:{
        alignItems:'flex-start',
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