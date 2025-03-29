import React from 'react';
import LandingPage from "../LandingPage";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup';
import Dashboard from './Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
        <ToastContainer hideProgressBar={true} />
        <BrowserRouter basename="/experiment-tracking">
            <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />  
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
