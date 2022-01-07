import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser)

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light ">
            <Link to="/"> <a class="navbar-brand" href="#">DESCO</a></Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">

                    <li className="nav-item ml-5 dddd">
                        <a className="nav-link " href="#">{loggedInUser?.email && loggedInUser.email}</a>
                    </li>
                    <Link to="/billPage">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Bill Page</a>
                        </li>
                    </Link>

                    <li className="nav-item ml-5 dddd">
                        <a className="nav-link " href="#">Paid Total : </a>
                    </li>

                    {loggedInUser?.email && <li className="nav-item ml-5 dddd">
                        <button onClick={() => setLoggedInUser({})}>LogOut</button>
                    </li>}

                    

                </ul>
            </div>
        </nav>
    );
};

export default Header;