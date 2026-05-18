const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/showtimes/:showId', verifyToken, reservationController.getAvailableShowtimes);
router.get('/seats/:showtimeId', verifyToken, reservationController.getAvailableSeats);
router.post('/reservations', verifyToken, reservationController.createReservation);
router.get('/user/reservations', verifyToken, reservationController.getUserReservations);

router.delete('/reservations/:id', verifyToken, reservationController.cancelReservation); 

module.exports = router;