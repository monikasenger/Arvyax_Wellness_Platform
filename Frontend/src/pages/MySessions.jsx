import Navbar from "../components/Navbar";
import SessionCard from "../components/SessionCard";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft, FiPlus, FiFilter } from "react-icons/fi";

export default function MySessions() {
  const { user, mySessions, fetchMySessions, deleteSession } = useAuth();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  // Load user sessions
  useEffect(() => {
    const loadSessions = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        await fetchMySessions();
      } catch (err) {
        toast.error("Failed to load your sessions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadSessions();
  }, [user, fetchMySessions]);

  // Delete session
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;
    setLoading(true);
    try {
      await deleteSession(id);
      toast.success("Session deleted!");
    } catch (err) {
      toast.error("Failed to delete session");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter
  const filteredSessions =
    filter === "all" ? mySessions : mySessions.filter((s) => s.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 flex items-center gap-2">
            <FiFilter className="text-blue-600" /> My Sessions
          </h1>

          {/* Top Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-center gap-2 bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition text-sm sm:text-base"
            >
              <FiArrowLeft /> Back
            </button>

            <Link
              to="/editor"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition text-sm sm:text-base"
            >
              <FiPlus /> New Session
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["all", "draft", "published"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition shadow-sm ${
                filter === f
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Sessions */}
        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading sessions...</p>
        ) : !user ? (
          <p className="text-center text-gray-500 mt-10">Please login to view sessions</p>
        ) : filteredSessions.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No sessions found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSessions.map((s) => (
              <SessionCard
                key={s._id}
                title={s.title}
                tags={s.tags}
                status={s.status}
                updatedAt={s.updated_at || s.created_at}
                onEdit={() => navigate(`/editor/${s._id}`)}
                onDelete={() => handleDelete(s._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
