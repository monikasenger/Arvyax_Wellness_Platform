import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import {
  FiEdit3,
  FiTag,
  FiLink,
  FiSave,
  FiSend,
  FiArrowLeft,
} from "react-icons/fi";

export default function SessionEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchMySessionById, saveDraft, publishSession } = useAuth();

  const [isDirty, setIsDirty] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [jsonFileUrl, setJsonFileUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const typingTimeout = useRef(null);

  // Load existing session if editing
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const loadSession = async () => {
      try {
        const session = await fetchMySessionById(id);
        if (session) {
          setTitle(session.title || "");
          setTags(session.tags?.join(", ") || "");
          setJsonFileUrl(session.json_file_url || "");
        }
      } catch (err) {
        toast.error("Failed to load session");
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, [id, fetchMySessionById]);

  // Auto-save effect
  useEffect(() => {
    if (!isDirty) return;

    const tagArray = tags.split(",").map((t) => t.trim()).filter(Boolean);

    if (!title || tagArray.length === 0 || !jsonFileUrl) {
      toast.error("All fields must be filled To Auto Saved");
      return;
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(async () => {
      try {
        await saveDraft(title, tagArray, jsonFileUrl, id || null);
        setIsDirty(false);
        toast.success("Auto-saved");
      } catch (err) {
        console.error("Auto-save error:", err);
      }
    }, 5000);

    return () => clearTimeout(typingTimeout.current);
  }, [title, tags, jsonFileUrl, saveDraft, id, isDirty]);

  // Input change handlers
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setIsDirty(true);
  };
  const handleTagsChange = (e) => {
    setTags(e.target.value);
    setIsDirty(true);
  };
  const handleJsonChange = (e) => {
    setJsonFileUrl(e.target.value);
    setIsDirty(true);
  };

  // Save draft
  const handleSaveDraft = async () => {
    if (!title) return toast.error("Title is required");

    const tagArray = tags.split(",").map((t) => t.trim()).filter(Boolean);
    try {
      await saveDraft(title, tagArray, jsonFileUrl || "", id || null);
      toast.success("Draft saved!");
      navigate("/my-sessions");
    } catch (err) {
      toast.error("Failed to save draft");
    }
  };

  // Publish
  const handlePublish = async () => {
    if (!title) return toast.error("Title is required");

    const tagArray = tags.split(",").map((t) => t.trim()).filter(Boolean);
    try {
      await publishSession(title, tagArray, jsonFileUrl || "", id || null);
      toast.success("Session published!");
      navigate("/my-sessions");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to publish session");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading session...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <FiEdit3 className="text-indigo-600" />
              {id ? "Edit Session" : "New Session"}
            </h1>
            <button
              onClick={() => navigate("/my-sessions")}
              className="flex items-center justify-center gap-2 bg-gray-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-600 shadow text-sm sm:text-base"
            >
              <FiArrowLeft /> Back
            </button>
          </div>

          {/* Title */}
          <div className="mb-4 relative">
            <label className="block font-semibold mb-1 text-sm sm:text-base">
              Title
            </label>
            <div className="relative">
              <FiEdit3 className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="w-full border rounded-lg pl-10 pr-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                placeholder="Enter session title"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4 relative">
            <label className="block font-semibold mb-1 text-sm sm:text-base">
              Tags (comma separated)
            </label>
            <div className="relative">
              <FiTag className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={tags}
                onChange={handleTagsChange}
                className="w-full border rounded-lg pl-10 pr-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                placeholder="e.g. meditation, wellness"
              />
            </div>
          </div>

          {/* JSON URL */}
          <div className="mb-6 relative">
            <label className="block font-semibold mb-1 text-sm sm:text-base">
              JSON File URL
            </label>
            <div className="relative">
              <FiLink className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={jsonFileUrl}
                onChange={handleJsonChange}
                className="w-full border rounded-lg pl-10 pr-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                placeholder="Enter JSON file URL"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleSaveDraft}
              className="flex items-center justify-center gap-2 bg-yellow-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-yellow-600 shadow-md text-sm sm:text-base"
            >
              <FiSave /> Save Draft
            </button>
            <button
              onClick={handlePublish}
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-600 shadow-md text-sm sm:text-base"
            >
              <FiSend /> Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
