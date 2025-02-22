import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data for demonstration
const mockData = [
  { epoch: 1, ensemble: 0.85, rf: 0.82, xgb: 0.83, lgbm: 0.81 },
  { epoch: 2, ensemble: 0.87, rf: 0.83, xgb: 0.85, lgbm: 0.84 },
  { epoch: 3, ensemble: 0.89, rf: 0.85, xgb: 0.86, lgbm: 0.85 },
  { epoch: 4, ensemble: 0.91, rf: 0.86, xgb: 0.88, lgbm: 0.87 },
  { epoch: 5, ensemble: 0.92, rf: 0.87, xgb: 0.89, lgbm: 0.88 },
];

const metrics = [
  { name: 'Accuracy', value: '92.5%' },
  { name: 'Precision', value: '91.8%' },
  { name: 'Recall', value: '90.2%' },
  { name: 'F1 Score', value: '91.0%' },
];

function Results() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Model Performance Results
      </h2>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Performance Metrics
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.name}
              className="bg-white p-4 rounded-lg border border-gray-200"
            >
              <p className="text-sm text-gray-500">{metric.name}</p>
              <p className="text-2xl font-semibold text-indigo-600">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Training Progress
        </h3>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="ensemble"
                stroke="#4F46E5"
                strokeWidth={2}
              />
              <Line type="monotone" dataKey="rf" stroke="#10B981" />
              <Line type="monotone" dataKey="xgb" stroke="#F59E0B" />
              <Line type="monotone" dataKey="lgbm" stroke="#EC4899" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
          Download Report
        </button>
      </div>
    </div>
  );
}

export default Results;