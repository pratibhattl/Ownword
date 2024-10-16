import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNavigationState } from '@react-navigation/native';
import { getData, storeData } from '../helper';
import { refreshTokenApi } from '../apiService/Users';
import { useAuth } from '../Context/AppContext';
const Header = ({ title }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const { token, userDetails } = useAuth();
    const navigation = useNavigation();
    const routeName = useNavigationState((state) => {
        const index = state.index;
        return state.routes[index].name;
    });
    
    const refreshTokenFun =async () => {
        try {
            const response =await refreshTokenApi(token, userDetails?._id);
            storeData('token', response?.data?.token)
        } catch (error) {
            setIsLoading(false);
            if (error.response) {
                Alert.alert(error?.response?.data?.message)
            }
            throw error;
        }
    }
    
    useEffect(() => {
        refreshTokenFun()
    }, [token,userDetails]);


    return (
        <View style={styles.headerContainer}>
            {routeName !== 'Home' &&
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/arrow-left.png')} />
                </TouchableOpacity>
            }
            {routeName !== 'Menu' &&
                <TouchableOpacity style={styles.button} >
                    {userDetails?.profile_img ?
                        <Image style={styles.profileImage} source={{ uri: String(userDetails?.profile_img) }} />
                        :
                        <Image source={require('../assets/Ellipse.png')} style={styles.profileImage} />
                    }
                </TouchableOpacity>
            }
            <View style={styles.titleContainer}>
                <Text style={styles.subtitle}>{title ? title : userDetails?.name}</Text>
            </View>
            <View style={styles.buttonsContainer}>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Notification')}>
                    <Image source={require('../assets/Bell.png')} />
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0A142A',
        padding: 10,
        elevation: 4, // Adds shadow on Android
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        color: '#fff'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    subtitle: {
        fontSize: 20,
        color: '#fff',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    button: {
        padding: 8,
    },
});

export default Header;