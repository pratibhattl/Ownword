import axios from 'axios'
import { API_URL } from '@env';
import { Alert } from 'react-native';

export const getMigraineLogApi = (token, setMedicationList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}migraine-logs/user-log-list?page=1&limit=1000`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            // console.log('response', response?.data);
            setIsLoading(false)
            setMedicationList(response?.data?.lists);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}


export const getMigraineReasonApi = (token, setMigraineReason, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}migraine-reason/get-all-reasons`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            // console.log('responsesdfsfsdfsdf', response?.data);
            setIsLoading(false)
            setMigraineReason(response?.data?.lists);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}


export const getPositionApi = (token, setPositionList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}migraine-position/get-all-positions`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            console.log('responsesdfsfsdfsdf', response?.data);
            setIsLoading(false)
            setPositionList(response?.data?.lists);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}


export const addNewTrigger = (token, details, setIsLoading,navigation) => {
    setIsLoading(true)
    
    axios.post(`${API_URL}migraine-logs/create-new-log`,details, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            Alert.alert("Log added successfully")
            navigation.navigate("MigraineLog")
        })
        .catch(function (error) {
            setIsLoading(false)
            if (error.response) {
                Alert.alert(error?.response?.data?.message)
              }
        });
}

export const updateNewTrigger = (token, details,id, setIsLoading,navigation) => {
    setIsLoading(true)
    
    axios.put(`${API_URL}migraine-logs/update-log-time/${id}`,details, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            console.log(response?.data,"respo");
            
            setIsLoading(false)
            Alert.alert("Log updated successfully")
            navigation.navigate("Home")
        })
        .catch(function (error) {
            setIsLoading(false)
            if (error.response) {
                Alert.alert(error?.response?.data?.message)
              }
        });
}



export const getMigraneApi = (token, setMigraineList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}migraine-logs/user-log-list?page=1&limit=10000`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            // console.log('responsesdfsfsdfsdf', response?.data);
            setIsLoading(false)
            setMigraineList(response?.data?.lists);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}