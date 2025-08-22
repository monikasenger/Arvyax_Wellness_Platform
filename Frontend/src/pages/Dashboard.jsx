import Navbar from "../components/Navbar";
import SessionCard from "../components/SessionCard";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaRegEdit, FaChalkboardTeacher } from "react-icons/fa";

export default function Dashboard() {
  const { user, sessions, mySessions, fetchSessions, fetchMySessions } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
    if (user) {
      fetchMySessions();
    }
  }, [user]);

  const draftCount = mySessions.filter((s) => s.status === "draft").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* Total Published Sessions */}
          <div
            className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl 
             flex flex-col items-center justify-center transition-all duration-300 
             hover:-translate-y-1 border-2 border-transparent 
             bg-clip-padding bg-gradient-to-r from-blue-200 via-blue-50 to-indigo-200"
          >
            {/* Icon Badge */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4 shadow-inner">
              <FaBookOpen className="text-blue-600 text-2xl sm:text-3xl" />
            </div>
            <span className="text-gray-500 text-sm sm:text-base">Total Published Sessions</span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">{sessions.length}</span>
          </div>

          {/* My Drafts */}
          {user && (
            <div
              className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl 
               flex flex-col items-center justify-center cursor-pointer 
               transition-all duration-300 hover:-translate-y-1 border-2 border-transparent 
               bg-clip-padding bg-gradient-to-r from-yellow-200 via-yellow-50 to-orange-200"
              onClick={() => navigate("/my-sessions")}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-yellow-100 mb-4 shadow-inner">
                <FaRegEdit className="text-yellow-500 text-2xl sm:text-3xl" />
              </div>
              <span className="text-gray-500 text-sm sm:text-base">My Drafts</span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">{draftCount}</span>
            </div>
          )}
        </div>

        {/* Published Sessions Heading */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-indigo-100">
              <FaChalkboardTeacher className="text-indigo-600 text-xl sm:text-2xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-wide">
              Published Sessions
            </h1>
          </div>
          {/* Thin accent underline */}
          <div className="h-1 w-24 sm:w-36 mt-2 bg-indigo-500/80 rounded-full"></div>
        </div>

        {/* Published Sessions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sessions.map((s) => (
            <SessionCard
              key={s._id}
              title={s.title}
              tags={s.tags}
              status={s.status}
              updatedAt={s.updated_at || s.updatedAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
