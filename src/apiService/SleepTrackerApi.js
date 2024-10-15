import axios from 'axios'
import { API_URL } from '@env';
import { Alert } from 'react-native';

export const getTimeInBedApi = (token, setBedTimeList, setIsLoading, navigation) => {
    setIsLoading(true)
    axios.get(`${API_URL}sleep-tracker/get-tracking-list`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            setBedTimeList(response?.data?.result);

            if (response?.data?.result?.status == 'active') {
                navigation.navigate('TimeAsleep');
            }
           

        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}



export const addBedTimeApi = (token, data, navigation, setIsLoading) => {

    setIsLoading(true)
    axios.post(`${API_URL}sleep-tracker/create`, data, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            console.log('response', response?.data);
            setIsLoading(false)
            navigation.navigate('TimeAsleep');
            Alert.alert("Log added successfully !!")

        })
        .catch(function (error) {
            setIsLoading(false)
            if (error.response) {
                Alert.alert(error?.response?.data?.message)
              }
        });
}



export const updateBedTimeApi = (token, data, setIsLoading, navigation) => {

    setIsLoading(true)
    axios.put(`${API_URL}sleep-tracker/update-sleep-tacket`, data, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            console.log('response', response?.data);
            setIsLoading(false)
            navigation.navigate('TimeInBed');
            Alert.alert("time updated successfully !!")

        })
        .catch(function (error) {
            setIsLoading(false)
            if (error.response) {
                Alert.alert(error?.response?.data?.message)
              }
        });
}

