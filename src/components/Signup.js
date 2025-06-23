import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const history = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const host = "http://localhost:5000";
        const { name, email, password, cpassword } = credentials;
        
        // Check if passwords match
        if (password !== cpassword) {
            props.showalert("password dosen't match","danger");
            return;
        }
        
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const json = await response.json();
        console.log(json);
        
        if (json.success === true) {
            localStorage.setItem('token', json.authtoken);
            history("/");
            props.showalert("Account created successfully","success")
        } else {
            props.showalert("Account already exists!Login to view","danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-5" >
            <h2>Signup to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        value={credentials.name}
                        onChange={onChange} 
                        required
                        aria-describedby="nameHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        value={credentials.email}
                        onChange={onChange} 
                        required
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password" 
                        value={credentials.password}
                        onChange={onChange}
                        required
                        minLength="6"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="cpassword" 
                        name="cpassword" 
                        value={credentials.cpassword}
                        onChange={onChange}
                        required
                        minLength="6"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup;