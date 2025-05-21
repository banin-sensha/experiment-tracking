import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'reactstrap';
import TopToobar from '../TopToolbar/TopToolbar';
import { GlobalContext } from '../App';
import { faDownload, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Experiments.scss';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { CircularProgress } from "@material-ui/core";

const Experiments = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const history = useHistory();
    const { actions, reduxState } = useContext(GlobalContext);
    const { state } = useLocation();
    const { project } = state;
    const { experiments } = reduxState.experiments;

    const [sortMetric, setSortMetric] = useState('');
    const [sortDirection, setSortDirection] = useState('desc');
    const [metricsMap, setMetricsMap] = useState({});

    useEffect(() => {
        actions.fetchExperiments(project.id);
    }, [project.id]);

    useEffect(() => {
        const fetchAllMetrics = async () => {
            const promises = (experiments || []).map(async (exp) => {
                const metrics = await actions.fetchLastEpoch(exp.id);
                return { id: exp.id, metrics };
            });

            const results = await Promise.all(promises);
            const newMetricsMap = {};
            results.forEach(({ id, metrics }) => {
                newMetricsMap[id] = metrics;
            });
            setMetricsMap(newMetricsMap);
        };

        if ((experiments || []).length > 0) {
            fetchAllMetrics();
        }
    }, [experiments]);

    const handleDownload = (experimentId) => {
        actions.downloadModel(experimentId);
    };

    const handleReportDownload = async () => {
        try {
          setIsDownloading(true);
          await actions.downloadReport(project.id); // This now returns a proper Promise
        } catch (error) {
          console.error("Failed to download report:", error);
        } finally {
          setIsDownloading(false);
        }
      };
      

    const openExperiment = (experiment) => {
        history.push({
            pathname: `/experiment/${experiment.id}`,
            state: { experiment },
        });
    };

    const toggleSort = (metric) => {
        if (sortMetric === metric) {
            setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortMetric(metric);
            setSortDirection('desc');
        }
    };

    const getSortIcon = (metric) => {
        if (sortMetric !== metric) return faSort;
        return sortDirection === 'asc' ? faSortUp : faSortDown;
    };

    const combinedExperiments = (experiments || []).map((exp) => ({
        ...exp,
        ...(metricsMap[exp.id] || {}),
    }));

    if (sortMetric === 'accuracy' || sortMetric === 'f1') {
        combinedExperiments.sort((a, b) => {
            const valA = a[sortMetric] !== undefined && a[sortMetric] !== null ? a[sortMetric] : -Infinity;
            const valB = b[sortMetric] !== undefined && b[sortMetric] !== null ? b[sortMetric] : -Infinity;
            return sortDirection === 'asc' ? valA - valB : valB - valA;
        });
    }

    return (
        <div>
            <TopToobar />
            <div className="mt-4 p-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Experiments</h2>
                    <Button className="text-center" color="primary" onClick={handleReportDownload} disabled={isDownloading}>
                        {isDownloading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faDownload} className="me-2" />
                                {" "} Download Report
                            </>
                        )}
                    </Button>
                </div>

                <Table striped responsive hover className="align-middle">
                    <thead>
                        <tr>
                            <th>Experiment Name</th>
                            <th>Description</th>
                            <th>Created At</th>
                            <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('accuracy')}>
                                Accuracy <FontAwesomeIcon icon={getSortIcon('accuracy')} />
                            </th>
                            <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('f1')}>
                                F1 Score <FontAwesomeIcon icon={getSortIcon('f1')} />
                            </th>
                            <th className="text-center">Download Model</th>
                        </tr>
                    </thead>
                    <tbody>
                        {combinedExperiments.map((experiment, index) => (
                            <tr key={index} onClick={() => openExperiment(experiment)} className="experiments">
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
                                <td>{experiment.accuracy !== undefined ? experiment.accuracy.toFixed(3) : '—'}</td>
                                <td>{experiment.f1 !== undefined ? experiment.f1.toFixed(3) : '—'}</td>
                                <td className="text-center">
                                    <FontAwesomeIcon
                                        size="2x"
                                        icon={faDownload}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDownload(experiment.id);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Experiments;
