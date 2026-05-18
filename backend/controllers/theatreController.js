const pool = require('../config/db');

exports.getTheatres = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT t.*, GROUP_CONCAT(s.title) as show_titles 
            FROM theatres t
            LEFT JOIN shows s ON t.theatre_id = s.theatre_id AND s.status = 'ACTIVE'
            GROUP BY t.theatre_id
        `);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Σφάλμα κατά την ανάκτηση θεάτρων' });
    }
};

exports.getShows = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM shows WHERE status = "ACTIVE"');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Σφάλμα κατά την ανάκτηση παραστάσεων' });
    }
};

exports.getSeatsByShowtime = async (req, res) => {
    const { showtimeId } = req.params;
    try {
        const [seats] = await pool.query(
            `SELECT s.*, 
            (SELECT COUNT(*) FROM reservation_seats rs WHERE rs.seat_id = s.seat_id AND rs.showtime_id = ?) as is_reserved
            FROM seats s
            JOIN showtimes st ON s.hall_id = st.hall_id
            WHERE st.showtime_id = ?`, 
            [showtimeId, showtimeId]
        );
        res.json(seats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Σφάλμα κατά την ανάκτηση των θέσεων' });
    }
};