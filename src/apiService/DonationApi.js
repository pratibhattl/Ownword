import axios from 'axios'
import { API_URL_DEV } from '@env';

export const getDonationApi = (token,page,setHasMore,setDonationList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL_DEV}donation-post/list?page=${page}&limit=10000`, {
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
            // setHasMore()
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}



export const getSingleDonationApi = (token, id, setDonationDetails, setIsLoading) => {    
    setIsLoading(true)
    
    axios.get(`${API_URL_DEV}donation-post/${id}`, {
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