import React from 'react';
import TopToobar from '../TopToolbar/TopToolbar';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Metrics from '../Metrics/Metrics';

const Experiment = () => {

    const {state} = useLocation();
    const {experiment} = state;

    return (
        <div>
            <TopToobar />
            <p>{experiment.name}</p>
            <p>{experiment.description}</p>
            <Metrics experimentId = {experiment.id}/>
            
        </div>
    );
}

export default Experiment;