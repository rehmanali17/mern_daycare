import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import image from '../images/day-care1.jpg'
const PlanDetails = ({plan}) => {
    return (
        <Fragment>
            <div className="col-md-4 col-sm-6 mb-5 mx-sm-0 gy-2 mx-5 px-sm-3 px-5 d-flex align-items-stretch">
                <div className="card" >
                    <img src={image} className="card-img-top" alt="Day Care" />
                    <div className="card-body">
                        <h5 className="card-title">{plan.title}</h5>
                        <p className="card-text">Day Care Plan</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Trial Period: {plan.trial_period}</li>
                        <li className="list-group-item">Duration: {plan.duration}</li>
                        <li className="list-group-item">Time Duration: {plan.time_duration}</li>
                        <li className="list-group-item">Price: {plan.price}$</li>
                    </ul>
                    <div className="card-body text-center">
                        <Link to={`/user/buy_plan/${plan._id}`} className="btn btn-outline-primary card-link">Buy</Link>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default PlanDetails
