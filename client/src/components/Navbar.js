import React, {Fragment} from "react";
import { Link } from 'react-router-dom'


const Navbar = ()=>{
    console.log('Rendering Home Navbar Component!')
    return(
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="container-fluid">
                <Link style={{fontSize: '20px', color: 'white'}} className="navbar-brand" to="/">DayCare</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                    <Link className="nav-link navbar-link" to="/">Plans</Link>   
                    <Link className="nav-link navbar-link" to="/contact">Contact Us</Link>
                    <Link className="nav-link navbar-link" to="/register">Register</Link>
                    <Link className="nav-link navbar-link" to="/login" >Log in</Link>
                    </div>
                </div>
                </div>
            </nav>
        </Fragment>
    );
}

export default React.memo(Navbar)
