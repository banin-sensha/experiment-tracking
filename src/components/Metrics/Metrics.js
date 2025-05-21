import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../App';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    AreaChart,
    Area,
    ComposedChart
} from 'recharts';

const Metrics = ({ experimentId }) => {
    const { actions, reduxState } = useContext(GlobalContext);

    useEffect(() => {
        actions.fetchMetrics(experimentId);
    }, [experimentId]);

    const { metrics = [] } = reduxState.metrics || {};

    const chartData = metrics.map((metric, idx) => ({
        epoch: metric.epoch !== undefined && metric.epoch !== null ? metric.epoch : idx,
        accuracy: metric.accuracy,
        loss: metric.loss,
        precision: metric.precision,
        recall: metric.recall,
    }));

    return (
        <div className="w-full px-4 border border-blue-500 rounded-2xl shadow-lg p-4">
            <h3 className="text-2xl font-bold text-center mb-6  p-5">Metrics</h3>

            {metrics.length === 0 ? (
                <div className="text-gray-500 text-center border">No metrics available.</div>
            ) : (
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* First row */}
                    <div className="flex flex-wrap gap-6">
                        <div className="w-full md:w-1/2">
                            <MetricCard title="Accuracy" dataKey="accuracy" data={chartData} chartType="line" />
                        </div>
                        <div className="w-full md:w-1/2">
                            <MetricCard title="Loss" dataKey="loss" data={chartData} chartType="bar" />
                        </div>
                    </div>

                    {/* Second row */}
                    <div className="flex flex-wrap gap-6">
                        <div className="w-full md:w-1/2">
                            <MetricCard title="Precision" dataKey="precision" data={chartData} chartType="area" />
                        </div>
                        <div className="w-full md:w-1/2">
                            <MetricCard title="Recall" dataKey="recall" data={chartData} chartType="composed" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const MetricCard = ({ title, dataKey, data, chartType }) => {
    let chart;
    
    switch (chartType) {
        case 'line':
            chart = (
                <div className="bg-white rounded-2xl shadow-md p-4">
                <ResponsiveContainer width={1000} height={500}>
                    <LineChart data={data}>
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke="#4f46e5"
                            strokeWidth={2}
                            dot={{ r: 2 }}
                        />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <XAxis dataKey="epoch" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            );
            break;
        case 'bar':
            chart = (
                <div className="bg-white rounded-2xl shadow-md p-4">
                <ResponsiveContainer width={1000} height={500}>
                    <BarChart data={data}>
                        <Bar dataKey={dataKey} fill="#4f46e5" />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <XAxis dataKey="epoch" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            );
            break;
        case 'area':
            chart = (
                <div className="bg-white rounded-2xl shadow-md p-4">
                <ResponsiveContainer width={1000} height={500}>
                    <AreaChart data={data}>
                        <Area type="monotone" dataKey={dataKey} stroke="#4f46e5" fill="#4f46e5" />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <XAxis dataKey="epoch" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            );
            break;
        case 'composed':
            chart = (
                <div className="bg-white rounded-2xl shadow-md p-4">
                <ResponsiveContainer width={1000} height={500}>
                    <ComposedChart data={data}>
                        <Area type="monotone" dataKey="loss" fill="#8884d8" stroke="#8884d8" />
                        <Line type="monotone" dataKey="recall" stroke="#4f46e5" />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <XAxis dataKey="epoch" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            );
            break;
        default:
            chart = null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 border">
            <h3 className="text-lg font-semibold mb-3">{title}</h3>
            <ResponsiveContainer width="50%" height={500}>
                {chart}
            </ResponsiveContainer>
        </div>
    );
};

export default Metrics;
