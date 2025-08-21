import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getSessions,
  getMySessions,
  getMySessionById,
  saveDraft,
  publishSession,
  deleteSession,
} from "../controllers/sessionController.js";
import { validateSession } from "../middleware/validateSession.js";

const sessionrouter = express.Router();

sessionrouter.get("/sessions", getSessions);
sessionrouter.get("/my-sessions", protect, getMySessions);
sessionrouter.get("/my-sessions/:id", protect, getMySessionById);
sessionrouter.post("/my-sessions/save-draft", protect,validateSession, saveDraft);
sessionrouter.post("/my-sessions/publish", protect,validateSession, publishSession);
sessionrouter.delete("/my-sessions/:id", protect, deleteSession);

export default sessionrouter;
