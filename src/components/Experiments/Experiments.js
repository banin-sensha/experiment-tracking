import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import { GlobalContext } from '../App';
import { faAtom, faDumbbell, faTrailer, faWineGlass, faTable } from '@fortawesome/free-solid-svg-icons';
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


    const openExperiment = (experiment) => {
        history.push({
            pathname: `/experiment/${experiment.id}`,
            state: {experiment: experiment}
        });
    }

    return (
        <div>
            <div className=" mt-4">
                <h2>Experiments</h2>
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th>Experiment name</th>
                            <th>Description</th>
                            <th>Last updated</th>
                            <th>Created at</th>
                            <th>Owner</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(experiments || []).map((experiment, index) => (
                        <tr key={index} onClick={() => openExperiment(experiment)} className='experiments'>
                            <td>{experiment.name}</td>
                            <td>{experiment.description}</td>
                            <td>{experiment.lastUpdated}</td>
                            <td>{experiment.createdAt}</td>
                            <td>{experiment.owner}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Experiments;