// Footer.js

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNavigationState } from '@react-navigation/native';
const Footer = () => {
  const navigation = useNavigation();
  const routeName = useNavigationState((state) => {
    const index = state.index;
    return state.routes[index].name;
  });

  // useEffect(()=>{
  //   console.log("routeName", routeName);

  // },[])
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Home')}>
        <Image source={require('../assets/home.png')} />
        <Text style={routeName == 'Home' ? styles.selectedIconText : styles.iconText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Insights')}>
        {routeName == 'Insights' ?
          <Image source={require('../assets/file-text1.png')} />
          :
          <Image source={require('../assets/file-text.png')} />
        }
        <Text style={routeName == 'Insights' ? styles.selectedIconText : styles.iconText}>Insights</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Tracking')}>
        {routeName == 'Tracking' ?
          <Image source={require('../assets/zap1.png')} />
          :
          <Image source={require('../assets/zapIcon.png')} />
        }
        <Text style={routeName == 'Tracking' ? styles.selectedIconText : styles.iconText}>Tracking</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
        {routeName == 'Settings' ?
          <Image source={require('../assets/settings1.png')} />
          :
          <Image source={require('../assets/settingsIcon.png')} />

        }
        <Text style={routeName == 'Settings' ? styles.selectedIconText : styles.iconText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Menu')}>
        {routeName == 'Menu' ?
          <Image source={require('../assets/grid1.png')} />
          :
          <Image source={require('../assets/gridIcon.png')} />
        }
        <Text style={routeName == 'Menu' ? styles.selectedIconText : styles.iconText}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#232C3F',
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: 20
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    marginTop: 4,
    color: '#20C3D3',
  },
  selectedIconText: {
    fontSize: 12,
    marginTop: 4,
    color: '#EB7D26',
  },
});

export default Footer;
