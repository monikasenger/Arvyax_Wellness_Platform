import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4">
        {/* Loader Spinner */}
        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold animate-pulse text-center">
          Loading, please wait...
        </p>
      </div>
    );

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
