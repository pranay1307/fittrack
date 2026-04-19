const Workout = require('../models/Workout');

// @desc    Get all workouts for current user
// @route   GET /api/workouts
exports.getWorkouts = async (req, res) => {
  try {
    const { type, status, page = 1, limit = 20 } = req.query;
    const filter = { userId: req.userId };
    if (type) filter.type = type;
    if (status) filter.status = status;

    const workouts = await Workout.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Workout.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: workouts.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: workouts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single workout
// @route   GET /api/workouts/:id
exports.getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }
    if (workout.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.status(200).json({ success: true, data: workout });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new workout
// @route   POST /api/workouts
exports.createWorkout = async (req, res) => {
  try {
    const { title, type, exercises, duration, caloriesBurned, difficulty, notes, scheduledDate } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Please provide a workout title' });
    }
    const workout = await Workout.create({
      userId: req.userId,
      title,
      type: type || 'custom',
      exercises: exercises || [],
      duration: duration || 0,
      caloriesBurned: caloriesBurned || 0,
      difficulty: difficulty || 'intermediate',
      notes,
      scheduledDate,
    });
    res.status(201).json({ success: true, data: workout });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a workout
// @route   PUT /api/workouts/:id
exports.updateWorkout = async (req, res) => {
  try {
    let workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }
    if (workout.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: workout });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found' });
    }
    if (workout.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    await Workout.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Workout deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get workout stats for dashboard
// @route   GET /api/workouts/stats
exports.getWorkoutStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalWorkouts, weeklyWorkouts, monthlyWorkouts, recentWorkouts] = await Promise.all([
      Workout.countDocuments({ userId: req.userId }),
      Workout.find({ userId: req.userId, createdAt: { $gte: startOfWeek } }),
      Workout.find({ userId: req.userId, createdAt: { $gte: startOfMonth } }),
      Workout.find({ userId: req.userId }).sort({ createdAt: -1 }).limit(5),
    ]);

    const weeklyCalories = weeklyWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
    const weeklyDuration = weeklyWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
    const monthlyCalories = monthlyWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);

    // Weekly chart data (last 7 days)
    const weeklyChartData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));
      const dayWorkouts = weeklyWorkouts.filter(
        (w) => new Date(w.createdAt) >= dayStart && new Date(w.createdAt) <= dayEnd
      );
      weeklyChartData.push({
        day: dayStart.toLocaleDateString('en', { weekday: 'short' }),
        workouts: dayWorkouts.length,
        calories: dayWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0),
        duration: dayWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0),
      });
    }

    res.status(200).json({
      success: true,
      data: {
        totalWorkouts,
        weeklyWorkouts: weeklyWorkouts.length,
        monthlyWorkouts: monthlyWorkouts.length,
        weeklyCalories,
        weeklyDuration,
        monthlyCalories,
        weeklyChartData,
        recentWorkouts,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
