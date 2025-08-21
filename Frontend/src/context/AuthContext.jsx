import { createContext, useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Create AuthContext
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { token, name, email, id }
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]); // All published sessions
  const [mySessions, setMySessions] = useState([]); // User's sessions (draft + published)

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // ========================
  // Auth Functions
  // ========================
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${backendURL}/auth/register`, { name, email, password });
      toast.success("Registration successful! Please login.");
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      toast.error(message);
      throw message;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${backendURL}/auth/login`, { email, password });
      const { token, user: userData } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser({ ...userData, token });

      toast.success("Login successful!");
      return userData;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      toast.error(message);
      throw message;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setMySessions([]);
    toast.success("Logged out successfully!");
  };

  // ========================
  // Session Functions
  // ========================
  const fetchSessions = async () => {
    try {
      const res = await axios.get(`${backendURL}/sessions`);
      setSessions(res.data);
      return res.data;
    } catch (err) {
      toast.error("Failed to fetch sessions");
      throw err;
    }
  };

  const fetchMySessions = useCallback(async () => {
    if (!user?.token) return [];
    try {
      const res = await axios.get(`${backendURL}/my-sessions`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMySessions(res.data);
      return res.data;
    } catch (err) {
      toast.error("Failed to fetch your sessions");
      throw err;
    }
  }, [user?.token]);

  const fetchMySessionById = async (id) => {
    if (!user?.token) return null;
    try {
      const res = await axios.get(`${backendURL}/my-sessions/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      return res.data;
    } catch (err) {
      toast.error("Failed to fetch session");
      throw err;
    }
  };

  const saveDraft = async (title, tags, json_file_url, id = null) => {
    if (!user?.token) return null;
    try {
      const res = await axios.post(
        `${backendURL}/my-sessions/save-draft`,
        { id, title, tags, json_file_url },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success("Draft saved!");
      await fetchMySessions(); // Refresh user sessions
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save draft");
      throw err;
    }
  };

  const publishSession = async (title, tags, json_file_url, id = null) => {
    if (!user?.token) return null;
    try {
      const res = await axios.post(
        `${backendURL}/my-sessions/publish`,
        { id, title, tags, json_file_url },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success("Session published!");
      await fetchMySessions(); // Refresh user sessions
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to publish session");
      throw err;
    }
  };

  const deleteSession = async (id) => {
    if (!user?.token) return;
    try {
      await axios.delete(`${backendURL}/my-sessions/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Session deleted successfully!");
      await fetchMySessions(); // Refresh user sessions
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete session");
    }
  };

  // ========================
  // Restore user & fetch sessions on app load
  // ========================
  useEffect(() => {
    const loadApp = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        const userData = JSON.parse(storedUser);
        setUser({ ...userData, token });
      }

      try {
        await fetchSessions();
        if (token) await fetchMySessions();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadApp();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        sessions,
        mySessions,
        fetchSessions,
        fetchMySessions,
        fetchMySessionById,
        saveDraft,
        publishSession,
        deleteSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
