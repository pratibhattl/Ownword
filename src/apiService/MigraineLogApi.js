import axios from 'axios'
import { API_URL } from '@env';

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