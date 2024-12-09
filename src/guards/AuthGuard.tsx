import { Navigate, useLocation } from 'react-router';

// store
import { authStore } from '../store';

const AuthGuard = ({ children }: { children: JSX.Element }) => {
	const location = useLocation();

	const { isAuthenticated } = authStore((state) => state);

	if (isAuthenticated === null) {
		return <>Loading</>;
	}

	if (!isAuthenticated && location.pathname === '/login') {
		return children;
	}

	if (isAuthenticated && location.pathname === '/login') {
		return <Navigate to='/' replace />;
	}

	return isAuthenticated ? children : <Navigate to='/login' replace />;
};

export default AuthGuard;
