import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { getData } from '../helper';
import { getPositionApi } from '../apiService/MigraineLogApi';

export default function PainArea() {

    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedData, setSelectedData] = useState(null)
    const navigation = useNavigation();
    const [painArea, setPainArea] = useState([])
    const [positionList,setPositionList] = useState([])

    const onSubmit = (data) => {
        setSubmitted(true);
        // addMenstrualApi(token, data, setMenstrualList, setIsLoading)
    };
    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });
    }, [])

    const onSelectReason = (e) => {
        let arr = [...painArea]
        var index = arr.indexOf(e)
        if (index !== -1) {
            arr.splice(index, 1);
        } else {
            arr.push(e);
        }
        setPainArea(arr)
    }


    useEffect(() => {
        getPositionApi(token, setPositionList, setIsLoading)
    }, [token])

    if (isLoading) {
        return <LoadingScreen />;
    }


    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={styles.formWrap}>
                <Text style={styles.label}>Area of Pain</Text>

                    {/* <View style={styles.buttonStyle}>
                        <TouchableOpacity style={styles.secondoryButton} onPress={() => setSelectedData('FrontPain')}>
                            <Text style={styles.buttonText}>{"Front pain"} </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.secondoryButton} onPress={() => setSelectedData('BackPain')}>
                            <Text style={styles.buttonText}> {"Back pain"} </Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
                <View style={styles.grid}>
                {positionList?.map((x) => {
                        return (
                            <TouchableOpacity style={[painArea?.includes(x?._id) ? styles.card1 : styles.card]} onPress={() => onSelectReason(x?._id)}>
                                {/* <Image source={{ uri: x.image }} style={styles.icon} /> */}
                                <Text style={styles.cardText}>{x?.positionName}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView >
            <TouchableOpacity style={styles.arrowButton}
                onPress={() => navigation.navigate('MigraineReason',{state: painArea})}
            >
                <Image style={styles.arrowStyle} source={require('../assets/right-arrow.jpg')} />
            </TouchableOpacity>
            <Footer />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#0A142A',
    },
    buttonStyle: {
        marginBottom: 20
    },
    label:{
        color: '#fff',
        fontSize: 20
    },
    arrowButton: {
        alignItems: 'flex-end',
        padding: 20
    },
    formWrap: {
        padding: 10,
        margin: 10,
    },
    arrowStyle: {
        fontSize: 20,
        height: 50,
        width: 50
    },
    secondoryButton: {
        // width: '30%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        // marginBottom: 15,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#232C3F',
        width: '30%',
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    card1: {
        backgroundColor: '#EB7D26',
        width: '30%',
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    cardText: {
        color: 'white',
        fontSize: 12,
    },
})

// {selectedData == 'FrontPain' ?
//     <>
//         <TouchableOpacity style={styles.card} >
//             <Image source={require('../assets/Reason1.png')} style={styles.icon} />
//             <Text style={styles.cardText}>{'Left Back Of Head (Lower)'}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Menstrual')} >
//             <Image source={require('../assets/Reason2.png')} style={styles.icon} />
//             <Text style={styles.cardText}>Left Back Of Head (Upper)</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('FoodIntake')}>
//             <Image source={require('../assets/Reason3.png')} style={styles.icon} />
//             <Text style={styles.cardText}>Left Back Of Neck</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TimeInBed')}>
//             <Image source={require('../assets/Reason4.png')} style={styles.icon} />
//             <Text style={styles.cardText}>Left Cheek</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Medication')}>
//             <Image source={require('../assets/Reason5.png')} style={styles.icon} />
//             <Text style={styles.cardText}>Left Eye</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.card}>
//             <Image source={require('../assets/Reason6.png')} style={styles.icon} />
//             <Text style={styles.cardText}>Left Front Head</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.card}>
//             <Image source={require('../assets/Reason7.png')} style={styles.icon} />
//             <Text style={styles.cardText}>Left Temple</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('WaterIntake')}>
//             <Image source={require('../assets/Reason8.png')} style={styles.icon} />
//             <Text style={styles.cardText}>Between Eye</Text>
//         </TouchableOpacity>
//     </>

//     :
//     <>
//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Menstrual')} >
//             <Image source={require('../assets/Reason9.png')} style={styles.icon} />
//             <Text style={styles.cardText}>Right Back Of Head (Lower)</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.card}>
//             <Image source={require('../assets/Reason10.png')} style={styles.icon} />
//             <Text style={styles.cardText}>Right Back Of Head (Upper)</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('WaterIntake')}>
//             <Image source={require('../assets/Reason11.png')} style={styles.icon} />
//             <Text style={styles.cardText}>Right Back Of Neck</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Menstrual')} >
//             <Image source={require('../assets/Reason12.png')} style={styles.icon} />
//             <Text style={styles.cardText}>Right Cheek</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Menstrual')} >
//             <Image source={require('../assets/Reason9.png')} style={styles.icon} />
//             <Text style={styles.cardText}>Right Eye</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.card}>
//             <Image source={require('../assets/Reason10.png')} style={styles.icon} />
//             <Text style={styles.cardText}>Right Front Head</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('WaterIntake')}>
//             <Image source={require('../assets/Reason11.png')} style={styles.icon} />
//             <Text style={styles.cardText}>Right Temple</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Menstrual')} >
//             <Image source={require('../assets/Reason12.png')} style={styles.icon} />
//             <Text style={styles.cardText}>Teeth</Text>
//         </TouchableOpacity>
//     </>
// }