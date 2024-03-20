const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const dotenv=require('dotenv')

dotenv.config({ path: './.env' });
const app = express();

app.use(express.json());

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
