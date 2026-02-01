import { createContext, useState,useEffect} from "react";
import  {jwtDecode} from 'jwt-decode';
import {useNavigate} from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) =>{

    
    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')):null);
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')):null);

    const navigate = useNavigate();

    let loginUser = async(e) =>{
        e.preventDefault()
        console.log('form submited')
        let response =await fetch('/api/Auth/login',{
            method:'Post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
        })
        let data = await response.json()
        console.log(data);
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.accessToken))
            localStorage.setItem('authTokens',JSON.stringify(data))
            
            // Redirect based on role
            let userRole = jwtDecode(data.accessToken).role;
            if (userRole === 'MainAdmin') {
                navigate('/mainadmin');
            } else if (userRole === 'Admin') {
                navigate('/admin');
            } else {
                navigate('/'); // Default route for regular users
            }
        }else{
            alert("Invalid password or UserName!")
        }
    }


    let logoutUser=() => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
