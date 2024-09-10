import axios from 'axios'
import { API_URL } from '@env';



export const getInsightsApi = (token, setInsightsList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}admins/get-insight`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            setInsightsList(response?.data?.data);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}


export const getBlogsApi = (token, setInsightsList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}admins/get-blog`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            console.log("sddsfsd", response?.data?.data);
            
            setInsightsList(response?.data?.data);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}