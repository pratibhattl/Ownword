import axios from 'axios'
import { API_URL } from '@env';

export const userSignUpApi = (data,setIsLoading) => {
  setIsLoading(true);
  try {
    const response = axios.post(`${API_URL}users/register`, data)
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
    const response = axios.post(`${API_URL}users/login`, data)
    return response;
  }
  catch (error) {
    setIsLoading(false);
    throw error;
  }
}