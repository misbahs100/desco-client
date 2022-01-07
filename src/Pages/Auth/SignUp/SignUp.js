import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
// import useAuth from '../../../../hooks/useAuth';

import Header from '../../Header/Header'



import "./SignUp.css";

const SignUp = () => {
    const [userData, setUserData] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const {registerUser} = useAuth();
    const navigate = useNavigate();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [error, setError] = useState("")

    const onSubmit = data => {
        console.log(data)
        // if(data.password !== data.conPassword){
        //     alert('Your Password does not match');
        //     return;
        // } 
        const newData = {...data}
        setUserData(newData);
        // registerUser(userData.email, userData.password, userData.name, userData, navigate);
        fetch('https://desco-task.herokuapp.com/api/registration', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res=>res.json())
            .then(data => {
                console.log(data)
                if(data.success){
                    setError("")
                    setLoggedInUser(data.user)
                    localStorage.setItem("auth-token", data.token)
                    alert("you have registered successfully. Go to home page")
                    navigate("/")
                } else {
                    setError(data.msg)
                }
            })
    }

    return (
        <div className='auth-container container mt-5'>
            
            <Header></Header>
        <div>
        <h1 className='mt-5'>Please Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("name")} name="name" placeholder="Your name.."/>
                <input type="text" {...register("email")} name="email" placeholder="Your Email.."/>
                
                <input type="password" {...register("password", { required: true})} name="password" placeholder="Password.."/>
                {/* <input type="password" {...register("conPassword", { required: true})} name="conPassword" placeholder="Confirm Password.."/> */}
                
                {/* {errors && <span className='text-danger fw-bold'>This field is required</span>} */}
                <p className='text-danger'>{error && error}</p>
                <input type="submit" value="Submit"/>
            </form>
            <Link to="/login" className='fw-bold'>Registered? Login</Link>
        </div>
            
            
    
        </div>
    );
};

export default SignUp;