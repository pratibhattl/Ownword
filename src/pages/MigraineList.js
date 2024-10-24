import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import Footer from '../components/Footer'
import { useNavigation ,useIsFocused} from '@react-navigation/native'
import { getData, removeData, storeData } from '../helper';
import LoadingScreen from '../components/LoadingScreen';
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
        if(isFocused){
        getMigraineLogApi(token, setMigraineList, setIsLoading)
        }
    }, [isFocused,token]);
  
    const  goToUpdate=(data)=>{
        let painArr = [...painArea]
        let reasonArr = [...reason]
        data?.painPosition.map((x) => {
            return (
                painArr.push(x?._id)
            )
        });
        data?.painReason.map((x)=>{
            return(
                reasonArr.push(x?._id)
            )
        });
        setPainArea(painArr)
        setReason(reasonArr)
        let obj = {
            painPosition: painArr,
            painReason: reasonArr,
            painScale: data?.painScale,
            id: data?._id
        }
        storeData('updateMigrainLog', obj);
        navigation.navigate('UpdatePainArea');
    }

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
                                <View style={styles.editButton}> 
                                <TouchableOpacity style={styles.arrowButton} onPress={()=> goToUpdate(x)}>
                                   <Text> Edit</Text> 
                                    </TouchableOpacity>
                                    </View>
                                    <View style={styles.summary}>
                                        <View style={styles.summaryleft}>
                                            <View style={styles.summarytext}>
                                                <Text style={styles.summarylable}>Start Date:</Text>
                                                <Text style={styles.summarydata}>{x?.startDate}</Text>
                                            </View>
                                            <View style={styles.summarytext}>
                                                <Text style={styles.summarylable}>Start Time:</Text>
                                                <Text style={styles.summarydata}>{x?.startTime}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.summaryright}>
                                            <View style={styles.summarytext}>
                                                <Text style={styles.summarylable}>End Date:</Text>
                                                <Text style={styles.summarydata}>{x?.endDate}</Text>
                                            </View>
                                            <View style={styles.summarytext}>
                                                <Text style={styles.summarylable}>End Time:</Text>
                                                <Text style={styles.summarydata}>{x?.endTime}</Text>
                                            </View>
                                            <View style={styles.summarytext}>
                                                <Text style={styles.summarylable}>Pain Scale:</Text>
                                                <Text style={styles.summarydata}>{x?.painScale}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {x?.painPosition?.length > 0 &&
                                        <View style={styles.painpoints}>
                                            <Text style={styles.pheading}>Pain Points</Text>
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
                                            <Text style={styles.pheading}>Pain Reasons</Text>
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
        backgroundColor: '#0A142A'
    },
    imageStyle: { height: 50, width: 50, marginHorizontal: 'auto' },
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
        height: 40,
        width: 50,
        backgroundColor: '#20C3D3',
        borderRadius: 6,
        padding: 10,
        margin: 10,
     // marginLeft: 'auto',
    },
    summarywrapper: {
        display: 'flex',
        backgroundColor: '#232C3F',
        paddingTop: 16,
        borderRadius: 4,
        flexDirection: 'column',
        paddingBottom: 0,
        marginBottom: 24,
        flexWrap: 'wrap',
    },
    summary: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 24,
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
    },
    summarydata: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '200',
    },
    painpoints: {
        flexDirection: 'column',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    pheading: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '200',
        marginBottom: 16,
    },
    databox: {
        flexDirection: 'row',
        gap: 16,
    },
    databoxitem: {
        backgroundColor: '#0A142A',
        padding: 10,
        borderRadius: 4,
        width: '33%',
        textAlign: 'center'
    },
    databoxitemtitle: {
        fontSize: 12,
        textAlign: 'center',
        color: '#fff',
    },
});