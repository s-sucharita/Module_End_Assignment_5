const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// Get all tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// Add task
router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    user: req.user.id
  });
  res.json(task);
});

// Update task
router.put("/:id", auth, async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  );
  res.json(updated);
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
