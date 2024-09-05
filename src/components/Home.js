import React,{useEffect, useState} from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import Footer from '../components/Footer'
import { getData } from '../helper'
import LoadingScreen from './LoadingScreen'

export default function Home() {
    const [isLoading, setIsLoading] = React.useState(false);
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
                <Text style={styles.textStyle}> {"Home page"}</Text>
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
