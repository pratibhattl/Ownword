import axios from 'axios'
import { API_URL } from '@env';



export const getInsightsApi = (token, setInsightsList, setIsLoading,flag) => {
if(flag == "Like"){
    setIsLoading(false)
}else{
    setIsLoading(true)
}
    axios.get(`${API_URL}admins/get-insight`, {
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
            console.log(error);
            setInsightsList([]);
            
        });
}


export const getBlogsApi = (token, setInsightsList, setIsLoading,flag) => {
    if(flag == "Like"){
        setIsLoading(false)
    }else{
        setIsLoading(true)
    }
    axios.get(`${API_URL}admins/get-blog`, {
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
            console.log(error);
        });
}


export const addLikeBlogsApi = (token, data, like, setInsightsList, setIsLoading) => {
    axios.post(`${API_URL}admins/blog-like`, data, {
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
                alert("Post disliked !!")

            } else {
                alert("Post liked !!")

            }
            // setInsightsList(response?.data?.data);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}

export const addLikeInsightApi = (token, data, like, setInsightsList, setIsLoading) => {

    axios.post(`${API_URL}admins/add-insight-like`, data, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            setIsLoading(false)
            if (like == true) {
                alert("Post disliked !!")

            } else {
                alert("Post liked !!")

            }
            getInsightsApi(token, setInsightsList, setIsLoading,"Like")
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}


export const addCommentBlogsApi = (token, data, setInsightsList, setIsLoading, toggleModal) => {
    let url = data?.reference_type == 'Blog' ? 'blog-comment' : 'add-insight-comment';
    axios.post(`${API_URL}admins/${url}`, data, {
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
            alert("Commented successfully !!")
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
        });
}

export const getTrackingApi = (token, setDetails, setIsLoading) => {

    setIsLoading(true)
    axios.get(`${API_URL}analytics`, {
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
            'Custom-Header': 'CustomHeaderValue'
        }
    })
        .then(function (response) {
            console.log("sddsfseed", response?.data);
            setIsLoading(false)
            // let arr = response?.data?.data?.length > 0 ? response?.data?.data : []
            setDetails(response?.data?.infoData);
        })
        .catch(function (error) {
            setIsLoading(false)
            console.log(error);
            setDetails({});
            
        });
}