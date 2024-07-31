import express from "express";
import {
  createProblem,
  deleteProblem,
  getDailyProblems,
  getProblemsById,
  updateProblem,
} from "../controllers/problemController.js";
import { isAuthenticated } from "../utils/features.js";

const router = express.Router();

router.post("/createProblem", isAuthenticated, createProblem);
router.get("/getAllProblems", isAuthenticated, getProblemsById);
router.patch("/upadteProblem/:problemId", isAuthenticated, updateProblem);
router.delete("/deleteProblem/:problemId", isAuthenticated, deleteProblem);
router.get("/getDailyProblems", isAuthenticated, getDailyProblems);

export default router;
