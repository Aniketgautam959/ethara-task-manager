import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signup', { name, email, password, role });
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Role</label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" value={role} onChange={e => setRole(e.target.value)}>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign Up</button>
        </form>
        <p className="mt-4 text-sm font-light text-gray-500">
          Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
