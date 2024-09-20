import axios from 'axios'
import { API_URL } from '@env';

export const getForamApi = (token,setForamList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}forum-post/list?page=1&limit=1000`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            console.log('response', response?.data);
            setIsLoading(false)
            setForamList(response?.data?.data);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}



export const getSingleFormApi = (token,id, setForamDetails,setcommentList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}forum-post/details/${id}`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            console.log(response?.data);
            
            setIsLoading(false)
            setForamDetails(response?.data?.data);
            setcommentList(response?.data?.comments);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}


export const addCommentApi = (token,id,data, setForamDetails,setcommentList, setIsLoading) => {
    axios.post(`${API_URL}forum-post/create-comment/${id}`, data,{
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            getSingleFormApi(token,id, setForamDetails,setcommentList, setIsLoading)
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}