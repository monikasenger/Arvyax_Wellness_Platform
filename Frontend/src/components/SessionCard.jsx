import { FaTag, FaCheckCircle, FaClock, FaRegEdit, FaTrash } from "react-icons/fa";
import { MdTitle } from "react-icons/md";

export default function SessionCard({
  title,
  tags = [],
  status = "draft",
  updatedAt,
  onEdit,
  onDelete,
}) {
  return (
    <div className="relative bg-white/80 backdrop-blur-md shadow-lg hover:shadow-2xl rounded-2xl p-6 border border-gray-200 transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.02]">
      {/* Gradient Border Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 opacity-20 blur-xl"></div>

      {/* Title */}
      <h2 className="flex items-center gap-2 text-xl font-extrabold text-gray-800 tracking-wide relative z-10">
        <MdTitle className="text-indigo-600" /> {title}
      </h2>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3 relative z-10">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
          >
            <FaTag className="text-white/90" /> {tag}
          </span>
        ))}
      </div>

      {/* Footer (Status + Updated Time + Action Buttons) */}
      <div className="mt-5 flex items-center justify-between text-sm relative z-10">
        {/* Status */}
        <span
          className={`flex items-center gap-2 px-3 py-1 rounded-full font-semibold shadow-sm ${
            status === "published"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status === "published" ? (
            <FaCheckCircle className="text-green-600" />
          ) : (
            <FaRegEdit className="text-yellow-600" />
          )}
          {status}
        </span>

        {/* Updated Time */}
        {updatedAt && (
          <span className="flex items-center gap-2 text-xs text-gray-500 italic ml-4">
            <FaClock className="text-gray-400" /> Updated {updatedAt}
          </span>
        )}
      </div>

      {/* Action Buttons (sirf tab dikhenge jab parent se props aaye) */}
      {(onEdit || onDelete) && (
        <div className="mt-4 flex justify-end gap-3 relative z-10">
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md text-sm"
            >
              <FaRegEdit /> Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md text-sm"
            >
              <FaTrash /> Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
