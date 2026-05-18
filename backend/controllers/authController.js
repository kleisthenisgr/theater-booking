const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        res.status(201).json({ message: 'Ο χρήστης δημιουργήθηκε επιτυχώς', userId: result.insertId });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Το email υπάρχει ήδη' });
        } else {
            res.status(500).json({ error: 'Σφάλμα διακομιστή' });
        }
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(404).json({ error: 'Ο χρήστης δεν βρέθηκε' });

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) return res.status(401).json({ error: 'Λάθος κωδικός' });

        const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
        
        res.status(200).json({ 
            message: 'Επιτυχής σύνδεση', 
            token, 
            user: { id: user.user_id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ error: 'Σφάλμα διακομιστή' });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        await pool.query('DELETE FROM users WHERE user_id = ?', [req.userId]);
        res.status(200).json({ message: 'Ο λογαριασμός διαγράφηκε.' });
    } catch (error) {
        res.status(500).json({ error: 'Σφάλμα κατά τη διαγραφή του λογαριασμού' });
    }
};