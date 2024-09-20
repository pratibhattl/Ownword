import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import Footer from './Footer'
import { useNavigation } from '@react-navigation/native';
import { getData, removeData } from '../helper';
import LoadingScreen from './LoadingScreen';

export default function Menu() {
    const navigation = useNavigation();
    const [userDetails, setUserDetails] = useState({})
    const [isLoading, setIsLoading] = React.useState(true);
    const logout = () => {
        removeData('userDetails')
        removeData('token')
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('Login')
        }, 2000)
    }


    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await getData('userDetails'); 
            setUserDetails(storedToken);
            setIsLoading(false); 
          };

          fetchToken()
    }, [])

    if (isLoading) {
        return <LoadingScreen />; 
      }
    

    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.container1}>
                    <Image source={require('../assets/Ellipse.png')} style={styles.profileImage} />
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
        fontSize: 20,
        color: '#20C3D3'
    },
    text: {
        fontSize: 15,
        color: '#fff'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    menuStyle: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 20
    },
    menuText: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 10
    }
});