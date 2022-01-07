import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import "./Home.css";

const Home = () => {

    return (
        <div className='home-container'>

            <Header></Header>
            
            <Link to="/login" className='mt-5'>
                <button className='mt-5 mx-5 btn btn-success text-center'>Login or sign up</button>
            </Link>
            
            <h1 className='text-center mt-5'>Welcome to Desco Task</h1>

            
        </div>
    );
};

export default Home;