import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './SignupLoginTab.scss';


export const SignupLoginTab = ({ activeTab }) => {
    return <Nav tabs className="signup-login-tab mb-25x fs-24 lh-32 text-center">
        <NavItem className="left">
        <NavLink
            className={classNames({ active: activeTab === 'login' })}
            to="/login"
        >
            Login
        </NavLink>
        </NavItem>

        <NavItem>
        <NavLink 
            className={classNames({ active: activeTab === 'singup' })}
            to="/register"
        >
            Sign up
        </NavLink> 
        </NavItem>
    </Nav>
}