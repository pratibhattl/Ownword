import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity , TextInput} from 'react-native'
import Footer from '../components/Footer'
import { useForm, Controller } from 'react-hook-form';

import { useNavigation } from '@react-navigation/native'
import { getData } from '../helper';
import { getSingleFormApi ,addCommentApi} from '../apiService/ForamApi';
import LoadingScreen from '../components/LoadingScreen';

export default function Chat({ route }) {
    const navigation = useNavigation();
    const { control, handleSubmit,reset, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);

    const [token, setToken] = useState(null)
    const [foramDetails, setForamDetails] = useState({})
    const [commentList, setcommentList] = useState([])

    const [isLoading, setIsLoading] = React.useState(false);
    const { id } = route.params;
    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });

    }, []);

    useEffect(() => {
        getSingleFormApi(token, id, setForamDetails, setcommentList, setIsLoading)
    }, [token])

const onSubmit=(data)=>{
    setSubmitted(true)
    addCommentApi(token,id,data, setForamDetails,setcommentList, setIsLoading);
    reset();
}


    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.cardMain}>
                    <Text style={styles.textStyle}>{foramDetails?.title}</Text>
                    <View style={styles.cardContainer}>
                        <Text style={styles.cardText}>{foramDetails?.description}</Text>
                    </View>
                </View>
                {commentList?.length > 0 && commentList?.map((data) => {
                    return (
                        <View style={styles.cardMain}>
                            <View style={styles.cardContainer}><Image source={{ uri: data.profile_img }} style={styles.cardImage} />
                                <Text style={styles.cardName}>{data.comment}</Text>
                                <Text>{" "}</Text>
                            </View>
                            <View style={styles.textStyle}>
                                <Text style={styles.dateStyle} >{data.createdAt}</Text>
                            </View>
                        </View>
                    )
                })}
                
            </ScrollView>
            <Controller
                    control={control}
                    rules={{
                        required: 'Enter your comment',

                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                style={[styles.input, submitted && errors.comment ? styles.isInvalid : null]}
                                // placeholder="Email*"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                keyboardType="comment"
                                autoCapitalize="none"
                            />
                            {submitted && errors.comment && (
                                <Text style={styles.errorText}>{errors.comment.message}</Text>
                            )}
                        </>
                    )}
                    name="comment"
                />
            <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
            <Footer />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#0A142A'
    },
    textStyle: {
        color: '#fff',
        fontSize: 20

    },
    buttonText: {
        color: '#000',
        fontSize: 18,
    },
    dateStyle: {
        fontSize: 16,
        color: '#868686'
    },
    cardName: {
        fontSize: 16,
        color: '#20C3D3'
    },
    cardMain: {
        with: '100%',
        flexDirection: 'column',
        alignItems: 'end',
        padding: 10,
        backgroundColor: '#232C3F',
        borderRadius: 8,
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        marginRight: 10,
        marginLeft: 10
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%'
    },

    cardText: {
        fontSize: 16,
        color: '#fff',
    },
    input: {
        height: 50,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        color: '#fff',
        placeholderTextColor: "#fff",
        backgroundColor: '#232C3F',
    },
    isInvalid: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    linkText: {
        color: '#fff',
        textAlign: 'left',
        marginBottom: 15,
    },
    primaryButton: {
        backgroundColor: '#ffff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },

});