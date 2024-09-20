import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cron from 'node-cron';
import cors from 'cors'; 
import connectDB from './src/config/db.js';
import { syncWithTokko } from './src/utils/syncWithTokko.js';
import { syncWithTokkoid } from './src/utils/syncWithTokkoid.js';
import router from './src/routes/index.router.js';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

connectDB();
app.use(express.static('public'));

app.use('/api', router);

// Configurar los cron jobs para sincronización
cron.schedule('0 */6 * * *', () => {
  console.log('Running cron job to sync with Tokko');
  syncWithTokko();
});

cron.schedule('0 */6 * * *', () => {
  console.log('Running cron job to sync with Tokkoid');
  syncWithTokkoid();
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
