import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import { fetchProjects } from '../../actions/actions_project';
import { GlobalContext } from '../App';
import { faAtom, faDumbbell, faTrailer, faWineGlass, faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProjectTable = () => {

    const iconMap = {
        faAtom,
        faDumbbell,
        faTrailer,
        faWineGlass,
        faTable,
      };

    const {actions, reduxState} = useContext(GlobalContext);
    const { projectData } = reduxState.project;

    useEffect(() => {
        actions.fetchProjects();
    },[projectData.length]);

    console.log('projectData', projectData);

    return (
        <div>
            <div className=" mt-4">
                <h2>Projects</h2>
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
                    {(projectData || []).map((project, index) => (
                        
                        <tr key={index}>
                            <td>
                                <FontAwesomeIcon
                                    icon={iconMap[project.icon] || faAtom}
                                    className="mr-10x"
                                />{' '}
                            {project.name}
                            </td>
                            <td>{project.description}</td>
                            <td>{project.lastUpdated}</td>
                            <td>{project.createdAt}</td>
                            <td>{project.owner}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ProjectTable;