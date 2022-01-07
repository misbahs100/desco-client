import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container">
            <img width="100%" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/6b443b70759853.5bade2d0a6685.png" alt="" />
            <div className="text-center mt-5">
            <Link to="/home"><button className="btn btn-success">Go to Home</button></Link>
            </div>
        </div>
    );
};

export default NotFound;