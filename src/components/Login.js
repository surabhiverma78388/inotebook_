import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const host = "http://localhost:5000"; 
         const response = await fetch(`${host}/api/auth/login`, { // Changed endpoint to login
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Fixed capitalization
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        
        const json = await response.json();
        console.log(json);
        
        if (json.success === true) { // Use strict equality
            localStorage.setItem('token', json.authtoken);
            props.showalert("Logged in successfully","success")
            history("/"); 
            
        } 
        else{
            props.showalert("invalid credentials","danger")
        }
      }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container  mt-5">
            <h1>Login to see your notes!</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        value={credentials.email} 
                        onChange={onChange} 
                        id="email" // Fixed id to match htmlFor
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={credentials.password} 
                        onChange={onChange} // Fixed function name
                        name="password" 
                        id="password" // Fixed id to match htmlFor
                    />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login;