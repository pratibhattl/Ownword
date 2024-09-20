import axios from 'axios'
import { API_URL } from '@env';

export const getTimeInBedApi = (token,setBedTimeList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}sleep-tracker/time-in-bed/details`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            setBedTimeList(response?.data?.result);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}



export const addBedTimeApi = (token,data,navigation, setIsLoading) => {
    setIsLoading(true)
    axios.post(`${API_URL}sleep-tracker/time-in-bed/create`, data,{
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
            console.log(error);
        });
}



export const updateBedTimeApi = (token, data, id, setIsLoading, navigation) => {
    
    setIsLoading(true)
    axios.put(`${API_URL}sleep-tracker/time-in-bed/stop/${id}`, data,{
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            console.log('response', response?.data);
            setIsLoading(false)
            // navigation.navigate('Home');
            alert("time updated successfully !!")

        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}

export const getTimeAsleepApi = (token,setAsleepTimeList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}sleep-tracker/time-asleep/details`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            setAsleepTimeList(response?.data?.result);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}

export const addAsleepTimeApi = (token,data,navigation, setIsLoading) => {
    setIsLoading(true)
    axios.post(`${API_URL}sleep-tracker/time-in-bed/create`, data,{
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            // console.log('response', response?.data?.result);
            setIsLoading(false)
            navigation.navigate('TimeAsleep');
            alert("Time added successfully !!")

        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}


export const updateTimeASpleepApi = (token, data, id, setIsLoading, navigation) => {
    
    setIsLoading(true)
    axios.put(`${API_URL}sleep-tracker/time-asleep/stop/${id}`, data,{
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            console.log('response', response?.data);
            setIsLoading(false)
            navigation.navigate('Home');
            alert("time updated successfully !!")

        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}