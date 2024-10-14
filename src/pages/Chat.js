import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity , TextInput} from 'react-native'
import Footer from '../components/Footer'
import { useForm, Controller } from 'react-hook-form';

import { useNavigation } from '@react-navigation/native'
import { getData } from '../helper';
import { getSingleFormApi ,addCommentApi} from '../apiService/ForamApi';
import LoadingScreen from '../components/LoadingScreen';
import moment from 'moment';

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
            <ScrollView style={styles.wrapper}>
                <View style={styles.cardMain}>
                    <Text style={styles.textStyle}>{foramDetails?.title}</Text>
                    <View style={styles.cardContainer}>
                        <Text style={styles.cardText}>{foramDetails?.description}</Text>
                    </View>
                </View>
                {commentList?.length > 0 && commentList?.map((data) => {
                    return (
                        <View style={styles.chatMain}>
                            <Image source={require('../assets/Rectangle.png')} style={styles.cardImage} />
                            <View style={styles.chatContainer}>
                                
                                {/* <Image source={{ uri: data.profile_img }} style={styles.cardImage} /> */}
                                
                                {/* <Text>{" "}</Text> */}
                                <View style={styles.textStyle}>
                                    <Text style={styles.username} >Holly Harding</Text>
                                    <Text style={styles.dateStyle} >{moment(data.createdAt).format("DD/MM/YYYY hh:mm A")}</Text>
                                </View>

                                <Text style={styles.chatName}>{data.comment}</Text>
                            </View>
                        </View>
                    )
                })}
                
            </ScrollView>
            <View style={styles.chatBottom}>
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
                 <Image source={require('../assets/sendbig.png')} />
             </TouchableOpacity>
            </View>
            
            <Footer />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#0A142A'
    },
    wrapper: {
        paddingHorizontal: 16,
    },
    textStyle: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 24,
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
        borderBottomWidth: 1,
        borderBottomColor: '#232C3F',
        paddingBottom: 24,
        marginBottom: 24,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%'
    },
    cardText: {
        fontSize: 14,
        lineHeight: 24,
        color: '#8DCAFC',
        fontWeight: '300',
    },
    input: {
        height: 54,
        paddingHorizontal: 10,
        borderRadius: 54,
        color: '#fff',
        placeholderTextColor: "#fff",
        backgroundColor: 'rgba(255,255,255,0.1)',
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
        width: 44,
        height: 44,
        borderRadius: 44,
        backgroundColor: '#20C3D3',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 5,
        left: 'auto',
        right: 5,
    },
    cardImage: {
        width: 32,
        height: 32,
        borderRadius: 32,
    },

    chatMain: {
        with: '100%',
        flexDirection: 'row',
        paddingBottom: 24,
        marginBottom: 24,
    },
    chatContainer: {
        flexDirection: 'column',
        flex: 1,
        paddingLeft: 10,
    },
    chatText: {
        fontSize: 14,
        lineHeight: 24,
        color: '#8DCAFC',
        fontWeight: '300',
    },
    username: {
        fontSize: 16,
        color: '#20C3D3',
        marginBottom: 10,
    },
    dateStyle: {
        fontSize: 14,
        color: '#fff',
    },
    chatName:  {
        fontSize: 14,
        color: '#fff',
        fontWeight: '300',
    },
    chatBottom: {
        margin: 16,
        position: 'relative',
    },

});