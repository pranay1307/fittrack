const express = require('express');
const router = express.Router();
const { getWorkouts, getWorkout, createWorkout, updateWorkout, deleteWorkout, getWorkoutStats } = require('../controllers/workoutController');
const { auth } = require('../middleware/auth');

router.use(auth);
router.get('/stats', getWorkoutStats);
router.route('/').get(getWorkouts).post(createWorkout);
router.route('/:id').get(getWorkout).put(updateWorkout).delete(deleteWorkout);

module.exports = router;
