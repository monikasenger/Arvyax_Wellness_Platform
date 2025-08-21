import Session from "../models/Session.js";

// Fetch all published sessions
export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "published" });
    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
};

// Fetch user's sessions (draft + published)
export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user._id });
    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch your sessions" });
  }
};

// Fetch a single session by ID
export const getMySessionById = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch session" });
  }
};

// Save or update draft
export const saveDraft = async (req, res) => {
  try {
    // Ensure user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { id, title, tags, json_file_url } = req.body;

    // Validate input
    if (!title || !Array.isArray(tags)) {
      return res.status(400).json({ message: "Title and tags are required" });
    }

    const tagsArray = tags.map(tag => tag.trim()).filter(Boolean);
    let session;

    if (id) {
      // Update existing draft
      session = await Session.findOne({ _id: id, user_id: req.user._id });
      if (!session) return res.status(404).json({ message: "Session not found" });

      session.title = title;
      session.tags = tagsArray;
      if (json_file_url) session.json_file_url = json_file_url;
      session.status = "draft";
      session.updated_at = Date.now();

      await session.save();
    } else {
      // Create new draft
      session = await Session.create({
        user_id: req.user._id, // make sure this exists
        title,
        tags: tagsArray,
        json_file_url: json_file_url || "",
        status: "draft",
        created_at: Date.now(),
        updated_at: Date.now(),
      });
    }

    res.json({ message: "Draft saved successfully", session });
  } catch (err) {
    console.error("SAVE DRAFT ERROR:", err);
    res.status(500).json({ message: "Failed to save draft" });
  }
};


// Publish session
export const publishSession = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user); // <-- add this

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { id, title, tags, json_file_url } = req.body;
    const tagsArray = tags.map(tag => tag.trim());

    let session;
    if (id) {
      session = await Session.findOne({ _id: id, user_id: req.user._id });
      if (!session) return res.status(404).json({ message: "Session not found" });

      session.title = title;
      session.tags = tagsArray;
      session.json_file_url = json_file_url;
      session.status = "published";
      session.updated_at = Date.now();
      await session.save();
    } else {
      session = await Session.create({
        user_id: req.user._id, // <-- this was failing
        title,
        tags: tagsArray,
        json_file_url,
        status: "published",
      });
    }

    res.json({ message: "Session published", session });
  } catch (err) {
    console.error("PUBLISH ERROR:", err);
    res.status(500).json({ message: "Failed to publish session" });
  }
};



// Delete session
export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findOne({ _id: id, user_id: req.user._id });
    if (!session) return res.status(404).json({ message: "Session not found" });

    await session.deleteOne();
    res.json({ message: "Session deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while deleting session" });
  }
};
