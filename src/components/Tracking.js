import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import Footer from '../components/Footer'
export default function Tracking() {
   
    return (
        <View style={styles.container}>
            <ScrollView >
                <Text style={styles.textStyle}> {"Tracking"}</Text>
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
   
});