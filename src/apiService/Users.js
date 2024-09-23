import axios from 'axios'
import { API_URL } from '@env';
import { mergeData, storeData, removeData } from '../helper'

export const userDetailsApi = (id, token, setUserDetails) => {

    axios.get(`${API_URL}users/${id}`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setUserDetails(response?.data?.user);
        })
        .catch(function (error) {
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