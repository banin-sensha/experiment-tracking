import React, { useEffect, useState, useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { GlobalContext } from '../App';
import { Container, Card, CardContent, Typography, Grid, CircularProgress, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TopToobar from '../TopToolbar/TopToolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    minHeight: '100vh',
    minWidth: '80%',
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
    fontSize: '2rem',
  },
  subTitle: {
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: '1.2rem',
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
  apiKeyText: {
    fontFamily: 'monospace',
    fontSize: '1.1rem',
    wordBreak: 'break-all',
  },
  buttonSpacing: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  }
}));

const Profile = () => {
  const { actions, reduxState } = useContext(GlobalContext);
  const { profile } = reduxState.profile;
  const classes = useStyles();

  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    actions.fetchProfile();
  }, []);

  const handleBackClick = () => {
    window.location.href = "/experiment-tracking/dashboard";
  };

  const handleToggleApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(profile.api_key)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error("Failed to copy API Key:", err));
  };

  if (!profile) return <div>      <TopToobar /> <div className="text-center"><CircularProgress /></div> </div>;

  const { username, email, stats, experiment_metrics, project_metrics } = profile;

  return (
    <>
      <TopToobar />
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

        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h6" className={classes.title}>API Key</Typography>
            <Typography className={`${classes.subTitle} ${classes.apiKeyText}`}>
              {showApiKey ? profile.api_key : '••••••••••••••••••••••••'}
            </Typography>
            <div>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleToggleApiKey}
                className={classes.buttonSpacing}
              >
                {showApiKey ? 'Hide API Key' : 'Show API Key'}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCopyApiKey}
                className={classes.buttonSpacing}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h6" className={classes.title}>Stats</Typography>
                <Typography className={classes.subTitle}>📁 Total Projects: {stats.projectCount}</Typography>
                <Typography className={classes.subTitle}>🧪 Total Runs: {stats.experimentCount}</Typography>
                <Typography className={classes.subTitle}>📦 Total Models: {stats.modelCount}</Typography>
                <Typography className={classes.subTitle}>📈 Metrics Recorded: {stats.metricCount}</Typography>
              </CardContent>
            </Card>

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

          <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" className={classes.title}>Average Accuracy per Project</Typography>
              {project_metrics.length > 0 ? (
                <div className={classes.barChartContainer}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={project_metrics}>
                      <XAxis dataKey="project" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="accuracy" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <Typography className={classes.noMetrics}>No project metrics available.</Typography>
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
