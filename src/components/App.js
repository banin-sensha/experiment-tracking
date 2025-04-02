import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup';
import Dashboard from './Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import * as actions from "../actions";
import { connect } from "react-redux";


export const GlobalContext = React.createContext();

class App extends Component {
    render() {
        return (
            <div>
                <ToastContainer hideProgressBar={true} />
                <BrowserRouter basename="/experiment-tracking">
                    <GlobalContext.Provider
                        value={{ actions: this.props, reduxState: this.props.state }}
                    >
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to="/login" />} />
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={Signup} />
                            <Route path="/dashboard" component={Dashboard} />  
                        </Switch>
                    </GlobalContext.Provider>
                </BrowserRouter>
            </div>
        );
    }
}

// const App = () => {
//     const reduxState = useSelector(state => state);
//     const dispatch = useDispatch();
//     const boundActions = bindActionCreators(actions, dispatch);

//     return (
//         <div>
//             <ToastContainer hideProgressBar={true} />
//             <BrowserRouter basename="/experiment-tracking">
//                 <GlobalContext.Provider
//                     value={{ actions: boundActions, reduxState: reduxState }}
//                 >
//                     <Switch>
//                         <Route exact path="/" render={() => <Redirect to="/login" />} />
//                         <Route path="/login" component={Login} />
//                         <Route path="/signup" component={Signup} />
//                         <Route path="/dashboard" component={Dashboard} />  
//                     </Switch>
//                 </GlobalContext.Provider>
//             </BrowserRouter>
//         </div>
//     );
// }

function mapStateToProps(state) {
    return {
      state: state,
    };
  }
  
export default connect(mapStateToProps, actions)(App);

