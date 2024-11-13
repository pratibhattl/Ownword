import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Footer from './Footer'
import { useNavigation } from '@react-navigation/native';
import { removeData } from '../helper';
import LoadingScreen from './LoadingScreen';
import { userDetailsApi ,updateUserApi} from '../apiService/Users';
import { useIsFocused } from '@react-navigation/native';
import { useAuth } from '../Context/AppContext';
import Modal from 'react-native-modal';
export default function Menu() {
    const navigation = useNavigation();
    const { setIsLoggedin, setToken, token, setUserDetails, userDetails } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const isFocused = useIsFocused();
    const [details, setDetails] = useState({})
    const logout = () => {
        removeData('userDetails');
        removeData('token');
        removeData('migrainLog');
        removeData('updateMigrainLog');
        setToken('');
        setUserDetails({});
        setIsLoading(true);
        setIsLoggedin(false);
        setTimeout(() => {
            setIsLoading(false);
            navigation.replace('Welcome')
        }, 2000);
    }
    const getUserDetailsFunc = async () => {
        try {
            const response = await userDetailsApi(userDetails?._id, token, setIsLoading)
            setIsLoading(false);
            if (response?.data?.status == 200) {
                setDetails(response?.data?.user)
            }
        }
        catch (error) {
            setIsLoading(false);
            if (error.response) {
                alert(error?.response?.data?.error?.message)
            }
            throw error;
        }
    }

    useEffect(() => {
        if (isFocused) {
            getUserDetailsFunc()
        }
    }, [isFocused]);

    const [isModalVisible, setModalVisible] = useState(false);

    const handleDeleteAccount = () => {
        setModalVisible(true);
    };

    const confirmDeleteAccount = async () => {
        var formData = new FormData();
        formData.append('status', 'inactive')
        try {
            const response = await updateUserApi(token, formData, setIsLoading);            
            setIsLoading(false)
            if (response?.data?.status == 200) {
                alert(' Account deleted successfully');
                logout();
                setModalVisible(false);
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response) {
                alert(error?.response?.data?.error?.message)
            }
            throw error;
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
    }


    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.container1}>
                    {details?.profile_img ?
                        <Image style={styles.profileImage} source={{ uri: String(details?.profile_img) }} />
                        :
                        <Image source={require('../assets/Ellipse.png')} style={styles.profileImage} />
                    }

                    <Text style={styles.textStyle}> {details?.name}</Text>
                    <Text style={styles.text}> {details?.email}</Text>
                </View>
                <View style={styles.menuStyle}>
                    <Image source={require('../assets/image2.png')} />
                    <Text style={styles.menuText} onPress={() => navigation.navigate('ImageUpload')}> {"Image uploading"}</Text>
                </View>
                <View style={styles.menuStyle}>
                    <Image source={require('../assets/fileIcon.png')} />
                    <Text style={styles.menuText} onPress={() => navigation.navigate('PrescriptionUpload')}> {"Prescription Upload"}</Text>
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
                {/* <View style={styles.menuStyle}>
                    <Image source={require('../assets/money-send.png')} />
                    <Text style={styles.menuText} onPress={() => navigation.navigate('Donation')}> {"Donations"}</Text>
                </View> */}
              
                <View style={styles.menuStyle}>
                    <Image source={require('../assets/money-send.png')} />
                    <Text style={styles.menuText} onPress={() => navigation.navigate('Donation')}> {"Donations"}</Text>
                </View>
              
                <View style={styles.menuStyle}>
                    <Image source={require('../assets/logout.png')} />
                    <Text style={styles.menuText} onPress={() => logout()}> {"Logout"}</Text>
                </View>
                <View style={styles.menuStyle}>
                    <Image source={require('../assets/logout.png')} />
                    <Text style={styles.menuText} onPress={() => handleDeleteAccount()}> {"Delete Account"}</Text>
                </View>
                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={() => setModalVisible(false)}
                    onBackButtonPress={() => setModalVisible(false)}
                    style={styles.modal}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Delete Account</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure you want to delete your account? This action cannot be undone.
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.confirmButton]}
                                onPress={confirmDeleteAccount}
                            >
                                <Text style={styles.buttonText}>Yes, Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

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
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 16,
        color: '#964B00',
        lineHeight: 26,
    },
    text: {
        fontSize: 15,
        color: '#6C727F',
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
        color: '#6C727F',
        marginLeft: 30,
    },

    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    confirmButton: {
        backgroundColor: '#964B00',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});