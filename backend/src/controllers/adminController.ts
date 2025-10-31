import { Response } from 'express';
import { param, validationResult } from 'express-validator';
import { AdminService } from '../services/adminService';
import { AuthRequest } from '../middlewares/auth';
import { logger } from '../utils/logger';

export const getPendingDevices = async (req: AuthRequest, res: Response) => {
    try {
        const devices = await AdminService.getPendingDevices();
        res.json(devices);
    } catch (error: any) {
        logger.error(`Get pending devices failed: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export const verifyDevice = [
    param('id').isString().notEmpty(),
    async (req: AuthRequest, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;

        try {
            const device = await AdminService.verifyDevice(id);
            logger.info(`Device verified: ${id} for user ${device.user.email}`);
            res.json({ message: 'Device verified successfully', device });
        } catch (error: any) {
            logger.error(`Device verification failed: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    },
];

export const rejectDevice = [
    param('id').isString().notEmpty(),
    async (req: AuthRequest, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;

        try {
            const device = await AdminService.rejectDevice(id);
            logger.info(`Device rejected: ${id} for user ${device.user.email}`);
            res.json({ message: 'Device rejected successfully', device });
        } catch (error: any) {
            logger.error(`Device rejection failed: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    },
];

export const getUsers = async (req: AuthRequest, res: Response) => {
    try {
        const users = await AdminService.getAllUsers();
        res.json(users);
    } catch (error: any) {
        logger.error(`Get users failed: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

export const getStats = async (req: AuthRequest, res: Response) => {
    try {
        const stats = await AdminService.getSystemStats();
        res.json(stats);
    } catch (error: any) {
        logger.error(`Get stats failed: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};