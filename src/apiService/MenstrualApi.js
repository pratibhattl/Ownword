import axios from 'axios'
import { API_URL_DEV } from '@env';

export const getMenstrualApi = (token, setMenstrualList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL_DEV}menstrual-cycle/user-list?page=1&limit=1000`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            // console.log('response', response?.data);
            setIsLoading(false)
            setMenstrualList(response?.data?.lists);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}
export const addMenstrualApi = (token, details, setMenstrualList, setIsLoading) => {
    let body={
        startDate: details.startDate
    }
        
    axios.post(`${API_URL_DEV}menstrual-cycle/create`,body, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            
            alert("Menstrual cycle added")
            getMenstrualApi(token, setMenstrualList, setIsLoading);
        })
        .catch(function (error) {
            setIsLoading(false)
            if (error.response) {
                alert(error?.response?.data?.error?.message?.message)
              }
        });
}

export const updateMenstrualApi = (token, details,id, setMenstrualList, setIsLoading) => {
    let body={
        endDate: details.endDate
    }
    
    axios.put(`${API_URL_DEV}menstrual-cycle/update-end-date/${id}`,body, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            console.log('response', response?.data);
            alert("Menstrual cycle updated")
            getMenstrualApi(token, setMenstrualList, setIsLoading);
        })
        .catch(function (error) {
            setIsLoading(false)
            if (error.response) {
                alert(error?.response?.data?.error?.message?.message)
              }
        });
}