import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Contact from "./components/Contact";
import Plans from "./components/Plans";
import AlertContextProvider from "./context/alert";
import AuthContextProvider from "./context/auth";
import PlanContextProvider from "./context/plan";
import Dashboard from "./components/dashboard/Dashboard";
import PlansContextProvider from "./context/dashboard/plans";
import UserPlanDetails from "./components/dashboard/UserPlanDetails";
import UpdateProfile from "./components/dashboard/UpdateProfile";
import BuyPlan from "./components/dashboard/BuyPlan";

function App() {
  return (
    <Fragment>
      <Router>
        <PlanContextProvider>
          <AlertContextProvider>
            <AuthContextProvider>
          <Switch>
            <Route exact path="/" component={Plans} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/contact" component={Contact} />
            <PlansContextProvider>
              <Route exact path='/user' component={Dashboard} />
              <Route exact path='/user/plan_details' component={UserPlanDetails} />
              <Route exact path='/user/update_profile' component={UpdateProfile} />
              <Route exact path='/user/buy_plan/:id' component={BuyPlan} />
            </PlansContextProvider>
          </Switch>
            </AuthContextProvider>
          </AlertContextProvider>
        </PlanContextProvider>
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
