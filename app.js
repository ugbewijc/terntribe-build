/**
 * Use JSON for request and response formats.
 * 
 */
import express from 'express';
import causesRouter from './routes/causes.js';
import { initilizeDb } from './models/db.js';
const app = express();
app.use(express.json());

initilizeDb();

const port = process.env.PORT || 3000;

app.use('/causes', causesRouter);

app.get('', (req, res) => {
    res.status(200).json({ data: 'Hello, Welcome to Backend Role Assessments for Terntribe BUILD' });
  })

// General 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ data: 'Not Found' });
});

// General error handler for uncaught errors
app.use((err, req, res) => {
  res.status(500).json({ data: 'Something went wrong!' });
});

app.listen(port, () => { 
    console.log(`app listening on port ${port}`)
  })

export default app