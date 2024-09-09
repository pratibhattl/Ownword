import React from 'react'
import { View, Text, ScrollView, StyleSheet ,TouchableOpacity} from 'react-native'
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';

export default function Payment() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ScrollView>
            </ScrollView>
            <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Payment')} >
                <Text style={styles.buttonText}>Confirm</Text>
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
})