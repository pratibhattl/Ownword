import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Pressable, Dimensions } from 'react-native'
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
                                        {x?.painPosition?.map((item) => {
                                            return (
                                                <>
                                                    <View style={styles.summarytext}>
                                                        <Image source={{ uri: item?.image }} />
                                                        <Text style={styles.summarydata}>{item?.positionName}</Text>
                                                    </View>

                                                    {/* <Text>{item?.title}</Text> */}
                                                </>
                                            )
                                        })}
                                    </View>
                                }
                                {x?.painReason?.length > 0 &&
                                    <View style={styles.painpoints}>
                                        <Text style={styles.pheading}>Pain Reasons</Text>
                                        {x?.painReason?.map((item) => {
                                            return (
                                                <>
                                                    <View style={styles.summarytext}>
                                                        <Image source={{ uri: item?.image }} />
                                                        <Text style={styles.summarydata}>{item?.title}</Text>
                                                    </View>
                                                </>
                                            )
                                        })}
                                    </View>
                                }
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
    wrapper: {
        paddingHorizontal: 16,
    },
    summary: {
        backgroundColor: '#232C3F',
        paddingTop: 16,
        borderRadius: 4,
        flexDirection: 'row',
        paddingBottom: 0,
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
        backgroundColor: '#232C3F',
        paddingTop: 16,
        borderRadius: 4,
        flexDirection: 'row',
        paddingBottom: 0,
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    pheading: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '200',
    },
});