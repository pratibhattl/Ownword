import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, Button } from 'react-native'
import Footer from '../components/Footer'
import { getData } from '../helper'
import LoadingScreen from './LoadingScreen'
import { getInsightsApi, getBlogsApi, addLikeInsightApi, addLikeBlogsApi, addCommentBlogsApi } from '../apiService/InsightsApi'
import Modal from "react-native-modal";
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
    }, [selectedTab])

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
            <ScrollView >
                <View style={styles.buttonStyle} >
                    <TouchableOpacity style={selectedTab === 'Insight' ? styles.selected : styles.primaryButton} onPress={() => setSelectedTab('Insight')}>
                        <Text style={styles.buttonText}>Insights</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedTab === 'Blog' ? styles.selected : styles.primaryButton} onPress={() => setSelectedTab('Blog')}>
                        <Text style={styles.buttonText}>Blogs</Text>
                    </TouchableOpacity>
                </View>
                {insightsList?.length > 0 ? insightsList?.map((data) => {
                    return (
                        <View style={styles.cardMain}>
                            <View style={styles.cardContainer}>
                                {(data.insight_image || data.blog_image) !== null ?
                                    <Image source={{ uri: data.insight_image ? data.insight_image : data.blog_image }} style={styles.cardImage} />
                                    :
                                    <Image source={require('../assets/Rectangle.png')} style={styles.cardImage} />
                                }
                                <Text style={styles.cardName}>{data.title}</Text>
                            </View>
                            <View style={styles.textStyle}>
                                <Text style={styles.dateStyle} >{data.createdAt}</Text>
                            </View>
                            <View>
                                {(data.insight_image || data.blog_image) !== null ?
                                    <Image source={{ uri: data.insight_image ? data.insight_image : data.blog_image }} style={styles.banner} />
                                    :
                                    <Image source={require('../assets/Rectangle.png')} style={styles.banner} />
                                }
                            </View>
                            <Text style={styles.desTitle}>{data.description}</Text>
                            {/* <Text style={styles.desText}>{data.title}</Text> */}
                            <View style={styles.imageStyle}>
                                <View style={styles.optionIcon}>
                                    <Text style={styles.desText}>{data?.likesCount} </Text>
                                    {data?.isLiked == true ?
                                        <Text>❤️</Text>
                                        :
                                        <Image source={require('../assets/heart.png')} />
                                    }
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
                                    <Text style={styles.optionButton}>Like</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.secondaryButton} onPress={() => toggleModal(data?._id)} >
                                    <Text style={styles.optionButton}>Comments</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.secondaryButton}>
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
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
    },
    optionIcon: {
        margin: 20,
        flexDirection: 'row'
    },
    secondaryButton: {
        backgroundColor: '#0A142A',
        padding: 15,
    },
    banner: {
        width: '100%',
        height: 180
    },
    optionButton: {
        fontSize: 15,
        color: '#fff'
    },
    container: {
        height: '100%',
        backgroundColor: '#0A142A'
    },
    buttonStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    primaryButton: {
        backgroundColor: '#ffff',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15,
        width: '48%'
    },
    selected: {
        backgroundColor: '#20C3D3',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15,
        width: '48%'
    },

    buttonText: {
        color: '#000',
        fontSize: 16,
    },
    textStyle: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    imageStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    cardMain: {
        with: '100%',
        flexDirection: 'column',  // Horizontal layout
        alignItems: 'end',
        padding: 10,
        backgroundColor: '#232C3F',
        borderRadius: 8,
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,  // For Android shadow,
        marginRight: 10,
        marginLeft: 10
    },
    cardContainer: {
        flexDirection: 'row',  // Horizontal layout
        alignItems: 'center',  // Center content vertically
        width: '52%'
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 25,  // Circular image
        marginRight: 10,
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
        fontSize: 16,
        color: '#20C3D3'
    },
    desTitle: {
        fontSize: 17,
        color: '#20C3D3'
    },
    desText: {
        color: '#fff'
    }
});