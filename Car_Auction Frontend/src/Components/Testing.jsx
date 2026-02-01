import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')):null);
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')):null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    let loginUser = async(e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            console.log('form submitted');
            let response = await fetch('/api/Auth/login', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': e.target.username.value,
                    'password': e.target.password.value
                })
            });

            let data = await response.json();
            console.log(data);

            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwtDecode(data.accessToken));
                localStorage.setItem('authTokens', JSON.stringify(data));
                
                // Redirect based on role
                let userRole = jwtDecode(data.accessToken).role;
                if (userRole === 'MainAdmin') {
                    navigate('/mainadmin');
                } else if (userRole === 'Admin') {
                    navigate('/admin');
                } else {
                    navigate('/'); // Default route for regular users
                }
                return { success: true };
            } else {
                const errorMessage = data.message || 'Login failed';
                setError(errorMessage);
                return { error: errorMessage };
            }
        } catch (error) {
            const errorMessage = error.message || 'An unexpected error occurred';
            setError(errorMessage);
            return { error: errorMessage };
        } finally {
            setLoading(false);
        }
    }

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        setError(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    }

    // Optional: Token expiration check
    useEffect(() => {
        if (authTokens) {
            const decoded = jwtDecode(authTokens.accessToken);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                logoutUser();
            }
        }
    }, [authTokens]);

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        loading: loading,
        error: error
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
