import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

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

  if (!stats) return <div className="py-6">Loading...</div>;

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 truncate">Total Tasks</h2>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 truncate">To Do</h2>
          <p className="mt-1 text-3xl font-semibold text-gray-600">{stats.statusCounts?.todo || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 truncate">In Progress</h2>
          <p className="mt-1 text-3xl font-semibold text-blue-600">{stats.statusCounts?.inProgress || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 truncate">Done</h2>
          <p className="mt-1 text-3xl font-semibold text-green-600">{stats.statusCounts?.done || 0}</p>
        </div>
      </div>
      
      {user.role === 'admin' && stats.tasksPerUser && (
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Tasks per User</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(stats.tasksPerUser).map(([name, count]) => (
              <div key={name} className="flex justify-between items-center p-3 bg-gray-50 rounded border">
                <span className="font-medium">{name}</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{count} tasks</span>
              </div>
            ))}
            {Object.keys(stats.tasksPerUser).length === 0 && <p className="text-sm text-gray-500">No assigned tasks yet.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
