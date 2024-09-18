import axios from 'axios'
import { API_URL } from '@env';

export const getMenstrualApi = (token, setMenstrualList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}menstrual-cycle/user-list?page=1&limit=1000`, {
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
        startDate: details
    }
    // console.log(body,"body");
    
    axios.post(`${API_URL}menstrual-cycle/create`,body, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            // console.log('response', response?.data);
            alert("Medicine added")
            getMenstrualApi(token, setMenstrualList, setIsLoading);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}