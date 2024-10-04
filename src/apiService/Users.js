import axios from 'axios'
import { API_URL } from '@env';
import { mergeData, storeData, removeData } from '../helper'

export const userDetailsApi = (id, token, setUserDetails, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}users/${id}`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            // console.log(response?.data ,"dgdfgfdgdfgdgdg");
            setTimeout(() => {
                setIsLoading(false)

            }, 1000)
            setUserDetails(response?.data?.user);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}


export const changePasswordApi = (data, token, setMessage, navigation) => {

    axios.put(`${API_URL}users/edit-password`, data, {
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
            console.log(error);
        });
}


export const sendOtpApi = (data, navigation) => {

    axios.post(`${API_URL}users/serach-email-user`, data)
        .then(function (response) {
            storeData('otp', response?.data?.otp_code)
            navigation.navigate('ResetPassword')
            alert('Check your mail');
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const resetPasswordApi = (data, setMessage, navigation) => {

    axios.post(`${API_URL}users/reset-password`, data)
        .then(function (response) {
            // setMessage("updated s")
            navigation.navigate('Login')
            removeData('otp')
            alert('Password changed Successfully');
        })
        .catch(function (error) {
            console.log(error);
        });
}


export const updateUserApi = (token, formData, navigation,setUserDetails, setIsLoading) => {
    setIsLoading(true)
    axios.put(`${API_URL}users/update-profile`, formData, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(function (response) {
            mergeData('userDetails', response?.data?.user);
            setIsLoading(false)
            // navigation.navigate('Menu')
            userDetailsApi(response?.data?.user?._id, token, setUserDetails, setIsLoading)
            alert(' Profile Updated Successfully');
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}

export const getCountryApi = (token, setCountryList) => {

    axios.get(`${API_URL}country/get-country`, {
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

    axios.get(`${API_URL}country/get-states?country=${country}`, {
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
    axios.get(`${API_URL}donation-post/home`, {
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


export const refreshTokenApi = (token, id, setIsLoading) => {
    // setIsLoading(true)
    axios.get(`${API_URL}check-token?userId=${id}`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            // console.log(response?.data?.token, "Token refresh api");
            storeData('token', response?.data?.token)
            setIsLoading(false)

        })
        .catch(function (error) {
            // console.log(error, "erorrrrrrr");
            setIsLoading(false)
        });
}


export const getNotificationApi = (token,setNotificationList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}notification/user?page=1&limit=10000`, {
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