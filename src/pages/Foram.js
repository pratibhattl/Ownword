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
            <ScrollView style={styles.wrapper}>
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
        backgroundColor: '#EDE8D0',
    },
    textStyle: {
        color: '#6C727F',
        fontSize: 20,
        fontWeight: '300',
        lineHeight: 28,
    },
    wrapper: {
        paddingHorizontal: 16,
    },
    cardMain: {
        with: '100%',
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: '#e0c9b3',
        paddingBottom: 24,
        marginBottom: 24,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
    },
    cardText: {
        fontSize: 14,
        lineHeight: 24,
        color: '#ab6f33',
        fontWeight: '300',
    },
   
   
});