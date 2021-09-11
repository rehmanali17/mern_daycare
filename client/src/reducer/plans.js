
export const plansReducer = (state, action)=>{
    const { type, payload } = action
    switch(type){
        case 'ADD_PLAN':
            return ([...state, ...payload])
        case 'REMOVE_PLAN':
            return state.filter(plan => plan._id !== payload.id)    
        default:
            return state
    }
}