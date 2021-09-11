import React, { Fragment, useContext } from 'react'
import { PlansContext } from '../../context/dashboard/plans'
import { AuthContext } from '../../context/auth'
import UserPlan from './UserPlan'
import { Redirect } from 'react-router'
import Navbar from './Navbar'

const Dashboard = () => {
    const {userPlans, isLoading} = useContext(PlansContext)
    const { getToken } = useContext(AuthContext)
    const token = getToken()
    if(token === null){
        return <Redirect to="/" />
    }


    return isLoading === true ? 
    (
        <Fragment>
                <Navbar />
                <div className='custom-spinner'></div>
        </Fragment>
    ) : (
        userPlans.length === 0 ? 
            <Fragment>
                <Navbar />
                <div className="container">
                    <div className="row justify-content-center">
                        <p className="alert alert-danger text-center mt-5 w-75 py-2">No plans</p>
                    </div>
                </div>
            </Fragment>       
         : 
            <Fragment>
                <Navbar />
                
                <h1 className="text-center mt-3 mb-2 display1 text-primary">My Plans</h1>
                <UserPlan plans={userPlans} token={token}/>
            </Fragment>
    )
    
    
}

export default Dashboard
