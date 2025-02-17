import React,{ useState } from "react";
import axios from "axios";
import "./index.css";

const Register = (props) => {
    const[name,setname] = useState('')
    const[email,setEmail] = useState('')
    const[password,setFirstPassword] = useState('')
    const [ismismatched,setMatched] = useState(false)
    const [message,setMessage] = useState('')

    const onChangeEmail = event=>{
        setEmail(event.target.value)
    }

    const onChangeName = event=>{
        setname(event.target.value)
    }

    const onChangeFirstPassword = event=>{
        setFirstPassword(event.target.value)
    }


    const successfunc = ()=>{
        const {history} = props
        history.replace('/login')
    }


    const onClickRegister = async(event)=>{
        event.preventDefault()
        try {
            const response = await axios.post("https://hackathonproject-ekn4.onrender.com/signup", {
              email,
              password,
            });
            console.log(response)
            setMessage(response.data.message)
            setMatched(true)
            successfunc();
          } catch (error) {
            if(error.response){
                console.error("Registration failed:", error.response.data.error);
                setMessage(error.response.data.error);
            }
          }       
    }

  return(
    <div className="register-container">
        <div className="card-container">
        <img src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1739741381/Untitled_design2-removebg-preview_djxi6t.png" alt="registartion-logo" className="registration-img"/>
        <form className="form-container" onSubmit={onClickRegister}>
        <img
          src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1739731875/Notes_App_1_a3hw9s.png"
          alt="app logo"
          className="app-image"
        />
        <div className="horizontal-item">
            <label htmlFor="emailId" className="register-label">Enter e-mail: </label>
            <input value={email} id='emailId' type="email" placeholder="enter your email" className="register-input" onChange={onChangeEmail} required/>
        </div>
        <div className="horizontal-item">
            <label htmlFor="name" className="register-label">Enter name: </label>
            <input value={name} id='name' type="text" placeholder="enter your name" className="register-input" required onChange={onChangeName}/>
        </div>
        <div className="horizontal-item">
            <label htmlFor="setPassword" className="register-label">Enter password: </label>
            <input value={password} id='setPassword' type="password" placeholder="enter your password" className="register-input" required onChange={onChangeFirstPassword}/>
        </div>
        <button type="submit" className="registration-button">Register</button>
        {ismismatched && <p className="registered-text">{message}</p>}
        </form>
        </div>
    </div>
    
    )
};

export default Register;
