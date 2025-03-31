import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
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
                    <FontAwesomeIcon icon={faUser} />
                </div>
            </div>
        </div>
        
    );
}

export default TopToobar;