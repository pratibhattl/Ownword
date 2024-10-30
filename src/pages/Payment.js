import React,{useState} from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import Footer from '../components/Footer';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

export default function Payment() {
    const navigation = useNavigation();
    const [number, onChangeNumber] = React.useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    };
    const confirmFunction = () => {
        setModalVisible(false);
        navigation.navigate('Payment')
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper}>
                <Text style={styles.campaignText}>Donation for</Text>
                <View style={styles.donation}>
                    <Image style={styles.donationImage} source={require('../assets/donationIcon.png')} />
                    <Text style={styles.donationHeading}>Help people who can’t continue their education</Text>
                </View>
                <Text style={styles.campaignText}>Payment Info</Text>

                <View style={styles.amountarea}>
                    <Text style={styles.amountHeading}>Donation amount</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNumber}
                        value={number}
                        placeholder="50000"
                        placeholderTextColor='#fff'
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.refarea}>
                    <Text style={styles.refHeading}>Reference number</Text>
                    <Text style={styles.refContent}>#KTEO45303</Text>
                </View>

                <View style={styles.refarea}>
                    <Text style={styles.refHeading}>Payment method</Text>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.primaryButton} onPress={() => handleOpenModal()} >
                <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                onBackButtonPress={() => setModalVisible(false)}
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Your request has been submitted successfully.</Text>
                    <Text style={styles.modalMessage}>
                        Our team will get back to you within a few hours. For any additional inquiries, please email us at 
                        donate@onwardtech.co.in
                    </Text>
                    <View style={styles.buttonContainer}>
                       
                        <TouchableOpacity
                            style={[styles.button, styles.confirmButton]}
                            onPress={confirmFunction}
                        >
                            <Text style={styles.buttonText}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Footer />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#EDE8D0',
    },
    wrapper: {
        paddingHorizontal: 16,
    },
    primaryButton: {
        alignItems: 'center',
        margin: 16,
        backgroundColor: '#964b00',
        borderRadius: 6,
        height: 54,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        lineHeight: 54,
        fontWeight: 'bold'
    },

    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
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
    // buttonText: {
    //     color: 'white',
    //     fontWeight: 'bold',
    // },

    campaignText: {
        color: '#6C727F',
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 24,
    },
    donation: {
        padding: 16,
        backgroundColor: '#D5D1BB',
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    donationImage: {
        width: 120,
        height: 80,
        borderRadius: 2,
    },
    donationHeading: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '300',
        flex: 1,
        color: '#6C727F',
        paddingLeft: 16,
    },
    amountarea: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: '#D5D1BB',
        marginBottom: 24,
        borderRadius: 4,
    },
    amountHeading: {
        color: '#964b00',
        fontSize: 14,
        borderRadius: 4,
        marginBottom: 10,
    },
    input: {
        height: 44,
        borderRadius: 2,
        backgroundColor: '#EDE8D0',
        paddingHorizontal: 24,
        placeholderTextColor: '#6C727F',
        color: '#6C727F',
        fontSize: 16,
    },
    refarea: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: '#D5D1BB',
        marginBottom: 24,
        borderRadius: 4,
    },
    refHeading: {
        color: '#964b00',
        fontSize: 14,
        borderRadius: 4,
        marginBottom: 10,
    },
    refContent: {
        color: '#6C727F',
        fontSize: 20,
    },
})