import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Button, Text, TextInput, Alert } from 'react-native';
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { getData } from '../helper';
import { getPositionApi, addNewPosition } from '../apiService/MigraineLogApi';
import { mergeData } from '../helper';
import Slider from '@react-native-community/slider';
import Modal from 'react-native-modal';
const SweetAlert = ({ isVisible, onCancel, onSave }) => {
    const [positionName, setPositionName] = useState('');

    const handleSave = () => {
        onSave(positionName);
    };

    return (
        <Modal isVisible={isVisible}>
            <View style={styles.alertContainer}>
                <Text style={styles.label2}>Enter new pain area</Text>
                <TextInput
                    style={styles.input2}
                    placeholder="Enter new pain area name here"
                    value={positionName}
                    onChangeText={setPositionName}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Cancel" onPress={onCancel} color="#f44336" />
                    <Button title="Save" onPress={handleSave} color="#4CAF50" />
                </View>
            </View>
        </Modal>
    );
};

export default function PainArea() {
    const [painLevel, setPainLevel] = useState(0);
    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedData, setSelectedData] = useState(null)
    const navigation = useNavigation();
    const [painArea, setPainArea] = useState([])
    const [positionList, setPositionList] = useState([])
    const [details, setDetails] = useState(null)
    const [logDetails, setLogDetails] = useState(null)



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
        setDetails({
            ...details,
            painPosition: arr
        })
    }


    useEffect(() => {
        getPositionApi(token, setPositionList, setIsLoading)
    }, [token])


    // const onGoForward = () => {
    //     let data = {
    //         ...logDetails,
    //         details
    //     }
    //     if (!details?.painPosition?.length > 0) {
    //         alert("Please select Pain position !!")
    //     }
    //     else if (!details?.painScale) {
    //         alert("Please select Pain scale lavel !!")
    //     }
    //     else {
    //         navigation.navigate('MigraineReason');
    //         mergeData('migrainLog', data);
    //     }
    // }
    const onGoForward = () => {
        let obj = {};
        getData('migrainLog').then(data => {
          setLogDetails(data);
          obj= {...data, ...details};
          
          if (!details?.painPosition?.length > 0) {
            alert('Please select Pain position !!');
          } else if (!details?.painScale) {
            alert('Please select Pain scale lavel !!');
          } else {
            navigation.navigate('MigraineReason');
            mergeData('migrainLog', obj);
          }
        });
      };
    
    const [isModalVisible, setModalVisible] = useState(false);

    const handleSave = async (positionName) => {
        // Handle save action
        let body = {
            "positionName": positionName
        }

        try {
            const response = await addNewPosition(token, body, setIsLoading);
            setIsLoading(false);

            if (response?.data?.result) {
                setModalVisible(false);
                alert(response?.data?.message)
                getPositionApi(token, setPositionList, setIsLoading)
            }

        } catch (error) {
            setIsLoading(false);
            if (error.response) {
                alert(error?.response?.data?.error?.message)
            }
            throw error;
        }
    };

    const handleCancel = () => {
        // Handle cancel action
        setModalVisible(false);
    };

    if (isLoading) {
        return <LoadingScreen />;
    }


    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper}>
                <View style={styles.formWrap}>
                    <Text style={styles.label}>Select Your Pain Level: {painLevel}</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={10}
                        step={1}  // Step value for whole numbers
                        value={painLevel}
                        onValueChange={(value) => {
                            setPainLevel(value),
                                setDetails({
                                    ...details,
                                    painScale: value
                                })
                        }}
                        minimumTrackTintColor="red"
                        maximumTrackTintColor="gray"
                        thumbTintColor="red"
                    />
                </View>
                <View style={styles.grid}>
                    {positionList?.map((x) => {
                        return (
                            <TouchableOpacity style={[painArea?.includes(x?._id) ? styles.card1 : styles.card]} onPress={() => onSelectReason(x?._id)}>
                                {
                                    x?.positionName == "Left Back Of Head (Lower)" ?
                                        <Image source={require("../assets/left-back-head-lower.png")} style={styles.icon} />
                                        : x?.positionName == "Left Back Of Head (Upper)" ?
                                            <Image source={require("../assets/left-back-head-upper.png")} style={styles.icon} />
                                            : x?.positionName == "Left Back Of Neck" ?
                                                <Image source={require("../assets/left-back-neck.png")} style={styles.icon} />
                                                : x?.positionName === "Between Eye" ?
                                                    <Image source={require("../assets/between-eye.png")} style={styles.icon} />
                                                    : x?.positionName == "teeth" ?
                                                        <Image source={require("../assets/teeth.png")} style={styles.icon} />
                                                        : x?.positionName == "Left-cheek" ?
                                                            <Image source={require("../assets/left-cheek.png")} style={styles.icon} />
                                                            : x?.positionName === "Left front head" ?
                                                                <Image source={require("../assets/left-front-head.png")} style={styles.icon} />
                                                                : x?.positionName == "Left-temple" ?
                                                                    <Image source={require("../assets/left-temple.png")} style={styles.icon} />
                                                                    : x?.positionName == "Left eye" ?
                                                                        <Image source={require("../assets/left-eye.png")} style={styles.icon} />
                                                                        : x?.positionName == "Right temple" ?
                                                                            <Image source={require("../assets/right-temple.png")} style={styles.icon} />
                                                                            : x?.positionName == "Right Back Of Head (Lower)" ?
                                                                                <Image source={require("../assets/right-back-head-lower.png")} style={styles.icon} />
                                                                                : x?.positionName == "Right Back Of Head (Upper)" ?
                                                                                    <Image source={require("../assets/right-back-head-upper.png")} style={styles.icon} />
                                                                                    : x?.positionName == "Right Back Of Neck" ?
                                                                                        <Image source={require("../assets/right-back-neck.png")} style={styles.icon} />
                                                                                        : x?.positionName == "Right cheek" ?
                                                                                            <Image source={require("../assets/right-cheek.png")} style={styles.icon} />
                                                                                            : x?.positionName === "Right front head" ?
                                                                                                <Image source={require("../assets/right-front-head.png")} style={styles.icon} />
                                                                                                : x?.positionName == "Right eye" &&
                                                                                                <Image source={require("../assets/right-eye.png")} style={styles.icon} />
                                }
                                <Text style={styles.cardText}>{x?.positionName}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                {/* <TouchableOpacity style={styles.secondoryButton} onPress={() => setModalVisible(true)} >
                    <Text >Add new trigger</Text>
                </TouchableOpacity> */}
                <SweetAlert
                    isVisible={isModalVisible}
                    onCancel={handleCancel}
                    onSave={handleSave}
                />
            </ScrollView >
            <TouchableOpacity style={styles.arrowButton}
                onPress={() => onGoForward()}
            >
                <Image style={styles.arrowStyle} source={require('../assets/arrow-right.png')} />
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
    alertContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    label2: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    input2: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },

    wrapper: {
        paddingHorizontal: 16,
    },
    label1: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    label: {
        color: '#fff',
        fontSize: 20
    },
    arrowStyle: {
        height: 24,
        width: 24,
        backgroundColor: '#20C3D3',
        borderRadius: 6,
    },
    arrowButton: {
        height: 54,
        width: 54,
        backgroundColor: '#20C3D3',
        borderRadius: 6,
        padding: 15,
        margin: 16,
        marginLeft: 'auto',
    },
    formWrap: {
    },
    secondoryButton: {
        // width: '30%',
        color: '#000',
        backgroundColor: '#20C3D3',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    input: {
        // width: '60%',
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
        borderRadius: 4,
    },
    card1: {
        backgroundColor: '#2F1908',
        width: '30%',
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 4,
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    cardText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
    },
    wrapper: {
        paddingHorizontal: 16,
    }
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