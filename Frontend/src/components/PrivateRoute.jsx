
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        {/* Loader Spinner */}
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-semibold animate-pulse">Loading, please wait...</p>
      </div>
    );

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
