import axios from 'axios'
import { API_URL_DEV } from '@env';

export const userSignUpApi = (data,setIsLoading) => {
  setIsLoading(true);
  try {
    const response = axios.post(`${API_URL_DEV}users/register`, data)
    return response;
  }
  catch (error) {
    setIsLoading(false);
    throw error;
  }
}


export const userLoginApi = (data, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = axios.post(`${API_URL_DEV}users/login`, data)
    return response;
  }
  catch (error) {
    setIsLoading(false);
    throw error;
  }
}