import { Link } from 'react-router-dom';

// ... other imports ...

export function Navbar() {
  return (
    <nav>
      {/* ... other nav items ... */}
      <Link 
        to="/manage-lessons"
        className="text-white hover:text-gray-200"
      >
        Manage Lessons
      </Link>
      {/* ... other nav items ... */}
    </nav>
  );
}