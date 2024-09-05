import React,{useState} from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Footer from '../components/Footer'
export default function Settings() {
    const [selectedTab, setSelectedTab] = useState('insights')
    const notificationArr = [{
        imageUrl: require('../assets/Ellipse.png'),
        image: require('../assets/Rectangle1.png'),
        name: 'Pratibha Thakur',
        date: '2:32 pm 03rd sep 2024',
        description: 'Kingpin of ring that trafficked 12,000 west bengal girls held ',
        text: 'Making any realistic assessment of the scale of the those problems of trafficking in india is a difficult enterprise. while there are number...........'
    },
    {
        imageUrl: require('../assets/Ellipse.png'),
        image: require('../assets/Rectangle1.png'),
        name: 'Pratibha Thakur',
        date: '2:32 pm 03rd sep 2024',
        description: 'Kingpin of ring that trafficked 12,000 west bengal girls held ',
        text: 'Making any realistic assessment of the scale of the those problems of trafficking in india is a difficult enterprise. while there are number...........'
    },
    {
        imageUrl: require('../assets/Ellipse.png'),
        image: require('../assets/Rectangle1.png'),
        name: 'Pratibha Thakur',
        date: '2:32 pm 03rd sep 2024',
        description: 'Kingpin of ring that trafficked 12,000 west bengal girls held ',
        text: 'Making any realistic assessment of the scale of the those problems of trafficking in india is a difficult enterprise. while there are number...........'
    },
    {
        imageUrl: require('../assets/Ellipse.png'),
        image: require('../assets/Rectangle1.png'),
        name: 'Pratibha Thakur',
        date: '2:32 pm 03rd sep 2024',
        description: 'Kingpin of ring that trafficked 12,000 west bengal girls held ',
        text: 'Making any realistic assessment of the scale of the those problems of trafficking in india is a difficult enterprise. while there are number...........'
    }
    ]
    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.buttonStyle} >
                    <TouchableOpacity style={selectedTab === 'insights' ? styles.selected: styles.primaryButton} onPress={()=>setSelectedTab('insights')}>
                        <Text style={styles.buttonText}>Insights</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedTab === 'blogs' ? styles.selected: styles.primaryButton}  onPress={()=>setSelectedTab('blogs')}>
                        <Text style={styles.buttonText}>Blogs</Text>
                    </TouchableOpacity>
                </View>
                {notificationArr?.length > 0 && notificationArr?.map((data) => {
                    return (
                        <View style={styles.cardMain}>
                            <View style={styles.cardContainer}><Image source={data.imageUrl} style={styles.cardImage} />
                                <Text style={styles.cardName}>{data.name}</Text>
                            </View>
                            <View style={styles.textStyle}>
                                <Text style={styles.dateStyle} >{data.date}</Text>
                            </View>
                            <View>
                                <Image source={data.image} style={styles.banner} />
                            </View>
                            <Text style={styles.desTitle}>{data.description}</Text>
                            <Text style={styles.desText}>{data.text}</Text>
                            <View style={styles.imageStyle}>
                                <View style={styles.optionIcon}>
                                    <Text style={styles.desText}>12 </Text>
                                    <Image source={require('../assets/heart.png')} />
                                </View>
                                <View style={styles.optionIcon}>
                                    <Text style={styles.desText}>15 </Text>
                                    <Image  source={require('../assets/message-text.png')} />
                                </View>
                                <View style={styles.optionIcon}>
                                    <Text style={styles.desText}>1 </Text>
                                    <Image source={require('../assets/sendIcon.png')} />
                                </View>


                            </View>
                            <View style={styles.secondaryButton1}>
                                <TouchableOpacity style={styles.secondaryButton}>
                                    <Text style={styles.optionButton}>Like</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.secondaryButton}>
                                    <Text style={styles.optionButton}>Comments</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.secondaryButton}>
                                    <Text style={styles.optionButton}>Share</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
            <Footer />
        </View>
    )
}
const styles = StyleSheet.create({
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
    selected:{
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