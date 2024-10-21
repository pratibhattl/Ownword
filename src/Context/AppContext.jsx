import React, { createContext, useContext, useMemo, useState ,useEffect} from 'react'
import { getData } from '../helper';
export const AuthContext = createContext();
export default function AppContext({ children }) {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [token, setToken] = useState('');
    const [userDetails, setUserDetails] = useState({})
    useEffect(() => {
        getData('token').then((data) => {
        if(data){
        setToken(data);
        }
        });
        getData('userDetails').then((data) => {
            if(data){
                setUserDetails(data);
                setIsLoggedin(true);
                }else{
                    setIsLoggedin(false);
                }
        });
        
      }, [])
    const value = useMemo(() => ({
            isLoggedin,
            setIsLoggedin,
            setToken,
            token,
            userDetails,
            setUserDetails
        }), [isLoggedin]);

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>

    )
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
