import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Button, TextInput } from 'react-native'
import Footer from '../components/Footer'
import { getData } from '../helper'
import LoadingScreen from '../components/LoadingScreen'
import { useNavigation } from '@react-navigation/native';
import { getMigraineReasonApi, updateMigraineLogApi, addNewReason } from '../apiService/MigraineLogApi';
import Modal from 'react-native-modal';
import DocumentPicker from 'react-native-document-picker';
const SweetAlert = ({ isVisible, onCancel, onSave }) => {
    const [title, setTitle] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const handleFilePicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setImageUri(res[0]);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.log('Unknown Error: ', err);
            }
        }
    };


    const handleSave = () => {

        onSave(title, imageUri);
    };

    return (
        <Modal isVisible={isVisible}>
            <View style={styles.alertContainer}>
                <Text style={styles.label}>Enter Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter title here"
                    value={title}
                    onChangeText={setTitle}
                />
                <Text style={styles.label}>Upload Image</Text>
                <Button title="Choose Image" onPress={handleFilePicker} />
                {imageUri && <Image source={{ uri: imageUri?.uri }} style={styles.image} />}
                <View style={styles.buttonContainer}>
                    <Button title="Cancel" onPress={onCancel} color="#f44336" />
                    <Button title="Save" onPress={handleSave} color="#4CAF50" />
                </View>
            </View>
        </Modal>
    );
};
export default function UpdateMigraineReason() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [migraineReason, setMigraineReason] = React.useState([]);
    const [reason, setReason] = useState([])
    const navigation = useNavigation();
    const [token, setToken] = useState(null)
    const [details, setDetails] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false);
    const handleSave = async (title, imageUri) => {
        // Handle save action
        var formData = new FormData();
        formData.append('image', imageUri)
        formData.append('title', title)
        try {
            const response = await addNewReason(token, formData, setIsLoading);
            setIsLoading(false);

            if (response?.data?.status == 201) {
                setModalVisible(false);
                alert(response?.data?.message)
                getMigraineReasonApi(token, setMigraineReason, setIsLoading)
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


    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await getData('token');
            setToken(storedToken);
            setIsLoading(false);
        };

        fetchToken();
    }, []);
    useEffect(() => {
        getMigraineReasonApi(token, setMigraineReason, setIsLoading)
    }, [token])


    useEffect(() => {
        getData('updateMigrainLog').then((data) => {
            setReason(data?.painReason);
            setDetails(data);
        });

    }, [])


    const onSelectReason = (e) => {
        setReason((prevReason) => {
            const arr = new Set(prevReason);
    
            if (arr.has(e)) {
                arr.delete(e);  // Remove if it exists
            } else {
                arr.add(e);     // Add if it doesn't exist
            }
    
            const updatedPainReason = Array.from(arr);
    
            // Update details based on the latest reason state
            setDetails((prevDetails) => ({
                ...prevDetails,
                painReason: updatedPainReason
            }));
    
            return updatedPainReason;
        });
    };

    const onSubmit = () => {

        if (!details?.painReason?.length > 0) {
            alert("Please select Pain reason !!")
        } else {
            updateMigraineLogApi(token, details, setIsLoading, navigation)
        }

    }


    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper}>
                {/* <View style={styles.container}> */}

                <View style={styles.grid}>
                    {migraineReason?.map((x) => {
                        return (
                            <TouchableOpacity style={[reason?.includes(x?._id) ? styles.card1 : styles.card]} onPress={() => onSelectReason(x?._id)}>
                                <Image source={{ uri: x.image }} style={styles.icon} />
                                <Text style={styles.cardText}>{x?.title}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>

                <TouchableOpacity style={styles.secondoryButton} onPress={() => setModalVisible(true)} >
                    <Text style={styles.arrowStyle}>Add new trigger</Text>
                </TouchableOpacity>
                <SweetAlert
                    isVisible={isModalVisible}
                    onCancel={handleCancel}
                    onSave={handleSave}
                />
            </ScrollView>
            <TouchableOpacity style={styles.arrowButton} onPress={() => onSubmit()} >
                <Image style={styles.arrowStyle} source={require('../assets/arrow-right.png')} />
            </TouchableOpacity>
            <Footer />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#EDE8D0',
    },
    alertContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    arrowStyle: {
        color: 'white',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },

    wrapper: {
        paddingHorizontal: 16,
    },
    textStyle: {
        fontSize: 25,
        color: '#fff'
    },
    arrowButton: {
        height: 54,
        width: 54,
        backgroundColor: '#964B00',
        borderRadius: 6,
        padding: 15,
        margin: 16,
        marginLeft: 'auto',
    },
    secondoryButton: {
        // width: '30%',
        color: '#fff',
        backgroundColor: '#964B00',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        // marginBottom: 15,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    dailyTracker: {
        width: '100%',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#232C3F',
        flex: 1,
        display: 'flex',
        padding: 20,
        flexDirection: 'row'
    },
    title: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    imageStye: {
        marginRight: 70,
        width: '50%',
    },
    titleStyle: {
        width: '70%',
        marginEnd: 20
    },
    subtitle: {
        color: '#00e6e6',
        fontSize: 14,
    },
    image: {
        width: 50,
        height: 50,
        marginTop: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#D5D1BB',
        width: '30%',
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 4,
    },
    card1: {
        backgroundColor: '#d5b799',
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
        color: '#6C727F',
        fontSize: 12,
        textAlign: 'center',
    },

});

