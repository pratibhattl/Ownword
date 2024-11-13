import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Image style={styles.logo} source={require('../assets/Group.png')} />
                <Text style={styles.topText}> Onward </Text>
                <Text style={styles.textStyle}> The #1 Migraine and Headache Tracer </Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.primaryButton}  onPress={() => navigation.replace(`Signup`)}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
                <Text style={styles.footertext} onPress={() => navigation.replace(`Login`)}>Already have an Account? Login</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#EDE8D0',
        width: '100%',
    },
    body: {
        marginVertical: 'auto',
    },
    logo: {
        resizeMode: 'contain',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
    },
    topText: {
        color: '#6C727F',
        fontSize: 30,
        textAlign: 'center'
    },
    textStyle: {
        color: '#6C727F',
        fontSize: 17,
        textAlign: 'center'
    },
    primaryButton: {
        width: '100%',
        backgroundColor: '#964B00',
        borderRadius: 6,
        alignItems: 'center',
        marginBottom: 40,
        height: 54,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        lineHeight: 54,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 24,
        right: 24,
        width: '100%',
        paddingBottom: 40,
        marginTop: 'auto',
    },
    footertext: {
        textAlign: 'center',
        color: '#6C727F',
        fontSize: 16,
        margin: 0,
    },
})