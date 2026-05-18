const express = require('express');
const router = express.Router();
const theatreController = require('../controllers/theatreController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/theatres', verifyToken, theatreController.getTheatres);
router.get('/shows', verifyToken, theatreController.getShows);

module.exports = router;