import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';


const PrivateRoute = ({ children, role}) => {
  let {user} = useContext(AuthContext)

  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //access for one role
  if (role && user.role !== role) {
    return <Navigate to="/" replace />; // Redirect to home if the user's role doesn't match
  }
  // if have multiple role to access
  // if (roles && !roles.includes(user.role)) {
  //   return <Navigate to="/" replace />; // Redirect to home if the user is not an admin
  // }
  

  return children;
};

export default PrivateRoute;


// import { Route, Redirect } from "react-router-dom";

// const PrivateRoute =({Children, ...rest})=> {
//     console.log("Private route works!");
//     return(
//         <Route {...rest}>{Children}</Route>
//     )
// }

// export default PrivateRoute
