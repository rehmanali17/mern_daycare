import { FETCH_SUCCESS, FETCH_FAIL, PLANS_LOADING } from "../actions/types"

export const plans = ( state = {
    isLoading: false,
    error: '',
    plans: []
}, action) => {
    const {payload, type} = action
    switch(type){
        case FETCH_SUCCESS:
            return {
                isLoading: false,
                error: '',
                plans: payload
            }
        case FETCH_FAIL:
            return {
                isLoading: false,
                error: 'Error occured while fetching the records',
                plans: payload
            }
        case PLANS_LOADING:
            return {
                isLoading: true,
                error: '',
                plans: state.plans
            }
        default:
            return state
    }
}