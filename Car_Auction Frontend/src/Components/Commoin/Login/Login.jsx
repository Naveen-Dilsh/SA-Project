import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import AuthContext from '../../../Context/AuthContext';

const Login = () => {
  let { loginUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await loginUser(e);
      toast.success('Logged in successfully!');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' name='username' placeholder='Enter name'/>
        <input type='password' name='password' placeholder='Enter password'/>
        <input type="submit"/>
      </form>
    </div>
  );
};

export default Login;