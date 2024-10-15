import axios from 'axios'
import { API_URL } from '@env';

export const getWaterIntakeApi = (token, setIntakeList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}intake/user-water-consumption-data`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {                        
            setIsLoading(false)
            setIntakeList(response?.data?.result);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}


export const createWaterIntakeApi = (token, data,setIntakeList, setIsLoading) => {
    setIsLoading(true)
    axios.post(`${API_URL}intake/create-water-consumption`, data,{
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            alert('water intake log added')
            getWaterIntakeApi(token, setIntakeList, setIsLoading)
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}





export const updateWaterIntakeApi = (token,id, setIntakeList, setIsLoading,navigation,removeData) => {
    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${API_URL}intake/update-water-consumption-data/${id}`,
        headers: { 
          'x-access-token': token
        }
      };
      
      axios.request(config)
      .then((response) => {
        alert('Log removed !!')
        getWaterIntakeApi(token, setIntakeList, setIsLoading)
      })
      .catch((error) => {
        console.log(error);
      });
    
}


export const getFoodIntakeApi = (token, setIntakeList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL}intake/food-list`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {     
            setIsLoading(false)
            setIntakeList(response?.data?.result);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}



export const createFoodIntakeApi = (token,data,Alert, setIsLoading,setDetails) => {
    
    setIsLoading(true)
    axios.post(`${API_URL}intake/create-food-list`,data, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {                        
            setIsLoading(false)
            Alert.alert('Food intake log added')
            setDetails(null);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}



export const createUserFoodIntakeApi = (token,data,Alert, setIsLoading,setDetails) => {
    let body ={
        'foodId': data?.name
    }
    
    setIsLoading(true)
    axios.post(`${API_URL}intake/create-user-food-consumption`,body, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {                        
            setIsLoading(false)
            Alert.alert('Food intake log added')
            setDetails(null)
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}
