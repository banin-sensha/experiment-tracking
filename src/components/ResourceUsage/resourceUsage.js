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
} from 'recharts';

const ResourceUsage = ({ experimentId }) => {
    const { actions, reduxState } = useContext(GlobalContext);

    useEffect(() => {
        actions.fetchResourceUsage(experimentId);
    }, [experimentId]);

    const { resources = [] } = reduxState.resourceUsage || {};
    
    const chartData = resources.map((entry, idx) => ({
        epoch: entry.epoch !== undefined && entry.epoch !== null ? entry.epoch : idx,
        cpu: entry.cpu_usage_percent,
        memory: entry.memory_usage_mb,
        gpu: entry.gpu_usage_percent,
        gpuMemory: entry.gpu_memory_usage_mb,
        time: entry.training_time_sec,
    }));
    return (
        <div className="w-full px-4 border border-blue-500 rounded-2xl shadow-lg p-4 ">
            <h3 className="text-2xl font-bold text-center mb-6 p-5">Resource Usage</h3>
            {resources.length === 0 ? (
                <div className="text-gray-500 text-center border">No resource usage data available.</div>
            ) : (
                <div className="max-w-7xl mx-auto space-y-6">
                    <ResourceChart title="CPU Usage (%)" dataKey="cpu" data={chartData} />
                    <ResourceChart title="Memory Usage (MB)" dataKey="memory" data={chartData} />
                    <ResourceChart title="GPU Usage (%)" dataKey="gpu" data={chartData} />
                    <ResourceChart title="GPU Memory Usage (MB)" dataKey="gpuMemory" data={chartData} />
                    <ResourceChart title="Training Time (s)" dataKey="time" data={chartData} />
                </div>
            )}
        </div>
    );
};

const ResourceChart = ({ title, dataKey, data }) => (
    <div className="bg-white rounded-2xl shadow-md p-4 border">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <Line type="monotone" dataKey={dataKey} stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="epoch" />
                <YAxis />
                <Tooltip />
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

export default ResourceUsage;
