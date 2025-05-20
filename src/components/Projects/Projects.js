// src/components/ProjectList.jsx
import React, { useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { GlobalContext } from '../App';

export default function ProjectList() {
    const { actions, reduxState } = useContext(GlobalContext);
    const projects =
  reduxState && reduxState.projects && reduxState.projects.projects
    ? reduxState.projects.projects
    : [];
  const history = useHistory();

  useEffect(() => {
    if (projects.length === 0) {
      actions.fetchProjects();
    }
  }, []);

  const openExperimentList = (project) => {
    history.push({
        pathname: `/experiments/${project.id}`,
        state: {project: project}
    });
}
  return (
    <Container style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        My Projects
      </Typography>
      <Grid container spacing={3}>
        {projects.length === 0 ? (
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        ) : (
          projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card
              onClick={() => openExperimentList(project)}
                style={{ cursor: "pointer" }}
              >
                <CardContent>
                  <Typography variant="h6">{project.name}</Typography>
                  <Typography variant="body2">{project.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
