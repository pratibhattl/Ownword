import axios from 'axios'
import { API_URL } from '@env';
import { mergeData, storeData } from '../helper'
import { Alert } from 'react-native';

export const userSignUpApi = (data, navigation) => {
  axios.post(`${API_URL}users/register`, data)
    .then(function (response) {
      mergeData('userDetails', response?.data?.user);
      storeData('token', response?.data?.token)
      navigation.replace('Home')
    })
    .catch(function (error) {
      if (error.response) {
        Alert.alert(error?.response?.data?.message)
      } 
    });
}


export const userLoginApi = (data, setIsLoading, navigation) => {
  setIsLoading(true);

  axios.post(`${API_URL}users/login`, data)
    .then(function (response) {      
      mergeData('userDetails', response?.data?.user);
      storeData('token', response?.data?.token)
      setIsLoading(false);
      navigation.replace('Home')

    })
    .catch(function (error) {
      setIsLoading(false);
      if (error.response) {
        Alert.alert(error?.response?.data?.message)
      } 
    });
}