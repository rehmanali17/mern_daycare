import React, { Fragment, useContext } from 'react'
import {planContext} from '../context/plan'
import PlanDetails from './PlanDetails'
import Navbar from './Navbar'
const Plans = () => {
    const { plans, isLoading } = useContext(planContext)

    return isLoading === true ? (
        <Fragment>
                <Navbar />
                <div className='custom-spinner'></div>
        </Fragment>
    ) : ( plans.length === 0 ? 
        <Fragment>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <p className="alert alert-danger text-center mt-5 w-75 py-2">No plans</p>
                </div>
            </div>
        </Fragment>       
     :
        <Fragment >
        <Navbar />
        <div className="container">
            <div className="row mt-5">
                {plans.map(plan => {
                    return(
                        <PlanDetails key={plan._id} plan={plan} />
                    );
                })}
            </div>
        </div>
        </Fragment>
    )
}

export default Plans
