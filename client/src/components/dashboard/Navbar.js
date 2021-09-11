import React from 'react'
import { Fragment } from 'react'
import {Link, useHistory} from 'react-router-dom'

const Navbar = () => {
    const history = useHistory()
    const logout = ()=>{
        localStorage.removeItem('token');
        history.push('/user')
    }
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="container-fluid">
                {/* <img src="" className="img" /> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                    <Link className="nav-link navbar-link" to="/">Buy Plans</Link>   
                    <Link className="nav-link navbar-link" to="/user">My Plans</Link>
                    <Link className="nav-link navbar-link" to="/user/update_profile">Update Profile</Link>
                    <span style={{cursor: 'pointer'}} className="nav-link navbar-link" onClick={logout} >Log Out</span>
                    </div>
                </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default Navbar
