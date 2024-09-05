import React,{useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNavigationState } from '@react-navigation/native';
import { getData, getMultiple } from '../helper';

const Header = ({ title }) => {

    const navigation = useNavigation();
    const [userDetails, setUserDetails] = useState({})


    const routeName = useNavigationState((state) => {
        const index = state.index;
        return state.routes[index].name;
    });

    useEffect(() => {
        getData('userDetails').then((data) => {
            setUserDetails(data);
        });
        
    }, [])

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/arrow-left.png')} />
            </TouchableOpacity>
            {routeName !== 'Menu' &&
                <TouchableOpacity style={styles.button} >
                    <Image source={require('../assets/Ellipse.png')} style={styles.profileImage} />
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
        backgroundColor: '#213057',
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