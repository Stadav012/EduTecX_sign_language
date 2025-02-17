import { Link } from 'react-router-dom';

export function AdminDashboard() {
  return (
    <div>
      {/* ... other dashboard content ... */}
      <Link 
        to="/manage-lessons"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Manage Lessons
      </Link>
      {/* ... other dashboard content ... */}
    </div>
  );
}