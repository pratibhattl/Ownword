import axios from 'axios'
import { API_URL_DEV } from '@env';
export const getWaterIntakeApi = (token, setIntakeList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL_DEV}intake/user-water-consumption-data`, {
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
    axios.post(`${API_URL_DEV}intake/create-water-consumption`, data,{
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
            if (error.response) {
                alert(error?.response?.data?.message)
              }
        });
}





export const updateWaterIntakeApi = (token,id, setIntakeList, setIsLoading,navigation,removeData) => {
    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${API_URL_DEV}intake/update-water-consumption-data/${id}`,
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
        if (error.response) {
            alert(error?.response?.data?.message)
          }
      });
    
}


export const getFoodIntakeApi = (token, setIntakeList, setIsLoading) => {
    setIsLoading(true)
    axios.get(`${API_URL_DEV}intake/food-list`, {
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
        });
}



export const createFoodIntakeApi = (token,data, setIsLoading,setDetails) => {
    
    setIsLoading(true)
    axios.post(`${API_URL_DEV}intake/create-food-list`,data, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {                        
            setIsLoading(false)
            alert('Food intake log added')
            setDetails(null);
        })
        .catch(function (error) {
            setIsLoading(false)
            if (error.response) {
                alert(error?.response?.data?.message)
              }
        });
}



export const createUserFoodIntakeApi = (token,data,setIsLoading,setDetails) => {
    let body ={
        'foodId': data?.name
    }
    
    setIsLoading(true)
    axios.post(`${API_URL_DEV}intake/create-user-food-consumption`,body, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {                        
            setIsLoading(false)
            alert('Food intake log added')
            setDetails(null)
        })
        .catch(function (error) {
            setIsLoading(false)
            if (error.response) {
                alert(error?.response?.data?.message)
              }
        });
}
