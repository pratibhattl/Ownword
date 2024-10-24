import axios from 'axios'
import { API_URL_DEV } from '@env';
import { removeData } from '../helper';

export const getMigraineLogApi = (token, setMedicationList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL_DEV}migraine-logs/user-log-list?page=1&limit=1000`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            // console.log('response', response?.data);
            setIsLoading(false)
            setMedicationList(response?.data?.lists);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}

export const getMigraineReasonApi = (token, setMigraineReason, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL_DEV}migraine-reason/get-all-reasons`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            setMigraineReason(response?.data?.lists);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}

export const getPositionApi = (token, setPositionList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL_DEV}migraine-position/get-all-positions`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            setPositionList(response?.data?.lists);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}


export const addNewTrigger = (token, details, setIsLoading, navigation) => {
    setIsLoading(true)

    axios.post(`${API_URL_DEV}migraine-logs/create-new-log`, details, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            removeData('migrainLog');
            alert("Log added successfully")
            navigation.navigate("MigraineLog")
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error?.response?.data?.error?.message?.message,"error?.response?.data?.error?.message?.message");
            
            if (error.response) {
                alert(error?.response?.data?.error?.message?.message)
            }
        });
}

export const updateNewTrigger = (token, details, id, setIsLoading, navigation) => {
    setIsLoading(true)

    axios.put(`${API_URL_DEV}migraine-logs/update-log-time/${id}`, details, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            removeData('migrainLog');
            setIsLoading(false)
            alert("Log updated successfully")
            navigation.navigate("Home")
        })
        .catch(function (error) {
            setIsLoading(false)

            if (error.response) {
                alert(error?.response?.data?.message)
            }
        });
}

export const getMigraneApi = (token, setMigraineList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL_DEV}migraine-logs/user-log-list?page=1&limit=10000`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            setMigraineList(response?.data?.lists);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}

export const addNewReason = (token, formData, setIsLoading) => {
    setIsLoading(true)
    try {
        const response = axios.post(`${API_URL_DEV}migraine-reason/create-new-reason`, formData, {
            headers: {
                'x-access-token': token,
                'Content-Type': 'multipart/form-data'
            }
        })
        return response;
    } catch (error) {
        setIsLoading(false);
        if (error.response) {
            alert(error?.response?.data?.error?.message)
        }
        throw error

    }
}

export const addNewPosition = (token, formData, setIsLoading) => {
    setIsLoading(true)
    try {
        const response = axios.post(`${API_URL_DEV}migraine-position/create-new-position`, formData, {
            headers: {
                'x-access-token': token,
                'Content-Type': 'multipart/form-data'
            }
        })
        return response;
    } catch (error) {
        setIsLoading(false);
        if (error.response) {
            alert(error?.response?.data?.error?.message)
        }
        throw error

    }
}

export const updateMigraineLogApi = (token, details, setIsLoading, navigation) => {
    let id = details?.id;
    let body ={
        painPosition: details?.painPosition,
            painReason: details?.painReason,
            painScale: details?.painScale,
    }
    setIsLoading(true)

    axios.put(`${API_URL_DEV}migraine-logs/edit-log/${id}`, body, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            if(response){
            removeData('updateMigrainLog');
            alert("Log updated successfully");
            navigation.navigate("MigraineList");
            }
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error?.response,"error?.response?.data?.error?.message?.message");
            
            if (error.response) {
                alert(error?.response?.data?.error?.message?.message)
            }
        });
}
