import { Problems } from "../models/problemModel.js";
import { getUserIdFromCookie } from "../utils/features.js";

export const createProblem = async (req, res) => {
  try {
    const id = getUserIdFromCookie(req);

    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, problem_link, plateform, showAgainAt, notes } = req.body;

    const problem = await Problems.create({
      userId: id,
      title,
      problem_link,
      plateform,
      showAgainAt,
      notes,
    });

    res.status(201).json({ success: true, data: problem });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getProblemsById = async (req, res) => {
  try {
    const id = getUserIdFromCookie(req);

    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const problems = await Problems.find({ userId: id });

    if (!problems) {
      return res.status(404).json({ message: "No problems added yet!" });
    }

    res.status(200).json({ success: true, data: problems });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProblem = async (req, res) => {
  try {
    const { title, problem_link, plateform, showAgainAt, notes } = req.body;
    const { problemId } = req.params;

    const id = getUserIdFromCookie(req);

    if (!id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const problem = await Problems.findOneAndUpdate(
      { _id: problemId, userId: id },
      {
        title,
        problem_link,
        plateform,
        showAgainAt,
        notes,
      },
      { new: true }
    );

    if (!problem) {
      return res
        .status(404)
        .json({ success: false, message: "No such problem added!" });
    }

    res.status(200).json({ success: true, data: problem });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProblem = async (req, res) => {
  try {
    const { problemId } = req.params;

    const id = getUserIdFromCookie(req);

    if (!id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const problem = await Problems.findOneAndDelete({
      _id: problemId,
      userId: id,
    });

    if (!problem) {
      return res
        .status(404)
        .json({ success: false, message: "No such problem added!" });
    }

    res.status(200).json({ success: true, message: "Problem deleted!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDailyProblems = async (req, res) => {
  try {
    const id = getUserIdFromCookie(req);

    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 2);

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 1);

    const problems = await Problems.find({
      userId: id,
      showAgainAt: { $gte: startDate, $lt: endDate },
    });

    res.staus({
      success: true,
      data: problems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
