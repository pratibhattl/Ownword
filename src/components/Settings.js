import React,{useState} from 'react'
import { View, Text, ScrollView, Switch, StyleSheet } from 'react-native'
import Footer from '../components/Footer'
export default function Settings() {
    // State to manage switch values
    const [isDarkModeEnabled, setDarkModeEnabled] = useState(false);
    const [isAnimationsEnabled, setAnimationsEnabled] = useState(true);

    // Handlers for switch toggles
    const toggleDarkMode = () => setDarkModeEnabled((previousState) => !previousState);
    const toggleAnimations = () => setAnimationsEnabled((previousState) => !previousState);

    return (
        <View style={styles.container}>
            <ScrollView >
                <Text style={styles.textStyle}> {"Settings"}</Text>

                <View style={styles.container1}>
                    {/* Dark Mode Toggle */}
                    <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>Dark Mode</Text>
                        <Switch
                            value={isDarkModeEnabled}
                            onValueChange={toggleDarkMode}
                            trackColor={{ false: '#767577', true: '#20C3D3' }}
                            thumbColor={isDarkModeEnabled ? '#20C3D3' : '#f4f3f4'}
                        />
                    </View>

                    {/* No Animations Toggle */}
                    <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>No Animations</Text>
                        <Switch
                            value={isAnimationsEnabled}
                            onValueChange={toggleAnimations}
                            trackColor={{ false: '#767577', true: '#20C3D3' }}
                            thumbColor={isAnimationsEnabled ? '#20C3D3' : '#f4f3f4'}
                        />
                    </View>
                </View>
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
    textStyle: {
        fontSize: 25,
        color: '#fff'
    },
    container1: {
        flex: 1,
        padding: 20,
        // backgroundColor: '#fff',
      },
      settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#fff',
      },
      settingLabel: {
        fontSize: 16,
        color: '#fff'
      },
});