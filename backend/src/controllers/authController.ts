import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AuthService } from '../services/authService';
import { logger } from '../utils/logger';

export const login = [
    body('email').isEmail().normalizeEmail(),
    body('password').exists(),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const result = await AuthService.login(email, password);
            logger.info(`Admin logged in: ${email}`);
            res.json(result);
        } catch (error: any) {
            logger.warn(`Admin login failed: ${error.message}`);
            res.status(401).json({ message: error.message });
        }
    },
];