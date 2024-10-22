import axios from 'axios'
import { API_URL_DEV } from '@env';
import { storeData, removeData } from '../helper'

export const userDetailsApi = (id, token, setIsLoading) => {
    setIsLoading(true)
    try {
        const response = axios.get(`${API_URL_DEV}users/${id}`, {
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json',
                'Custom-Header': 'CustomHeaderValue'
            }
        })
        return response;
    } catch (error) {
        setIsLoading(false)
        console.log(error);
        throw error;
    }
}


export const changePasswordApi = (data, token, setMessage, navigation) => {

    axios.put(`${API_URL_DEV}users/edit-password`, data, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            navigation.navigate(-1)
            // setMessage("updated s")
            alert('Password changed Successfully');
        })
        .catch(function (error) {
            if (error.response) {
                alert(error?.response?.data?.error?.message)
            }
        });
}


export const sendOtpApi = (data, navigation) => {

    axios.post(`${API_URL_DEV}users/serach-email-user`, data)
        .then(function (response) {
            storeData('otp', response?.data?.otp_code)
            navigation.navigate('ResetPassword')
            alert('Check your mail');
        })
        .catch(function (error) {
            if (error.response) {
                alert(error?.response?.data?.error?.message)
            }
        });
}

export const resetPasswordApi = (data, setMessage, navigation) => {

    axios.post(`${API_URL_DEV}users/reset-password`, data)
        .then(function (response) {
            // setMessage("updated s")
            navigation.navigate('Login')
            removeData('otp')
            alert('Password changed Successfully');
        })
        .catch(function (error) {
            if (error.response) {
                alert(error?.response?.data?.error?.message)
            }
        });
}


export const updateUserApi = (token, formData, setIsLoading) => {
    setIsLoading(true)
    try {
        const response = axios.put(`${API_URL_DEV}users/update-profile`, formData, {
            headers: {
                'x-access-token': token,
                'Content-Type': 'multipart/form-data'
            }
        })
        return response;
    } catch (error) {
        setIsLoading(false)
        console.log(error);
        throw error;
    }

}

export const getCountryApi = (token, setCountryList) => {

    axios.get(`${API_URL_DEV}country/get-country`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setCountryList(response?.data?.countryList);
        })
        .catch(function (error) {
            console.log(error);
        });
}


export const getStateApi = (token, country, setStateList) => {

    axios.get(`${API_URL_DEV}country/get-states?country=${country}`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setStateList(response?.data?.states?.states);
        })
        .catch(function (error) {
            console.log(error);
        });
}



export const getHomeApi = (token, setHomePageData, setdonationData, setIsLoading) => {

    setIsLoading(true)
    axios.get(`${API_URL_DEV}donation-post/home`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {

            setIsLoading(false)
            let arr = response?.data?.blogs?.length > 0 ? response?.data?.blogs : []
            let obj = response?.data?.donationPost?.length > 0 ? response?.data?.donationPost[0] : {}

            setHomePageData(arr);
            setdonationData(obj)
        })
        .catch(function (error) {
            console.log(error);
            setIsLoading(false)
        });
}


export const refreshTokenApi = (token, id) => {

    try {
        const response = axios.get(`${API_URL_DEV}check-token?userId=${id}`, {
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json',
                'Custom-Header': 'CustomHeaderValue'
            }
        })
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getNotificationApi = (token, setNotificationList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL_DEV}notification/user?page=1&limit=10000`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            console.log('response', response?.data);
            setIsLoading(false)
            setNotificationList(response?.data?.lists);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}