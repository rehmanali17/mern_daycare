import React, { Fragment, useEffect } from 'react'
import PlanDetails from './PlanDetails'
import Navbar from './Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../actions/posts'

const Plans = () => {
    console.log('Rendering Plans Component!')
    const {isLoading, error, plans } = useSelector(state => state.plans)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(plans.length === 0){
            dispatch(getPosts());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Fragment>
            <Navbar />
            {isLoading === true && <div className='custom-spinner'></div>}
            {(isLoading === false && error !== '') && 
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <p className="alert alert-danger text-center mt-5 w-75 py-2">{error}</p>
                    </div>
                </div>
            }
            {(isLoading === false && plans.length > 0) &&
                <div className="container">
                    <div className="row mt-5">
                        {plans.map(plan => {
                            return(
                                <PlanDetails key={plan._id} plan={plan} />
                            );
                        })}
                    </div>
                </div>
            }
        </Fragment>
    );

}

export default Plans


// return isLoading === true ? (
        
    // ) : ( plans.length === 0 ? 
    //     <Fragment>
    //         <Navbar />
    //         <div className="container mt-5">
    //             <div className="row justify-content-center">
    //                 <p className="alert alert-danger text-center mt-5 w-75 py-2">No plans</p>
    //             </div>
    //         </div>
    //     </Fragment>       
    //  :
    //     <Fragment >
    //     <Navbar />
    //     <div className="container">
    //         <div className="row mt-5">
    //             {plans.map(plan => {
    //                 return(
    //                     <PlanDetails key={plan._id} plan={plan} />
    //                 );
    //             })}
    //         </div>
    //     </div>
    //     </Fragment>
    // )