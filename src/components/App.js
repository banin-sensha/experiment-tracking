import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup';
import Dashboard from './Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import * as actions from "../actions";
import { connect } from "react-redux";
import Experiment from './Experiments/Experiment';
import Profile from './Profile/profile';
import Experiments from './Experiments/Experiments';

export const GlobalContext = React.createContext();

class App extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.validateTokenOnRouteChange();
        }
    }

    componentDidMount() {
        this.validateTokenOnRouteChange(); // initial check
    }

    validateTokenOnRouteChange = async () => {
        const token = localStorage.getItem("access_token");
    
        if (token) {
            try {
                const res = await fetch("http://localhost:8000/validate-token", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (res.status !== 200) {
                    console.log('exp')
                    throw new Error("Token expired");
                }
            } catch (err) {
                console.error("Token validation failed:", err);
                if (!this.props.location.pathname.includes("/signup")) {
                    console.log("No token found");
                    localStorage.clear();
                    this.props.history.push("/login");
                }
            }
        } else {
            console.log("No token found");                
            if (!this.props.location.pathname.includes("/signup")) {
                console.log("No token found");
                localStorage.clear();
                this.props.history.push("/login");
            }
        }
    };
    

    render() {
        return (
            <div>
                <ToastContainer hideProgressBar={true} />
                <GlobalContext.Provider value={{ actions: this.props, reduxState: this.props.state }}>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/experiment/:experimentId" component={Experiment} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/experiments/:projectId" component={Experiments} />
                    </Switch>
                </GlobalContext.Provider>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state,
    };
}

// wrap App with withRouter to get access to location/history props
export default connect(mapStateToProps, actions)(withRouter(App));
