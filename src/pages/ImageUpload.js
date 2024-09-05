import React, { useState, useEffect } from 'react'
import { View, Image, Text, ScrollView, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native'
import Footer from '../components/Footer'
import DocumentPicker from 'react-native-document-picker';
import { imageUploadApi , getImageApi} from '../apiService/UploadFile';
import { getData } from '../helper';

const data = [
    { id: '1', source: require('../assets/Rectangle.png'), title: 'Image 1' },
    { id: '2', source: require('../assets/Rectangle1.png'), title: 'Image 2' },
    { id: '3', source: require('../assets/Rectangle1.png'), title: 'Image 3' },
    { id: '4', source: require('../assets/Rectangle.png'), title: 'Image 4' },
    { id: '5', source: require('../assets/Rectangle.png'), title: 'Image 5' },
    { id: '6', source: require('../assets/Rectangle1.png'), title: 'Image 6' },
];

export default function ImageUpload() {
    const [fileResponse, setFileResponse] = useState({});
    const [token, setToken] = useState(null)
    const [imageList, setImageList] = useState([])

    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });
    }, [])

    useEffect(() => {
        getImageApi(token, setImageList)
        // imageUploadApi('file',token, setImageList)
    }, [token])
    // const handleFilePicker = async () => {
    //     try {
    //         const res = await DocumentPicker.pick({
    //             type: [DocumentPicker.types.allFiles],
    //         });
    //         console.log(res, "res");
    //         setFileResponse(res);
    //     } catch (err) {
    //         if (DocumentPicker.isCancel(err)) {
    //             // User cancelled the picker, exit any dialogs or menus and move on
    //         } else {
    //             throw err;
    //         }
    //     }
    // };

    // useEffect(() => {
    //     console.log(fileResponse, "fileResponse");

    // }, [fileResponse])

    // const handleFileUpload = async () => {
    //     if (!fileResponse) return;
    //     console.log(fileResponse, "fileResponse");

    //     const data = new FormData();
    //     data.append('file', {
    //         uri: fileResponse.uri,
    //         type: fileResponse.type,
    //         name: fileResponse.name,
    //     });

    //     try {
    //         const response = await axios.post('YOUR_UPLOAD_URL', data, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         console.log('File uploaded successfully', response.data);
    //     } catch (error) {
    //         console.error('File upload failed', error);
    //     }
    // };

    const handleFilePicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setFileResponse(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.log('Unknown Error: ', err);
            }
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.container1}>
                    <TouchableOpacity style={styles.dottedBox} onPress={handleFilePicker}>
                        <Text style={styles.text}>Tap to Upload File</Text>
                    </TouchableOpacity>
                    {/* {fileResponse && (
                        <View style={styles.fileInfo}>
                            <Text style={styles.textStyle}>File Name: {fileResponse.name}</Text>
                            <Text style={styles.textStyle}>Type: {fileResponse.type}</Text>
                        </View>
                    )} */}
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    numColumns={2} // Change this value to display the images in a grid format
                    renderItem={({ item }) => (
                        <View style={styles.imageContainer}>
                            <Image source={item.source} style={styles.image} />
                            <Text style={styles.imageTitle}>{item.title}</Text>
                        </View>
                    )}
                />
            </ScrollView>
            <Footer />
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#0A142A'
    },

    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    dottedBox: {
        width: '100%',
        height: 100,
        borderWidth: 2,
        borderColor: '#AEAEAE',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        color: '#fff',
    },
    fileInfo: {
        marginTop: 20,
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },
    image: {
        width: Dimensions.get('window').width / 2 - 30, // Dynamic width for grid layout
        height: 150,
        borderRadius: 10,
    },
    imageTitle: {
        marginTop: 8,
        fontSize: 16,
        color: '#333',
    },
});