import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import App from './App';
import AdminPanel from './AdminPanel';
import AdminLogin from './AdminLogin';
import './index.css';

function ProtectedRoute({ children }: { children: JSX.Element }) {
    const token = localStorage.getItem('adminToken');
    return token ? children : <Navigate to='/login' />;
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/login' element={<AdminLogin />} />
                <Route
                    path='/admin'
                    element={
                        <ProtectedRoute>
                            <AdminPanel />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    </StrictMode>
);
