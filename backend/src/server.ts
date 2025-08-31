import app from './app.js';
import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: `.env.${env}` });

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`🌐 Allowed origins: ${process.env.CORS_ORIGIN ?? 'not set'}`);
});
