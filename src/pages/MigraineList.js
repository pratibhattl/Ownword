import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native'
import Footer from '../components/Footer'
import { useNavigation } from '@react-navigation/native'
import { getData } from '../helper';
import LoadingScreen from '../components/LoadingScreen';
import { getMigraineLogApi } from '../apiService/MigraineLogApi';

export default function MigraineList() {
    const navigation = useNavigation();
    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = React.useState(false);
    const [migraineList, setMigraineList] = useState([])
    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });

    }, []);

    useEffect(() => {
        getMigraineLogApi(token, setMigraineList, setIsLoading)
    }, [token])

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
                                                                    item?.positionName === "Left Back Of Head (Lower)" ?
                                                                        <Image style={styles.imageStyle} source={require("../assets/left-back-head-lower.png")}  />
                                                                        :
                                                                        item?.positionName === "Left Back Of Head (Upper)" ?
                                                                            <Image style={styles.imageStyle} source={require("../assets/left-back-head-upper.png")}  />
                                                                            :
                                                                            item?.positionName === "Left Back Of Neck" ?
                                                                                <Image style={styles.imageStyle} source={require("../assets/left-back-neck.png")}  />
                                                                                :
                                                                                item?.positionName === "Between Eye" &&
                                                                                <Image style={styles.imageStyle} source={require("../assets/between-eye.png")} />
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
    imageStyle:{ height: 50, width: 50 ,marginHorizontal: 'auto'},
    wrapper: {
        paddingHorizontal: 16,
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