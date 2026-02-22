import { Request, Response } from 'express';
import { AuthService } from '../../../../application/auth/services/auth.service';
import { LoginRequestDto } from '../../../../application/auth/dto/auth.dto';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const loginDto: LoginRequestDto = req.body;

            // Validate input
            if (!loginDto.username || !loginDto.password) {
                res.status(400).json({
                    success: false,
                    message: 'Username and password are required'
                });
                return;
            }

            const result = await this.authService.login(loginDto);

            if (!result.success) {
                res.status(401).json(result);
                return;
            }

            // Set HTTP-only cookie for security
            res.cookie('admin_token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(200).json({
                success: true,
                message: result.message,
                user: result.user
            });
        } catch (error) {
            console.error('Login controller error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    logout = async (req: Request, res: Response): Promise<void> => {
        try {
            res.clearCookie('admin_token');
            res.status(200).json({
                success: true,
                message: 'Logout successful'
            });
        } catch (error) {
            console.error('Logout controller error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    verifySession = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.cookies.admin_token;

            if (!token) {
                res.status(401).json({
                    authenticated: false,
                    message: 'No token provided'
                });
                return;
            }

            const verification = this.authService.verifyToken(token);

            if (!verification.valid) {
                res.clearCookie('admin_token');
                res.status(401).json({
                    authenticated: false,
                    message: 'Invalid or expired token'
                });
                return;
            }

            res.status(200).json({
                authenticated: true,
                user: {
                    id: verification.user.id,
                    username: verification.user.username,
                    role: verification.user.role
                }
            });
        } catch (error) {
            console.error('Verify session controller error:', error);
            res.status(500).json({
                authenticated: false,
                message: 'Internal server error'
            });
        }
    };
}
