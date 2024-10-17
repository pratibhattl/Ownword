import axios from 'axios'
import { API_URL_DEV } from '@env';
import { Alert } from 'react-native';


export const getInsightsApi = (token, setInsightsList, setIsLoading,flag) => {
if(flag == "Like"){
    setIsLoading(false)
}else{
    setIsLoading(true)
}
    axios.get(`${API_URL_DEV}admins/get-insight`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            // console.log("sddsfsd", response?.data?.data);
            setIsLoading(false)
            let arr = response?.data?.data?.length > 0 ? response?.data?.data : []
            setInsightsList(arr);
        })
        .catch(function (error) {
            setIsLoading(false)
            setInsightsList([]);
            
        });
}


export const getBlogsApi = (token, setInsightsList, setIsLoading,flag) => {
    if(flag == "Like"){
        setIsLoading(false)
    }else{
        setIsLoading(true)
    }
    axios.get(`${API_URL_DEV}admins/get-blog`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            let arr = response?.data?.data?.length > 0 ? response?.data?.data : []
            setInsightsList(arr);
        })
        .catch(function (error) {
            setIsLoading(false)
            setInsightsList([]);
          
        });
}


export const addLikeBlogsApi = (token, data, like, setInsightsList, setIsLoading) => {
    axios.post(`${API_URL_DEV}admins/blog-like`, data, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            getBlogsApi(token, setInsightsList, setIsLoading,"Like")
            if (like == true) {
                Alert.alert("Post disliked !!")

            } else {
                Alert.alert("Post liked !!")

            }
            // setInsightsList(response?.data?.data);
        })
        .catch(function (error) {
            setIsLoading(false)
            if (error.response) {
                Alert.alert(error?.response?.data?.message)
              }
        });
}

export const addLikeInsightApi = (token, data, like, setInsightsList, setIsLoading) => {

    axios.post(`${API_URL_DEV}admins/add-insight-like`, data, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            if (like == true) {
                Alert.alert("Post disliked !!")

            } else {
                Alert.alert("Post liked !!")

            }
            getInsightsApi(token, setInsightsList, setIsLoading,"Like")
        })
        .catch(function (error) {
            setIsLoading(false)
            if (error.response) {
                Alert.alert(error?.response?.data?.message)
              }
        });
}


export const addCommentBlogsApi = (token, data, setInsightsList, setIsLoading, toggleModal) => {
    let url = data?.reference_type == 'Blog' ? 'blog-comment' : 'add-insight-comment';
    axios.post(`${API_URL_DEV}admins/${url}`, data, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            // console.log(response?.data,"data");

            toggleModal('')
            if (data?.reference_type == 'Blog') {
                getBlogsApi(token, setInsightsList, setIsLoading,"Like")

            } else {
                getInsightsApi(token, setInsightsList, setIsLoading,"Like")
            }
            Alert.alert("Commented successfully !!")
        })
        .catch(function (error) {
            setIsLoading(false)
            if (error.response) {
                Alert.alert(error?.response?.data?.message)
              }
        });
}

export const getTrackingApi = (token, setDetails, setIsLoading) => {

    setIsLoading(true)
    axios.get(`${API_URL_DEV}analytics`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            // let arr = response?.data?.data?.length > 0 ? response?.data?.data : []
            setDetails(response?.data?.infoData);
        })
        .catch(function (error) {
            setIsLoading(false)
           
            setDetails({});
            
        });
}