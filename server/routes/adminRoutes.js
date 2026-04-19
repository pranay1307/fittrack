const express = require('express');
const {
  getAllUsers,
  deleteUser,
  getAllWorkouts,
} = require('../controllers/adminController');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.use(auth, adminOnly);

router.get('/users', getAllUsers);
router.delete('/user/:id', deleteUser);
router.get('/workouts', getAllWorkouts);

module.exports = router;
