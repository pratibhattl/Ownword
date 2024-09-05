import axios from 'axios'
import { API_URL } from '@env';
import { mergeData } from '../helper'

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