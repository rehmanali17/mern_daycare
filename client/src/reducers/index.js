import { combineReducers } from "redux";
import { plans } from "./plans";
import { messages } from "./messages";
import { alerts } from "./alerts";

console.log(messages)
export const rootReducer = combineReducers({
    plans,
    messages,
    alerts,
    
})