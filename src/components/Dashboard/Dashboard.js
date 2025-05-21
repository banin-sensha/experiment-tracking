import React, { useEffect } from 'react';

import TopToobar from '../TopToolbar/TopToolbar';
import ProjectList from '../Projects/Projects';


const Dashboard = () => {
    useEffect(() => {
        const token = localStorage.getItem('access_token'); // or use cookies/sessionStorage
        if (!token) {
            window.location.href="/experiment-tracking/login"
        }
    }, []);
    return (
        <div>
            <TopToobar />
            <ProjectList />
        </div>

    );
}

export default Dashboard;