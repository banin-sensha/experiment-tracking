import React, { useEffect, useState, useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { GlobalContext } from '../App';
import { Container, Card, CardContent, Typography, Grid, CircularProgress, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TopToobar from '../TopToolbar/TopToolbar';

// Custom styles for the profile component
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
  },
  card: {
    marginBottom: theme.spacing(3),
    boxShadow: theme.shadows[3],
    borderRadius: '8px',
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
    fontSize: '2rem',  // Increased font size
  },
  subTitle: {
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: '1.2rem',  // Increased font size
  },
  barChartContainer: {
    height: 300,
  },
  noMetrics: {
    color: theme.palette.text.hint,
    textAlign: 'center',
  },
  gridContainer: {
    marginTop: theme.spacing(3),
  },
  backButton: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    marginBottom: '12px'
  },

}));

const Profile = () => {
  const { actions, reduxState } = useContext(GlobalContext);
  const { profile } = reduxState.profile;
  const classes = useStyles();

  useEffect(() => {
    actions.fetchProfile();
  }, []);
  const handleBackClick = () => {
    window.location.href = "/experiment-tracking/dashboard";
  };
  if (!profile) return <div className="text-center"><CircularProgress /></div>;

  const { username, email, stats, experiment_metrics } = profile;


  return (
    <>
    <TopToobar/>
    <Container className={classes.root}>
    <Button
        variant="contained"
        className={classes.backButton}
        onClick={handleBackClick}
      >
        Back to Dashboard
      </Button>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" className={classes.title}>
            User Profile
          </Typography>
          <Typography className={classes.subTitle}><strong>Username:</strong> {username}</Typography>
          <Typography className={classes.subTitle}><strong>Email:</strong> {email}</Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" className={classes.title}>Stats</Typography>
              <Typography className={classes.subTitle}>🧪 Total Experiments: {stats.experimentCount}</Typography>
              <Typography className={classes.subTitle}>📦 Total Models: {stats.modelCount}</Typography>
              <Typography className={classes.subTitle}>📈 Metrics Recorded: {stats.metricCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" className={classes.title}>Average Accuracy per Experiment</Typography>
              {experiment_metrics.length > 0 ? (
                <div className={classes.barChartContainer}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={experiment_metrics}>
                      <XAxis dataKey="experiment" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="accuracy" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <Typography className={classes.noMetrics}>No metrics available.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>


    </Container>
    </>
  );
};

export default Profile;
