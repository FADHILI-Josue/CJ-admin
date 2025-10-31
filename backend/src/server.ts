import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { setupSwagger } from './utils/swagger';
import { logger } from './utils/logger';
// Import your routes here
// import authRoutes from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 5002;

// --- Middlewares ---
app.use(helmet()); // Secure HTTP headers
app.use(cors({ origin: 'http://localhost:3001' })); // Adjust for your admin frontend URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_, res) => {
        logger.warn('Rate limit exceeded');
        res.status(429).send('Too many requests, please try again later.');
    }
});
app.use(limiter);

// --- Swagger Docs ---
setupSwagger(app);

// --- Routes ---
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
// ... other routes

app.listen(PORT, () => {
    logger.info(`Admin server is running on http://localhost:${PORT}`);
});