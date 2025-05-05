import React from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Navbar, NavbarBrand, UncontrolledDropdown } from 'reactstrap';
import { faFlask, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./TopToolbar.scss"

const TopToobar = () => {

    return (
        <div className='p-15x top-toolbar'>
            <div className='flex flex-between'>
                <div>
                    <FontAwesomeIcon icon={faFlask} />
                    <span className='ml-20x'>Experiment Tracking</span>
                </div>
                <div>
                    <UncontrolledDropdown className='pr-50x'>
                        <DropdownToggle>
                            <div className='nav-item'>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem>
                           Settings
                        </DropdownItem>
                        <DropdownItem>
                            Profile
                        </DropdownItem>
                        <DropdownItem>
                            Logout
                        </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
                
            </div>
        </div>
        
    );
}

export default TopToobar;