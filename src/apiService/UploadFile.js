import axios from 'axios'
import { API_URL } from '@env';

export const imageUploadApi = (data, token, setImageList) => {

    axios.post(`${API_URL}prepscription/upload-normal-image`, data, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setImageList(response?.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const getImageApi = (token, setImageList) => {
    axios.get(`${API_URL}prepscription/get-normal-image?page=1&limit=10`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            console.log('sdfsdf', response);

            setImageList(response?.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}