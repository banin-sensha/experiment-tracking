import React, { useEffect } from 'react';

import TopToobar from '../TopToolbar/TopToolbar';
import Experiments from '../Experiments/Experiments';



const Dashboard = () => {
    useEffect(() => {
        const token = localStorage.getItem('access_token'); // or use cookies/sessionStorage
        console.log(token)
        if (!token) {
            window.location.href="/experiment-tracking/login"
        }
    }, []);
    return (
        <div>
            <TopToobar />
            <Experiments />
        </div>

    );
}

export default Dashboard;