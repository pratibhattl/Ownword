import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/Group.png')} />
            <View>
                <Text style={styles.topText}> Onward </Text>
                <Text style={styles.textStyle}> The #1 Migraine and Headache Tracer </Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.primaryButton}  onPress={() => navigation.navigate(`Signup`)}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
                <Text style={styles.footertext} onPress={() => navigation.navigate(`Login`)}>Already have an Account? Login</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 35,
        paddingRight: 35,
        backgroundColor: '#0A142A',
    },
    logo: {
        resizeMode: 'contain',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
    },
    topText: {
        color: '#FFFFFF',
        fontSize: 30,
        textAlign: 'center'

    },
    textStyle: {
        color: '#FFFFFF',
        fontSize: 17,
        textAlign: 'center'
    },
    primaryButton: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        color: '#000',
        fontSize: 20,
    },
    
    footer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        paddingLeft: 35,
        paddingRight: 35,

    },
    footertext: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 17,
    },
})