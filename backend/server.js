const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const theatreRoutes = require('./routes/theatreRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', theatreRoutes);
app.use('/api', reservationRoutes);

const PORT = process.env.PORT || 3000;
const BASE_IP = process.env.BASE_IP || 'localhost';

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Network access: http://${BASE_IP}:${PORT}/api`);
});