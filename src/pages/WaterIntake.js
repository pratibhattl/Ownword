import React from 'react'
import { View ,ScrollView, StyleSheet} from 'react-native'
import Footer from '../components/Footer'

export default function WaterIntake() {
  return (
    <View style={styles.container}>
        <ScrollView>

            </ScrollView>
      <Footer/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#0A142A'
    },
    // container1: {
    //      backgroundColor: '#0A142A',
    //     height: '90%',
    // },
})