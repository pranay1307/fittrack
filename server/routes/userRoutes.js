const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, changePassword } = require('../controllers/userController');
const { auth } = require('../middleware/auth');

router.use(auth);
router.route('/profile').get(getProfile).put(updateProfile);
router.put('/password', changePassword);

module.exports = router;
