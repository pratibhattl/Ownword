import axios from 'axios'
import { API_URL_DEV } from '@env';

export const getTimeInBedApi = (token, setBedTimeList, setIsLoading, navigation) => {
    setIsLoading(true)
    axios.get(`${API_URL_DEV}sleep-tracker/get-tracking-list`, {
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
    axios.post(`${API_URL_DEV}sleep-tracker/create`, data, {
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
            alert("Log added successfully !!")

        })
        .catch(function (error) {
            setIsLoading(false)
            if (error.response) {
                alert(error?.response?.data?.message)
              }
        });
}



export const updateBedTimeApi = (token, data, setIsLoading, navigation) => {

    setIsLoading(true)
    axios.put(`${API_URL_DEV}sleep-tracker/update-sleep-tacket`, data, {
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
            alert("time updated successfully !!")

        })
        .catch(function (error) {
            setIsLoading(false)
            if (error.response) {
                alert(error?.response?.data?.message)
              }
        });
}

