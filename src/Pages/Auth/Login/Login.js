import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import Header from '../../Header/Header';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [error, setError] = useState("")

    const onSubmit = data => {
        console.log(data);
        // loginUser(data.email, data.password, navigate);
        fetch('https://desco-task.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.success) {
                localStorage.setItem("auth-token", data.token)
                setLoggedInUser(data.user)
                alert("Login successful")
                navigate("/")
            } else {
                setError(data.msg)
            }
        })
    }
    return (
        <div className='auth-container container'>
            <Header></Header>
            <h1 className='mt-5'>Please Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("email", { required: true})} name="email" placeholder="Your Email.."/>
                <input type="password" {...register("password", { required: true})} name="password" placeholder="Your Password.."/>
                {/* {errors && <span className='text-danger fw-bold'>This field is required</span>} */}
                <p className='text-danger'>{error && error}</p>
                <input  type="submit" value="Login"/>
            </form>
            <Link to="/signUp" className='fw-bold'>New comer ? Please Register</Link>
        </div>
    );
};

export default Login;