import React from 'react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  LineChart,
  Line
} from 'recharts';

/**
 * Renders multiple chart types for a single metric object:
 * - Radar: compares all metric values
 * - Bar: shows individual metric bars
 * - Line: epoch vs accuracy (single point series)
 * - Scatter: precision vs recall
 *
 * @param {{ accuracy: number, precision: number, recall: number, loss: number, epoch: number }} metric
 */
const MetricChart = ({ metric }) => {
  if (!metric) return <p>No metric data provided.</p>;

  // Prepare data
  const radarData = [
    { name: 'Accuracy', value: metric.accuracy },
    { name: 'Precision', value: metric.precision },
    { name: 'Recall', value: metric.recall },
    { name: 'Loss', value: metric.loss }
  ];

  const barData = [...radarData];

  const lineData = [
    { epoch: metric.epoch, accuracy: metric.accuracy }
  ];

  const scatterData = [
    { precision: metric.precision, recall: metric.recall }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridAutoRows: 'auto',
        gap: '20px'
      }}
    >
      {/* Radar Chart */}
      <RadarChart outerRadius={100} width={300} height={300} data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis
          angle={30}
          domain={[0, Math.max(...radarData.map(d => d.value)) * 1.2]}
        />
        <Radar
          name="Metric Values"
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.4}
        />
        <Tooltip />
        <Legend />
      </RadarChart>

      {/* Bar Chart */}
      <BarChart
        width={300}
        height={300}
        data={barData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" name="Value" />
      </BarChart>

      {/* Line Chart: Epoch vs Accuracy */}
      <LineChart
        width={300}
        height={300}
        data={lineData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="epoch" name="Epoch" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="accuracy" name="Accuracy" dot />
      </LineChart>

      {/* Scatter Chart: Precision vs Recall */}
      <ScatterChart
        width={300}
        height={300}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="precision"
          name="Precision"
          unit="%"
        />
        <YAxis type="number" dataKey="recall" name="Recall" unit="%" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter
          name="Precision vs Recall"
          data={scatterData}
          fill="#8884d8"
        />
      </ScatterChart>
    </div>
  );
};

export default MetricChart;
