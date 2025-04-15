import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import { GlobalContext } from '../App';
import { faAtom, faDumbbell, faTrailer, faWineGlass, faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Experiments = () => {

    const {actions, reduxState} = useContext(GlobalContext);
    const { experiments } = reduxState.experiments;

    useEffect(() => {
        actions.fetchExperiments();
    },[experiments.length]);

    console.log('experiments', experiments);

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
                        
                        <tr key={index}>
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