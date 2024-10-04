import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, Button } from 'react-native'
import Footer from '../components/Footer'
import { getData } from '../helper'
import LoadingScreen from './LoadingScreen'
import { getInsightsApi, getBlogsApi, addLikeInsightApi, addLikeBlogsApi, addCommentBlogsApi } from '../apiService/InsightsApi'
import Modal from "react-native-modal";
import Moment from 'moment'
export default function Insights() {
    const [selectedTab, setSelectedTab] = useState('Insight');
    const [token, setToken] = useState(null)
    const [insightsList, setInsightsList] = useState([])
    const [isLoading, setIsLoading] = React.useState(false);
    const [userDetails, setUserDetails] = useState({})
    const [isModalVisible, setModalVisible] = useState(false);
    const [comment, setComment] = useState(null);
    const [commentId, setCommentId] = useState(null);

    const toggleModal = (id) => {
        setModalVisible(!isModalVisible);
        setCommentId(id)
    };
    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });
        getData('userDetails').then((data) => {
            setUserDetails(data);
        });
    }, []);

    // console.log(insightsList, "insightsListinsightsList");


    useEffect(() => {
        if (selectedTab == 'Insight') {
            getInsightsApi(token, setInsightsList, setIsLoading)
        } else if (selectedTab == 'Blog') {
            getBlogsApi(token, setInsightsList, setIsLoading)
        } else {
            getInsightsApi(token, setInsightsList, setIsLoading)
        }
    }, [token,selectedTab])


    const likeBlogFunc = (details) => {
        let data = {
            reference_id: details?._id,
            user_id: userDetails?._id,
            reference_type: selectedTab
        }
        if (selectedTab == 'Blog') {
            addLikeBlogsApi(token, data, details?.isLiked, setInsightsList, setIsLoading)
        } else if (selectedTab == 'Insight') {
            addLikeInsightApi(token, data, details?.isLiked, setInsightsList, setIsLoading)

        }

    }

    const commentFun = () => {
        let data = {
            "reference_id": commentId,
            "comment": comment,
            "reference_type": selectedTab,
            "user_id": userDetails?._id
        }
        addCommentBlogsApi(token, data, setInsightsList, setIsLoading, toggleModal)
    }


    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonStyle} >
                <TouchableOpacity style={selectedTab === 'Insight' ? styles.selected : styles.primaryButton} onPress={() => setSelectedTab('Insight')}>
                    <Text style={styles.buttonText}>Insights</Text>
                </TouchableOpacity>
                <TouchableOpacity style={selectedTab === 'Blog' ? styles.selected : styles.primaryButton} onPress={() => setSelectedTab('Blog')}>
                    <Text style={styles.buttonText}>Blogs</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollcontainer}>
                {insightsList?.length > 0 ? insightsList?.map((data) => {
                    return (
                        <View style={styles.cardMain}>
                            <View style={styles.cardHeader}>
                                <View style={styles.cardContainer}>
                                    {(data.insight_image || data.blog_image) !== null ?
                                        <Image source={{ uri: data.insight_image ? data.insight_image : data.blog_image }} style={styles.cardImage} />
                                        :
                                        <Image source={require('../assets/Rectangle.png')} style={styles.cardImage} />
                                    }
                                </View>
                                <View style={styles.textStyle}>
                                    <Text style={styles.cardName}>Admin</Text>
                                    <Text style={styles.dateStyle} >{Moment(data.createdAt).format("DD/MM/YYYY HH:MMA")}</Text>
                                </View>
                            </View>
                            <View>
                                {(data.insight_image || data.blog_image) !== null ?
                                    <Image source={{ uri: data.insight_image ? data.insight_image : data.blog_image }} style={styles.banner} />
                                    :
                                    <Image source={require('../assets/Rectangle.png')} style={styles.banner} />
                                }
                            </View>
                            <View style={styles.cardContent}>
                                <Text style={styles.cardName}>{data.title}</Text>
                                <Text style={styles.desTitle}>{data.description}</Text>
                            </View>
                            {/* <Text style={styles.desText}>{data.title}</Text> */}
                            <View style={styles.imageStyle}>
                                <View style={styles.optionIcon}>
                                    <Text style={styles.desText}>{data?.likesCount} </Text>
                                    <Image source={require('../assets/heart.png')} />
                                </View>
                                <View style={styles.optionIcon}>
                                    <Text style={styles.desText}>{data?.commentsCount} </Text>
                                    <Image source={require('../assets/message-text.png')} />
                                </View>
                                {/* <View style={styles.optionIcon}>
                                    <Text style={styles.desText}> </Text>
                                    <Image source={require('../assets/sendIcon.png')} />
                                </View> */}
                            </View>
                            <View style={styles.secondaryButton1}>
                                <TouchableOpacity style={styles.secondaryButton} onPress={() => likeBlogFunc(data)}>
                                    <Image source={require('../assets/heart-w.png')} style={styles.smallicon} />
                                    <Text style={styles.optionButton}>Like</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.secondaryButton} onPress={() => toggleModal(data?._id)} >
                                    <Image source={require('../assets/message-text-w.png')} style={styles.smallicon} />
                                    <Text style={styles.optionButton}>Comments</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.secondaryButton}>
                                    <Image source={require('../assets/send-w.png')} style={styles.smallicon} />
                                    <Text style={styles.optionButton}>Share</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })
                    :
                    <Text style={{ justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: 20 }}>No data added !!</Text>
                }
                <View style={{ flex: 1, }}>

                    <Modal isVisible={isModalVisible}>
                        <View style={{ flex: 1, justifyContent: 'center', height: 50 }}>
                            <Text>Hello!</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(e) => setComment(e)}
                            />
                            <Button title="Comment" onPress={() => commentFun()} />
                        </View>
                    </Modal>
                </View>
            </ScrollView>
            <Footer />
        </View>
    )
}
const styles = StyleSheet.create({
    scrollcontainer:{
        paddingHorizontal: 16,
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
    secondaryButton1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        gap: 12,
    },
    optionIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: '#0A142A',
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: 37,
        gap: 6,
    },
    banner: {
        width: '100%',
        height: 225,
    },
    cardContent: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    }, 
    optionButton: {
        fontSize: 13,
        color: '#fff',
    },
    container: {
        height: '100%',
        backgroundColor: '#0A142A',
    },
    buttonStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    primaryButton: {
        backgroundColor: '#ffff',
        borderRadius: 30,
        alignItems: 'center',
        width: '48%',
        height: 32,
    },
    selected: {
        backgroundColor: '#20C3D3',
        borderRadius: 30,
        alignItems: 'center',
        width: '48%',
        height: 32,
    },
    buttonText: {
        color: '#000',
        fontSize: 14,
        lineHeight: 32,
    },
    textStyle: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    imageStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        gap: 24,
    },
    cardMain: {
        with: '100%',
        flexDirection: 'column',  // Horizontal layout
        alignItems: 'end',
        backgroundColor: '#232C3F',
        borderRadius: 8,
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,  // For Android shadow,
    },
    cardContainer: {
        width: 44,
        height: 44,
        marginRight: 14,
    },
    cardHeader: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: 'row',
    },
    cardImage: {
        width: 44,
        height: 44,
        borderRadius: 30,  // Circular image
    },
    cardText: {
        fontSize: 16,
        color: '#fff',
    },
    dateStyle: {
        fontSize: 16,
        color: '#868686'
    },
    cardName: {
        fontSize: 17,
        lineHeight: 24,
        color: '#20C3D3',
        marginBottom: 12,
    },
    desTitle: {
        fontSize: 13,
        lineHeight: 15,
        color: '#fff'
    },
    desText: {
        color: '#6C727F'
    }
});