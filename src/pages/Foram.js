import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native'
import Footer from '../components/Footer'
import { useNavigation } from '@react-navigation/native'
import { getData } from '../helper';
import { getForamApi } from '../apiService/ForamApi';
import LoadingScreen from '../components/LoadingScreen';

export default function Foram() {
const navigation = useNavigation();
const [token, setToken] = useState(null)
const [foramList, setForamList] = useState([])
const [isLoading, setIsLoading] = React.useState(false);
useEffect(() => {
    getData('token').then((token) => {
        setToken(token);
    });
   
}, []);

useEffect(() => {
    getForamApi(token, setForamList, setIsLoading)
}, [token])


if (isLoading) {
    return <LoadingScreen />;
}

    return (
        <View style={styles.container}>
            <ScrollView >
                {foramList?.length > 0 && foramList?.map((data) => {
                    return (
                        <View style={styles.cardMain}>
                            <Pressable  onPress={()=> navigation.navigate("Chat",{id:data?._id})} > 
                                <Text style={styles.textStyle}>{data?.title}</Text>
                            <View style={styles.cardContainer}>
                                <Text style={styles.cardText}>{data?.description}</Text>
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
       color: '#fff',
        fontSize: 20

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
        width: '80%'
    },
   
    cardText: {
        fontSize: 16,
        color: '#fff',
    },
   
   
});