import { Router } from 'express';
import {
    getPendingDevices,
    verifyDevice,
    rejectDevice,
    getUsers,
    getStats
} from '../controllers/adminController';
import { authenticateToken, isAdmin } from '../middlewares/auth';

const router = Router();

// Apply authentication and admin check to all admin routes
router.use(authenticateToken);
router.use(isAdmin);

/**
 * @swagger
 * /admin/devices/pending:
 *   get:
 *     summary: Get all pending device verifications
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending devices
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.get('/devices/pending', getPendingDevices);

/**
 * @swagger
 * /admin/devices/{id}/verify:
 *   post:
 *     summary: Verify a device
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Device verified successfully
 *       400:
 *         description: Invalid device ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.post('/devices/:id/verify', verifyDevice);

/**
 * @swagger
 * /admin/devices/{id}/reject:
 *   post:
 *     summary: Reject a device
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Device rejected successfully
 *       400:
 *         description: Invalid device ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.post('/devices/:id/reject', rejectDevice);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.get('/users', getUsers);

/**
 * @swagger
 * /admin/stats:
 *   get:
 *     summary: Get system statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System statistics
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.get('/stats', getStats);

export default router;