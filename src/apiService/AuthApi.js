import axios from 'axios'
import { API_URL } from '@env';
import { mergeData, storeData } from '../helper'

export const userSignUpApi = (data, navigation) => {
  axios.post(`${API_URL}users/register`, data)
    .then(function (response) {
      mergeData('userDetails', response?.data?.user);
      storeData('token', response?.data?.token)

      navigation.navigate('Home')
    })
    .catch(function (error) {
      console.log(error);
      
    });
}


export const userLoginApi = (data, setIsLoading, navigation) => {
  setIsLoading(true);

  axios.post(`${API_URL}users/login`, data)
    .then(function (response) {      
      mergeData('userDetails', response?.data?.user);
      storeData('token', response?.data?.token)
      setIsLoading(false);
      navigation.navigate('Home')

    })
    .catch(function (error) {
      setIsLoading(false);
      console.log(error);
    });
}