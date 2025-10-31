import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AdminService {
    static async getPendingDevices() {
        const devices = await prisma.device.findMany({
            where: {
                status: 'PENDING',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        createdAt: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return devices.map(device => ({
            id: device.id,
            deviceId: device.deviceId,
            status: device.status,
            createdAt: device.createdAt,
            user: device.user,
        }));
    }

    static async verifyDevice(deviceId: string) {
        const device = await prisma.device.update({
            where: { id: deviceId },
            data: { status: 'VERIFIED' },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                    },
                },
            },
        });

        return device;
    }

    static async rejectDevice(deviceId: string) {
        const device = await prisma.device.update({
            where: { id: deviceId },
            data: { status: 'REJECTED' },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                    },
                },
            },
        });

        return device;
    }

    static async getAllUsers() {
        const users = await prisma.user.findMany({
            where: {
                role: 'CLIENT',
            },
            include: {
                account: {
                    select: {
                        balance: true,
                    },
                },
                devices: {
                    select: {
                        status: true,
                    },
                },
                _count: {
                    select: {
                        devices: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return users.map(user => ({
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            createdAt: user.createdAt,
            balance: user.account?.balance.toNumber() || 0,
            verifiedDevices: user.devices.filter(d => d.status === 'VERIFIED').length,
            totalDevices: user._count.devices,
        }));
    }

    static async getSystemStats() {
        const [totalUsers, totalDevices, pendingDevices, totalTransactions] = await Promise.all([
            prisma.user.count({ where: { role: 'CLIENT' } }),
            prisma.device.count(),
            prisma.device.count({ where: { status: 'PENDING' } }),
            prisma.transaction.count(),
        ]);

        const totalBalanceResult = await prisma.account.aggregate({
            _sum: {
                balance: true,
            },
        });

        return {
            totalUsers,
            totalDevices,
            pendingDevices,
            totalTransactions,
            totalBalance: totalBalanceResult._sum.balance?.toNumber() || 0,
        };
    }
}