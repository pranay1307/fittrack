const Progress = require('../models/Progress');

// @desc    Get progress entries
// @route   GET /api/progress
exports.getProgress = async (req, res) => {
  try {
    const { startDate, endDate, limit = 30 } = req.query;
    const filter = { userId: req.userId };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const progress = await Progress.find(filter)
      .sort({ date: -1 })
      .limit(Number(limit));

    res.status(200).json({ success: true, count: progress.length, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create/update progress entry for today
// @route   POST /api/progress
exports.createProgress = async (req, res) => {
  try {
    const { date, weight, bodyFat, bmi, caloriesBurned, caloriesConsumed, proteinIntake, workoutDuration, steps, notes } = req.body;

    const entryDate = date ? new Date(date) : new Date();
    entryDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(entryDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Upsert: update if exists for this date, create otherwise
    const progress = await Progress.findOneAndUpdate(
      { userId: req.userId, date: { $gte: entryDate, $lt: nextDay } },
      {
        userId: req.userId,
        date: entryDate,
        weight, bodyFat, bmi, caloriesBurned, caloriesConsumed,
        proteinIntake, workoutDuration, steps, notes,
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a progress entry
// @route   DELETE /api/progress/:id
exports.deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) {
      return res.status(404).json({ success: false, message: 'Progress entry not found' });
    }
    if (progress.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    await Progress.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Progress entry deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
