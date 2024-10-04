import axios from 'axios'
import { API_URL } from '@env';

export const getDonationApi = (token,setDonationList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}donation-post/list?page=1&limit=1000`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            // console.log('response', response?.data);
            setIsLoading(false)
            setDonationList(response?.data?.lists);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}



export const getSingleDonationApi = (token, id, setDonationDetails, setIsLoading) => {    
    setIsLoading(true)
    
    axios.get(`${API_URL}donation-post/${id}`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            // 'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            // console.log('response', response?.data);
            setIsLoading(false)
            setDonationDetails(response?.data?.result);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}