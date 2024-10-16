import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, Alert } from 'react-native'
import Footer from './Footer'
import { useNavigation } from '@react-navigation/native';
import { removeData } from '../helper';
import LoadingScreen from './LoadingScreen';
import { userDetailsApi } from '../apiService/Users';
import { useIsFocused } from '@react-navigation/native';
import { useAuth } from '../Context/AppContext';

export default function Menu() {
    const navigation = useNavigation();
    const { setIsLoggedin, setToken, token, setUserDetails, userDetails } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const isFocused = useIsFocused();
    const logout = () => {
        removeData('userDetails')
        removeData('token')
        setToken('')
        setUserDetails({})
        setIsLoading(true);
        setIsLoggedin(false);
        setTimeout(() => {
            setIsLoading(false);
            navigation.replace('Login')
        }, 2000)
    }

    useEffect(() => {
        if (isFocused) {
            try {
                const response = userDetailsApi(userDetails?._id, token, setIsLoading)
                setIsLoading(false)
                setUserDetails(response?.data?.user);

            } catch (error) {
                setIsLoading(false);
                if (error.response) {
                    Alert.alert(error?.response?.data?.message)
                }
                throw error;
            }
        }
    }, [isFocused]);



    if (isLoading) {
        return <LoadingScreen />;
    }


    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.container1}>
                    {userDetails?.profile_img ?
                        <Image style={styles.profileImage} source={{ uri: String(userDetails?.profile_img) }} />
                        :
                        <Image source={require('../assets/Ellipse.png')} style={styles.profileImage} />
                    }

                    <Text style={styles.textStyle}> {userDetails?.name}</Text>
                    <Text style={styles.text}> {userDetails?.email}</Text>
                </View>
                <View style={styles.menuStyle}>
                    <Image source={require('../assets/image2.png')} />
                    <Text style={styles.menuText} onPress={() => navigation.navigate('ImageUpload')}> {"Image uploading"}</Text>
                </View>
                <View style={styles.menuStyle}>
                    <Image source={require('../assets/fileIcon.png')} />
                    <Text style={styles.menuText} onPress={() => navigation.navigate('PrescriptionUpload')}> {"Prescription Upload"}</Text>
                </View>
                <View style={styles.menuStyle}>
                    <Image source={require('../assets/money-send.png')} />
                    <Text style={styles.menuText} onPress={() => navigation.navigate('Donation')}> {"Donations"}</Text>
                </View>
                {/* <View style={styles.menuStyle} >
                    <Image source={require('../assets/notify.png')} />
                    <Text style={styles.menuText} onPress={() => navigation.navigate('MigraineList')}> {"Migraine Logs"}</Text>
                </View> */}
                <View style={styles.menuStyle}>
                    <Image source={require('../assets/edit-2.png')} />
                    <Text style={styles.menuText} onPress={() => navigation.navigate('EditProfile')}> {"Edit Profile"}</Text>
                </View>
                <View style={styles.menuStyle} >
                    <Image source={require('../assets/notify.png')} />
                    <Text style={styles.menuText} onPress={() => navigation.navigate('Notification')}> {"Notifications"}</Text>
                </View>
                <View style={styles.menuStyle}>
                    <Image source={require('../assets/lock.png')} />
                    <Text style={styles.menuText} onPress={() => navigation.navigate('ChangePassword')}> {"Change Password"}</Text>
                </View>
                <View style={styles.menuStyle} >
                    <Image source={require('../assets/notify.png')} />
                    <Text style={styles.menuText} onPress={() => navigation.navigate('Foram')}> {"Chat"}</Text>
                </View>
                <View style={styles.menuStyle}>
                    <Image source={require('../assets/logout.png')} />
                    <Text style={styles.menuText} onPress={() => logout()}> {"Logout"}</Text>
                </View>
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
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 16,
        color: '#20C3D3',
        lineHeight: 26,
    },
    text: {
        fontSize: 15,
        color: '#fff',
        lineHeight: 26,
        marginBottom: 18,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#fff',
        marginVertical: 16,
    },
    menuStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 30,
        paddingVertical: 14,
    },
    menuText: {
        fontSize: 17,
        color: '#fff',
        marginLeft: 30,
    }
});