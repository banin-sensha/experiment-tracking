import React from 'react';
import LandingPage from "../LandingPage";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login/Login';

const App = () => {
  return (
    <div>
      <BrowserRouter basename="/experiment-tracking">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
