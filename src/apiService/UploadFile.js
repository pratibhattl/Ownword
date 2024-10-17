import axios from 'axios'
import { API_URL_DEV } from '@env';
import { Alert } from 'react-native';

export const getImageApi = (token, setImageList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL_DEV}prepscription/get-normal-image?page=1&limit=1000`, {
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
    axios.get(`${API_URL_DEV}prepscription/prepscription-list?page=1&limit=1000`, {
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
    console.log(formData, token,"sfsdfdsfdf");
    
    axios.post(`${API_URL_DEV}prepscription/upload-normal-image`, formData, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(function (response) {
            console.log(response,"response?.response");
            getImageApi(token, setImageList, setIsLoading)
        })
        .catch(function (error) {
            console.log(error,"error?.response");
            if (error?.response?.data) {
                Alert.alert(error?.response?.data?.error?.message?.message)
              }else{
                Alert.alert("Network error")
              }
        });
}

export const prescriptionUploadApi = (formData, token,setImageList, setIsLoading) => {
    axios.post(`${API_URL_DEV}prepscription/upload-prepscription`, formData, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(function (response) {
            getPrescriptionApi(token, setImageList, setIsLoading)
        })
        .catch(function (error) {
            if (error.response) {
               
                Alert.alert(error?.response?.data?.error?.message?.message)
              }
        });
}


