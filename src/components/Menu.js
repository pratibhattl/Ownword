import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import Footer from './Footer'
import { useNavigation } from '@react-navigation/native';
import { getData, removeData } from '../helper';
import LoadingScreen from './LoadingScreen';
import { userDetailsApi } from '../apiService/Users';
import {useIsFocused} from '@react-navigation/native';

export default function Menu() {
    const navigation = useNavigation();
    const [userDetails, setUserDetails] = useState({})
    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = React.useState(false);
    const isFocused = useIsFocused();

    const logout = () => {
        removeData('userDetails')
        removeData('token')
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigation.replace('Login')
        }, 2000)
    }


    useEffect(() => {
        getData('userDetails').then((data) => {
            setUserDetails(data);
        });
        getData('token').then((token) => {
            setToken(token);
        });

    }, [])
    useEffect(() => {
        if (isFocused) {
            userDetailsApi(userDetails?._id, token, setUserDetails,setIsLoading)
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