import React, { useState, useEffect } from 'react'
import { View, Image, Text, ScrollView, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native'
import Footer from '../components/Footer'
import DocumentPicker from 'react-native-document-picker';
import { imageUploadApi, getImageApi } from '../apiService/UploadFile';
import { getData } from '../helper';
import LoadingScreen from '../components/LoadingScreen';

const data = [
    { id: '1', source: require('../assets/Rectangle.png'), title: 'Image 1' },
    { id: '2', source: require('../assets/Rectangle1.png'), title: 'Image 2' },
    { id: '3', source: require('../assets/Rectangle1.png'), title: 'Image 3' },
    { id: '4', source: require('../assets/Rectangle.png'), title: 'Image 4' },
    { id: '5', source: require('../assets/Rectangle.png'), title: 'Image 5' },
    { id: '6', source: require('../assets/Rectangle1.png'), title: 'Image 6' },
];

export default function ImageUpload() {
    const [token, setToken] = useState(null)
    const [imageList, setImageList] = useState([])
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        getData('token').then((token) => {
            setToken(token);
        });
    }, [])

    useEffect(() => {
        getImageApi(token, setImageList, setIsLoading)
    }, [token])

    const handleFilePicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            const formData = new FormData();
            formData.append('image', res[0])
            console.log( res[0],"dsfsfsdf");
            
            imageUploadApi(formData, token,setImageList, setIsLoading);
           

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.log('Unknown Error: ', err);
            }
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper}>
                <View style={styles.container1}>
                    <TouchableOpacity style={styles.dottedBox} onPress={handleFilePicker}>
                        <Image source={require('../assets/edit-g.png')} style={styles.smallicon} />
                        <Text style={styles.text}>Upload Picture</Text>
                    </TouchableOpacity>
                    {/* {fileResponse && (
                        <View style={styles.fileInfo}>
                            <Text style={styles.textStyle}>File Name: {fileResponse.name}</Text>
                            <Text style={styles.textStyle}>Type: {fileResponse.type}</Text>
                        </View>
                    )} */}
                </View>
                
                <FlatList
                    style={styles.flatview}
                    data={imageList}
                    keyExtractor={(item) => item._id}
                    numColumns={2} // Change this value to display the images in a grid format
                    renderItem={({ item }) => (
                        <View style={styles.imageContainer}>
                            <Image source={{uri: item.image}} style={styles.image} />
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
        backgroundColor: '#EDE8D0',
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    dottedBox: {
        width: '100%',
        height: 90,
        borderWidth: 2,
        borderColor: '#6C727F',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D5D1BB',
        gap: 17,
    },
    text: {
        fontSize: 15,
        color: '#6C727F',
        lineHeight: 22,
    },
    fileInfo: {
        marginTop: 20,
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    flatview: {
        paddingHorizontal: 8,
        paddingVertical: 0,
    },
    image: {
        width: Dimensions.get('window').width / 2 - 24, // Dynamic width for grid layout
        height: 150,
        marginVertical: 8,
        marginHorizontal: 8,
    },
    imageTitle: {
        marginTop: 8,
        fontSize: 16,
        color: '#333',
    },
});