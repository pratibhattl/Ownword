import axios from 'axios'
import { API_URL_DEV } from '@env';

export const getMedicationApi = (token, setMedicationList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL_DEV}medicine-reminder/user-list?page=1&limit=1000`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            //  console.log('response', response?.data);
            setMedicationList(response?.data?.result);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}
export const addMedicineApi = (token, details,setDetails, setMedicationList, setIsLoading) => {
    axios.post(`${API_URL_DEV}medicine-reminder/add`,details, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            alert("Medicine added successfully")
            getMedicationApi(token, setMedicationList, setIsLoading);
            setDetails(null)
        })
        .catch(function (error) {
            setIsLoading(false)            
            if (error.response) {
                alert(error?.response?.data?.error?.message)
              }
        });
}