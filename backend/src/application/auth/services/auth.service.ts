import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginRequestDto, LoginResponseDto } from '../dto/auth.dto';

// Hardcoded admin credentials (in production, use database)
const ADMIN_CREDENTIALS = {
    id: 'admin-001',
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD_HASH || '$2b$10$rKZvVqVqVqVqVqVqVqVqVuO7K7K7K7K7K7K7K7K7K7K7K7K7K7K7K', // default: "admin123"
    role: 'admin'
};

const JWT_SECRET = process.env.JWT_SECRET || 'gocycle-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export class AuthService {
    async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
        try {
            // Check username
            if (loginDto.username !== ADMIN_CREDENTIALS.username) {
                return {
                    success: false,
                    message: 'Invalid username or password'
                };
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(
                loginDto.password,
                ADMIN_CREDENTIALS.password
            );

            if (!isPasswordValid) {
                return {
                    success: false,
                    message: 'Invalid username or password'
                };
            }

            // Generate JWT token
            const token = jwt.sign(
                {
                    id: ADMIN_CREDENTIALS.id,
                    username: ADMIN_CREDENTIALS.username,
                    role: ADMIN_CREDENTIALS.role
                },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            return {
                success: true,
                message: 'Login successful',
                user: {
                    id: ADMIN_CREDENTIALS.id,
                    username: ADMIN_CREDENTIALS.username,
                    role: ADMIN_CREDENTIALS.role
                },
                token
            };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: 'An error occurred during login'
            };
        }
    }

    verifyToken(token: string): { valid: boolean; user?: any } {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return {
                valid: true,
                user: decoded
            };
        } catch (error) {
            return {
                valid: false
            };
        }
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}
