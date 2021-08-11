import React from 'react';
import FormulaAPI from '../apis/FormulaAPI'

const Login = (props) => {

 // helper
 const handleLogin = async (e) => {
  e.preventDefault();

  let username = e.target.username.value;
  let password = e.target.password.value;

  let userObject = {
    username: username,
    password: password
  }

  try {
    let data = await FormulaAPI.login(userObject);

    if (data) {
      props.completeLogin(data);
      props.history.push("/"); // redirect to home page
    }
  } 
  catch (error) {
    console.error(":ERR:",error);
    return null
  }
}

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input name="username" />
        <br />
        <label>Password:</label>
        <input name="password" type="password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}


export default Login;