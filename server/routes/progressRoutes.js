const express = require('express');
const router = express.Router();
const { getProgress, createProgress, deleteProgress } = require('../controllers/progressController');
const { auth } = require('../middleware/auth');

router.use(auth);
router.route('/').get(getProgress).post(createProgress);
router.route('/:id').delete(deleteProgress);

module.exports = router;
