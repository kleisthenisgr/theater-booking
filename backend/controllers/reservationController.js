const pool = require('../config/db');

exports.getAvailableShowtimes = async (req, res) => {
    const { showId } = req.params;
    try {
        const [showtimes] = await pool.query(`
            SELECT st.*, h.name as hall_name 
            FROM showtimes st 
            JOIN halls h ON st.hall_id = h.hall_id 
            WHERE st.show_id = ? AND st.status = "ACTIVE"
        `, [showId]);
        res.status(200).json(showtimes);
    } catch (error) {
        res.status(500).json({ error: 'Σφάλμα ανάκτησης προβολών' });
    }
};

exports.getAvailableSeats = async (req, res) => {
    const { showtimeId } = req.params;
    try {
        const [showtimes] = await pool.query('SELECT hall_id FROM showtimes WHERE showtime_id = ?', [showtimeId]);
        if (showtimes.length === 0) return res.status(404).json({ error: 'Δεν βρέθηκε η προβολή' });
        const hallId = showtimes[0].hall_id;

        const [seats] = await pool.query(`
            SELECT s.*, 
                   IF(EXISTS (
                       SELECT 1 FROM reservation_seats rs 
                       JOIN reservations r ON rs.reservation_id = r.reservation_id
                       WHERE rs.seat_id = s.seat_id 
                       AND rs.showtime_id = ? 
                       AND r.status = 'CONFIRMED'
                   ), 0, 1) AS is_available 
            FROM seats s
            WHERE s.hall_id = ?
        `, [showtimeId, hallId]);

        res.status(200).json(seats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Σφάλμα ανάκτησης θέσεων' });
    }
};

exports.createReservation = async (req, res) => {
    const { showtimeId, seatIds, totalAmount } = req.body;
    const userId = req.userId;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [resResult] = await connection.query(
            'INSERT INTO reservations (user_id, showtime_id, total_amount, status) VALUES (?, ?, ?, "CONFIRMED")',
            [userId, showtimeId, totalAmount]
        );
        const reservationId = resResult.insertId;
        for (let seatId of seatIds) {
            await connection.query(
                'INSERT INTO reservation_seats (reservation_id, showtime_id, seat_id, seat_price) VALUES (?, ?, ?, ?)',
                [reservationId, showtimeId, seatId, totalAmount / seatIds.length]
            );
        }
        await connection.commit();
        res.status(201).json({ message: 'Η κράτηση ολοκληρώθηκε επιτυχώς!', reservationId });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: 'Σφάλμα κατά την κράτηση.', details: error.message });
    } finally {
        connection.release();
    }
};

exports.getUserReservations = async (req, res) => {
    try {
        const [reservations] = await pool.query(`
            SELECT r.reservation_id, r.total_amount, r.status, r.reserved_at,
                   st.start_time, sh.title AS show_title, t.name AS theatre_name,
                   h.name as hall_name,
                   GROUP_CONCAT(CONCAT(se.row_label, se.seat_number) SEPARATOR ', ') as seats
            FROM reservations r
            JOIN showtimes st ON r.showtime_id = st.showtime_id
            JOIN shows sh ON st.show_id = sh.show_id
            JOIN theatres t ON sh.theatre_id = t.theatre_id
            JOIN halls h ON st.hall_id = h.hall_id
            LEFT JOIN reservation_seats rs ON r.reservation_id = rs.reservation_id
            LEFT JOIN seats se ON rs.seat_id = se.seat_id
            WHERE r.user_id = ?
            GROUP BY r.reservation_id
            ORDER BY r.reserved_at DESC
        `, [req.userId]); 

        res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Σφάλμα ανάκτησης κρατήσεων' });
    }
};

exports.cancelReservation = async (req, res) => {
    const reservationId = req.params.id;
    const userId = req.userId;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [reservation] = await connection.query(
            'SELECT * FROM reservations WHERE reservation_id = ? AND user_id = ?',
            [reservationId, userId]
        );
        if (reservation.length === 0) {
            await connection.rollback();
            return res.status(404).json({ error: 'Η κράτηση δεν βρέθηκε.' });
        }
        await connection.query('DELETE FROM reservation_seats WHERE reservation_id = ?', [reservationId]);
        await connection.query('UPDATE reservations SET status = "CANCELLED" WHERE reservation_id = ?', [reservationId]);
        await connection.commit();
        res.status(200).json({ message: 'Η κράτηση ακυρώθηκε και οι θέσεις απελευθερώθηκαν.' });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: 'Σφάλμα κατά την ακύρωση.' });
    } finally {
        connection.release();
    }
};