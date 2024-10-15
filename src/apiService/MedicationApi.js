import axios from 'axios'
import { API_URL } from '@env';

export const getMedicationApi = (token, setMedicationList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}medicine-reminder/user-list?page=1&limit=1000`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            // console.log('response', response?.data);
            setIsLoading(false)
            setMedicationList(response?.data?.result);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}
export const addMedicineApi = (token, details,setDetails, Alert, setMedicationList, setIsLoading) => {
    axios.post(`${API_URL}medicine-reminder/add`,details, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            Alert.alert("Medicine added successfully")
            getMedicationApi(token, setMedicationList, setIsLoading);
            setDetails(null)
        })
        .catch(function (error) {
            setIsLoading(false)
            if (error.response) {
                Alert.alert(error?.response?.data?.message)
              }
        });
}