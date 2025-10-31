import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/hashing';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class AuthService {
    static async login(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.role !== 'ADMIN') {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        );

        return { token, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } };
    }
}