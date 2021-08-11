import React from 'react';
import { Link } from 'react-router-dom';
import FormulaAPI from '../apis/FormulaAPI.js';

const SignupPage = (props) => {
  const { history } = props;
  const handleSignup = async (evt) => {
    evt.preventDefault();
    let userObject = {
      'username': evt.target.username.value,
      'password': evt.target.password.value,
    }
    let data = await FormulaAPI.signupUser(userObject);
    console.log(data)
    if (data.error) {
      console.log('there was an error signing up');
    } else {
      history.push('/login');
    }

  }

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSignup}>
        <label>UserName:</label>
        <input type='text' placeholder='Username' name='username' />
        <label>Password:</label>
        <input type='password' name='password' />
        <button type='submit' >Sign Up</button>
      </form>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
};

export default SignupPage;