export interface LoginRequestDto {
    username: string;
    password: string;
}

export interface LoginResponseDto {
    success: boolean;
    message: string;
    user?: {
        id: string;
        username: string;
        role: string;
    };
    token?: string;
}

export interface VerifySessionResponseDto {
    authenticated: boolean;
    user?: {
        id: string;
        username: string;
        role: string;
    };
}
