const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server is running smooth');
});

app.use('/api/items', require('./routes/itemRoutes'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});