import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from "react-redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Contact from "./components/Contact";
import Plans from "./components/Plans";
import Dashboard from "./components/dashboard/Dashboard";
import UserPlanDetails from "./components/dashboard/UserPlanDetails";
import UpdateProfile from "./components/dashboard/UpdateProfile";
import BuyPlan from "./components/dashboard/BuyPlan";

// console.log(rootReducer)
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

function App() {
  return (
    <Fragment>
        <Router>
            <Provider store={store} >
                <Switch>
                  <Route exact path="/" component={Plans} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/contact" component={Contact} />
                  <Route exact path='/user' component={Dashboard} />
                  <Route exact path='/user/plan_details' component={UserPlanDetails} />
                  <Route exact path='/user/update_profile' component={UpdateProfile} />
                  <Route exact path='/user/buy_plan/:id' component={BuyPlan} />
                </Switch>
            </Provider>
        </Router>
    </Fragment>
  ) 
  // : 
  // (
  //   <Fragment>
  //       <Router>
  //       <UserNavbar />
  //       <AuthContextProvider>
  //       <PlansContextProvider>
  //       <AlertContextProvider>
  //       <Switch>
  //         <PlansContextProvider>
  //         <Route exact path='/user' component={Dashboard} />
  //         <Route exact path='/user/plan_details' component={UserPlanDetails} />
  //         <Route exact path='/user/update_profile' component={UpdateProfile} />
  //         </PlansContextProvider>
  //       </Switch>
  //       </AlertContextProvider>
  //       </PlansContextProvider>
  //       </AuthContextProvider>
  //     </Router>
  //    </Fragment> 
  // )
}

export default App;
