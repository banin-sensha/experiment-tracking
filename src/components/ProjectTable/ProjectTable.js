import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import { fetchProjects } from '../../actions/actions_project';
import { GlobalContext } from '../App';

const ProjectTable = () => {

    const {actions, reduxState} = useContext(GlobalContext);
    const { projectData } = reduxState.project;

    useEffect(() => {
        actions.fetchProjects();
    },[projectData.length]);
    console.log('reduxState', reduxState);

    return (
        <div>
            <div className="container mt-4">
                <h2>Projects</h2>
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th>Project name</th>
                            <th>Visibility</th>
                            <th>Description</th>
                            <th>Last updated</th>
                            <th>Created at</th>
                            <th>Owner</th>
                            <th>Experiments</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(projectData || []).map((project, index) => (
                        <tr key={index}>
                        <td>{project.projectName}</td>
                        <td>{project.visibility}</td>
                        <td>{project.description}</td>
                        <td>{project.lastUpdated}</td>
                        <td>{project.createdAt}</td>
                        <td>{project.owner}</td>
                        <td>{project.experiments}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ProjectTable;