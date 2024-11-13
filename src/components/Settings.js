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
                

                <View style={styles.container1}>
                    {/* Dark Mode Toggle */}
                    <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>Dark Mode</Text>
                        <Switch
                            value={isDarkModeEnabled}
                            onValueChange={toggleDarkMode}
                            trackColor={{ false: '#767577', true: '#964B00' }}
                            thumbColor={isDarkModeEnabled ? '#ffffff' : '#f4f3f4'}
                        />
                    </View>

                    {/* No Animations Toggle */}
                    <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>No Animations</Text>
                        <Switch
                            value={isAnimationsEnabled}
                            onValueChange={toggleAnimations}
                            trackColor={{ false: '#767577', true: '#964B00' }}
                            thumbColor={isAnimationsEnabled ? '#ffffff' : '#f4f3f4'}
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
        backgroundColor: '#EDE8D0',
    },
    textStyle: {
        fontSize: 24,
        color: '#fff',
        fontWeight: '300',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    container1: {
        flex: 1,
        // backgroundColor: '#fff',
      },
      settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        // borderBottomWidth: 1,
        // borderBottomColor: '#fff',
      },
      settingLabel: {
        fontSize: 16,
        color: '#6C727F',
      },
});