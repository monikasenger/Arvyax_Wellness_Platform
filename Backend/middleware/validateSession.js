// middleware/validateSession.js
export const validateSession = (req, res, next) => {
  const { title, tags } = req.body;

  // Title must exist
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  // Tags must exist and be an array of non-empty strings
  if (!Array.isArray(tags) || tags.length === 0 || !tags.every(tag => typeof tag === "string" && tag.trim() !== "")) {
    return res.status(400).json({ message: "Tags must be a non-empty array of strings" });
  }

  // Trim all tags
  req.body.tags = tags.map(tag => tag.trim()).filter(Boolean);

  next();
};
