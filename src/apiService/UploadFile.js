import axios from 'axios'
import { API_URL } from '@env';

export const getImageApi = (token, setImageList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}prepscription/get-normal-image?page=1&limit=1000`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            console.log('response', response?.data);
            setIsLoading(false)
            setImageList(response?.data?.prepscriptions);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}



export const getPrescriptionApi = (token, setImageList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}prepscription/prepscription-list?page=1&limit=1000`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            setImageList(response?.data?.prepscriptions);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}


export const imageUploadApi = (formData, token,setImageList, setIsLoading) => {
    axios.post(`${API_URL}prepscription/upload-normal-image`, formData, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(function (response) {
            getImageApi(token, setImageList, setIsLoading)
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const prescriptionUploadApi = (formData, token,setImageList, setIsLoading) => {
    axios.post(`${API_URL}prepscription/upload-prepscription`, formData, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(function (response) {
            getPrescriptionApi(token, setImageList, setIsLoading)
        })
        .catch(function (error) {
            console.log(error);
        });
}
