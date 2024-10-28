import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import Footer from '../components/Footer'
import { useNavigation ,useIsFocused} from '@react-navigation/native'
import { getData, removeData, storeData } from '../helper';
import LoadingScreen from '../components/LoadingScreen';
import Moment from 'moment'
import { getMigraineLogApi } from '../apiService/MigraineLogApi';

export default function MigraineList() {
    const navigation = useNavigation();
    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = React.useState(false);
    const [migraineList, setMigraineList] = useState([])
    const [painArea, setPainArea] = useState([])
    const [reason, setReason] = useState([])
    const isFocused = useIsFocused();
    useEffect(() => {
        getData('token').then((token) => {            
            setToken(token);
        });
       
        removeData('updateMigrainLog');

    }, []);

    useEffect(() => {
        getData('updateMigrainLog').then((data) => {
            console.log(data,"data");
           
        });
        if(isFocused){
        getMigraineLogApi(token, setMigraineList, setIsLoading)
        }
    }, [isFocused,token]);
  
    const goToUpdate = (data) => {
        // Use Sets to ensure unique values
        const painArr = new Set([...painArea]);
        const reasonArr = new Set([...reason]);
    
        data?.painPosition.forEach((x) => {
            if (x?._id) painArr.add(x._id);
        });
    
        data?.painReason.forEach((x) => {
            if (x?._id) reasonArr.add(x._id);
        });
    
        const updatedPainArea = Array.from(painArr);
        const updatedReason = Array.from(reasonArr);
    
        setPainArea(updatedPainArea);
        setReason(updatedReason);
    
        const obj = {
            painPosition: updatedPainArea,
            painReason: updatedReason,
            painScale: data?.painScale,
            id: data?._id,
        };
    
        storeData('updateMigrainLog', obj);
        navigation.navigate('UpdatePainArea');
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper}>
                {migraineList?.length > 0 &&
                    migraineList?.map((x) => {
                        return (
                            <>
                                <View style={styles.summarywrapper}>
                                
                                    <View style={styles.summary}>
                                        <View style={styles.summaryleft}>
                                            <View style={styles.summarytext}>
                                                <Text style={styles.summarylable}>Start Time:</Text>
                                                <Text style={styles.summarydata}>{x?.startDate}, {x?.startTime}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.summaryright}>
                                            <View style={styles.summarytext}>
                                                <Text style={styles.summarylable}>End Time:</Text>
                                                <Text style={styles.summarydata}>{x?.endDate}, {x?.endTime}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.painsummarytext}>
                                        <Text style={styles.summarylable}>Pain Intensity:</Text>
                                        <Text style={styles.summarydata}>{x?.painScale}</Text>
                                    </View>
                                    {x?.painPosition?.length > 0 &&
                                        <View style={styles.painpoints}>
                                            <Text style={styles.summarylable}>Pain Points</Text>
                                            <View style={styles.databox}>
                                                {x?.painPosition?.map((item) => {
                                                    return (
                                                        <>
                                                            <View style={styles.databoxitem}>
                                                                {
                                                                    item?.positionName == "Left Back Of Head (Lower)" ?
                                                                        <Image source={require("../assets/left-back-head-lower.png")} style={styles.imageStyle} />
                                                                        : item?.positionName == "Left Back Of Head (Upper)" ?
                                                                            <Image source={require("../assets/left-back-head-upper.png")} style={styles.imageStyle} />
                                                                            : item?.positionName == "Left Back Of Neck" ?
                                                                                <Image source={require("../assets/left-back-neck.png")} style={styles.imageStyle} />
                                                                                : item?.positionName === "Between Eye" ?
                                                                                    <Image source={require("../assets/between-eye.png")} style={styles.imageStyle} />
                                                                                    : item?.positionName == "teeth" ?
                                                                                        <Image source={require("../assets/teeth.png")} style={styles.imageStyle} />
                                                                                        : item?.positionName == "Left-cheek" ?
                                                                                            <Image source={require("../assets/left-cheek.png")} style={styles.imageStyle} />
                                                                                            : item?.positionName === "Left front head" ?
                                                                                                <Image source={require("../assets/left-front-head.png")} style={styles.imageStyle} />
                                                                                                : item?.positionName == "Left-temple" ?
                                                                                                    <Image source={require("../assets/left-temple.png")} style={styles.imageStyle} />
                                                                                                    : item?.positionName == "Left eye" ?
                                                                                                        <Image source={require("../assets/left-eye.png")} style={styles.imageStyle} />
                                                                                                        : item?.positionName == "Right temple" ?
                                                                                                            <Image source={require("../assets/right-temple.png")} style={styles.imageStyle} />
                                                                                                            : item?.positionName == "Right Back Of Head (Lower)" ?
                                                                                                                <Image source={require("../assets/right-back-head-lower.png")} style={styles.imageStyle} />
                                                                                                                : item?.positionName == "Right Back Of Head (Upper)" ?
                                                                                                                    <Image source={require("../assets/right-back-head-upper.png")} style={styles.imageStyle} />
                                                                                                                    : item?.positionName == "Right Back Of Neck" ?
                                                                                                                        <Image source={require("../assets/right-back-neck.png")} style={styles.imageStyle} />
                                                                                                                        : item?.positionName == "Right cheek" ?
                                                                                                                            <Image source={require("../assets/right-cheek.png")} style={styles.imageStyle} />
                                                                                                                            : item?.positionName === "Right front head" ?
                                                                                                                                <Image source={require("../assets/right-front-head.png")} style={styles.imageStyle} />
                                                                                                                                : item?.positionName == "Right eye" &&
                                                                                                                                <Image source={require("../assets/right-eye.png")} style={styles.imageStyle} />
                                                                }
                                                                <Text style={styles.databoxitemtitle}>{item?.positionName}</Text>
                                                            </View>

                                                            {/* <Text>{item?.title}</Text> */}
                                                        </>
                                                    )
                                                })}
                                            </View>
                                        </View>
                                    }
                                    {x?.painReason?.length > 0 &&
                                        <View style={styles.painpoints}>
                                            <Text style={styles.summarylable}>Pain Reasons</Text>
                                            <View style={styles.databox}>
                                                {x?.painReason?.map((item) => {
                                                    return (
                                                        <>
                                                            <View style={styles.databoxitem}>
                                                                <Image style={styles.imageStyle} source={{ uri: item.image }} />
                                                                <Text style={styles.databoxitemtitle}>{item?.title}</Text>
                                                            </View>
                                                        </>
                                                    )
                                                })}
                                            </View>
                                        </View>
                                    }


                                <TouchableOpacity style={styles.arrowButton} onPress={()=> goToUpdate(x)}>
                                <Image source={require("../assets/edit-b.png")} style={styles.editstyle} />
                                    </TouchableOpacity>
                                    </View>
                                
                            </>)
                    })}
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
    imageStyle: { height: 30, width: 30, marginHorizontal: 'auto', marginBottom: 5, },

    wrapper: {
        paddingHorizontal: 16,
    },
    // editButton:{
    //       alignItems:'flex-end',
    //     justifyContent: 'flex-end',
    //     display: 'flex',
    //     flexWrap: 'wrap',

    // },
    arrowButton: {
        position: 'absolute',
        zIndex: 9999,
        top: 16,
        left: 'auto',
        right: 16,
        margin: 0,
        padding: 0,
        width: 16,
        height: 16,
    },
    summarywrapper: {
        display: 'flex',
        backgroundColor: '#D5D1BB',
        paddingTop: 16,
        borderRadius: 4,
        flexDirection: 'column',
        paddingBottom: 0,
        marginBottom: 24,
        flexWrap: 'wrap',
        position: 'relative',
    },
    summary: {
        width: '100%',
        flexDirection: 'row',
    },
    summaryleft: {
        flex: 1,
        paddingHorizontal: 16,
    },
    summaryright: {
        flex: 1,
        paddingHorizontal: 16,
    },
    summarytext: {
        color: '#6C727F',
        marginBottom: 16,
    },
    summarylable: {
        color: '#6C727F',
        fontSize: 12,
        marginBottom: 10,
    },
    summarydata: {
        color: '#6C727F',
        fontSize: 14,
        fontWeight: '600',
    },
    painpoints: {
        flexDirection: 'column',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    pheading: {
        color: '#6C727F',
        fontSize: 20,
        fontWeight: '200',
        marginBottom: 16,
    },
    databox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
    },
    databoxitem: {
        width: '15%',
        textAlign: 'center',
    },
    databoxitemtitle: {
        fontSize: 8,
        textAlign: 'center',
        color: '#6C727F',
    },
    painsummarytext: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    editstyle: {
        width: 16,
        height: 16,
        objectFit: 'scale-down',
    },
});