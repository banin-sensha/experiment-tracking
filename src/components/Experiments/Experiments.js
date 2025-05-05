import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import { GlobalContext } from '../App';
import { faAtom, faDumbbell, faTrailer, faWineGlass, faTable, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Experiments.scss';
import Experiment from './Experiment';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Experiments = () => {

    const history = useHistory();
    const {actions, reduxState} = useContext(GlobalContext);

    const { experiments } = reduxState.experiments;

    useEffect(() => {
        actions.fetchExperiments();
    },[experiments.length]);

    
    const handleDownload = (experimentId) => {
        actions.downloadModel(experimentId);  // Dispatching the action to download the model file
    };

    const openExperiment = (experiment) => {
        history.push({
            pathname: `/experiment/${experiment.id}`,
            state: {experiment: experiment}
        });
    }

    return (
        <div>
            <div className=" mt-4 p-5">
                <h2>Experiments</h2>
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th>Experiment name</th>
                            <th>Description</th>
                            <th>Created at</th>
                            <th className='text-center'>Download Model</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(experiments || []).map((experiment, index) => (
                        <tr key={index} onClick={() => openExperiment(experiment)} className='experiments'>
                            <td>{experiment.name}</td>
                            <td>{experiment.description}</td>
                            <td>
                            {new Date(experiment.created_at).toLocaleString('en-AU', { 
                                timeZone: 'Australia/Sydney', 
                                hour12: true, 
                                weekday: 'short', 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric', 
                                hour: 'numeric', 
                                minute: 'numeric', 
                            })}
                            </td>
                            <td className='text-center'>                                    <FontAwesomeIcon
                                        size="2x"
                                        icon={faDownload}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent row click from triggering
                                            handleDownload(experiment.id);
                                        }}
                                    /></td>


                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Experiments;