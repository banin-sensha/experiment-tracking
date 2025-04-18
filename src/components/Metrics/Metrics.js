import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../App';
import { generateRandomString } from '../../utils/helper';
import MetricChart from '../../MetricChart/MetricChart';


const Metrics = ({experimentId}) => {

    const {actions, reduxState} = useContext(GlobalContext);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        actions.fetchMetrics(experimentId);
    },[]);

    const {metrics} = reduxState.metrics || [];

    const displayMetric = (index) => {
        setSelectedIndex(index);
    }

    return (
        <div>
            <div className='flex flex-column-gap'>
                <div>
                {
                    (metrics || []).map((metric, index) => (
                        <div key={index} onClick={() => displayMetric(index)}>
                            {generateRandomString(10)}
                        </div>
                    ))
                }
                </div>
                <div>
                {
                    (metrics || []).map((metric, index) => {
                        if (selectedIndex == index) {
                            return (
                                <div key={index}>

                                    <div className="flex flex-center">
                                        <div className="mr-20x">accuracy: {metric.accuracy}</div>
                                        <div className="mr-20x">epoch: {metric.epoch}</div>
                                        <div className="mr-20x">precision: {metric.precision}</div>
                                        <div className="mr-20x">recall: {metric.recall}</div>
                                        <div className="mr-20x">loss: {metric.loss}</div>
                                        
                                        
                                    </div>
                                    <div className='mt-20x'>
                                        <MetricChart metric={metric} />
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default Metrics;