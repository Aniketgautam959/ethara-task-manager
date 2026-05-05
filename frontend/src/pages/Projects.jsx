import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const Projects = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    fetchProjects();
    if (user.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', { name, description, members: selectedMembers });
      setName('');
      setDescription('');
      setSelectedMembers([]);
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMemberChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedMembers(value);
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        {user.role === 'admin' && (
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            {showForm ? 'Cancel' : 'Create Project'}
          </button>
        )}
      </div>

      {showForm && user.role === 'admin' && (
        <div className="bg-white p-6 rounded-lg shadow mb-6 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Project Name</label>
              <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
              <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Members (Ctrl/Cmd click to select multiple)</label>
              <select multiple className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" onChange={handleMemberChange} value={selectedMembers}>
                {users.map(u => (
                  <option key={u._id} value={u._id}>{u.username}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5">Save Project</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project._id} className="bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{project.name}</h5>
            <p className="mb-3 font-normal text-gray-700 flex-grow">{project.description}</p>
            <div className="mt-4">
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blue-600 bg-blue-200 last:mr-0 mr-1">
                Members: {project.members.length}
              </span>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-gray-500">No projects found.</p>}
      </div>
    </div>
  );
};

export default Projects;
