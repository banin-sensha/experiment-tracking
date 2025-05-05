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
            <h1 className='text-center'>{experiment.name}</h1>
            <h5 className='text-center'>{experiment.description}</h5>
            <Metrics experimentId = {experiment.id}/>
            
        </div>
    );
}

export default Experiment;