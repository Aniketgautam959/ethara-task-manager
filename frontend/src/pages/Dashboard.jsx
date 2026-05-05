import { useState, useEffect } from 'react';
import api from '../api';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 truncate">Total Tasks</h2>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 truncate">Completed Tasks</h2>
          <p className="mt-1 text-3xl font-semibold text-green-600">{stats.completed}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 truncate">Pending Tasks</h2>
          <p className="mt-1 text-3xl font-semibold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 truncate">Overdue Tasks</h2>
          <p className="mt-1 text-3xl font-semibold text-red-600">{stats.overdue}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
