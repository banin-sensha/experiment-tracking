import React from 'react';
import TopToobar from '../TopToolbar/TopToolbar';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Metrics from '../Metrics/Metrics';
import ResourceUsage from '../ResourceUsage/resourceUsage';

const Experiment = () => {

    const {state} = useLocation();
    const {experiment} = state;

    return (
        <div>
            <TopToobar />
            <div >
                <h1 className='text-center'>{experiment.name}</h1>
                <h5 className='text-center'>{experiment.description}</h5>
            </div>
            <Metrics experimentId = {experiment.id}/>
            <ResourceUsage  experimentId = {experiment.id} />
        </div>
    );
}

export default Experiment;