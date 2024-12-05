import express, { Application } from 'express';
require('dotenv').config();

import authRoutes from './routes/authRoutes';

const app: Application = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send({"data": "Hello"})
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}/`));