import React,{ useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "./index.css";
import {useNavigate} from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const [errorMssg, setErrormsg] = useState("");
  let history = useNavigate();

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChanged = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSucess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30, path: "/" });
    history("/dashboard");
  };

  const onSubmitFailure = (errorMssg) => {
    setError(true);
    setErrormsg(errorMssg);
  };

  const onFormSubmitted = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://hackathon-183r.onrender.com/login", {
        email,
        password,
      });
      onSubmitSucess(response.data.jwtToken);
    } catch (error) {
      if(error.response){
        onSubmitFailure(error.response.data.message);        
      }      
    }
  };

  const onClickNewRegistration = ()=>{
    history('/register')
  }

  
  return (
    <div className="login-container">
      <form className="login-form-container" onSubmit={onFormSubmitted}>
        <img
          src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1739875997/Notes_App-removebg-preview_n4ku9p.png"
          alt="website logo"
          className="login-logo-image"
        />
        <label htmlFor="Email" className="login-label">
          USER EMAIL
        </label>
        <input
          value={email}
          className="login-input"
          id="Email"
          type="email"
          placeholder="Email"
          onChange={onEmailChange}
          required
        />
        <label htmlFor="password" className="login-label">
          PASSWORD
        </label>
        <input
        required
          value={password}
          className="login-input"
          id="password"
          type="password"
          placeholder="Password"
          onChange={onPasswordChanged}
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {isError && <p className="login-error-text">*{errorMssg}</p>}
        <div className="login-row-container">
        <p className="new-user">Don't have an account ?  </p> 
        <button type="button" className="register-button" onClick={onClickNewRegistration}>Register</button>
        </div>
       
      </form>
    </div>
  );
};

export default Login;
