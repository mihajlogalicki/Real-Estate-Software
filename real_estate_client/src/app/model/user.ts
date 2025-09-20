export interface User {
    userName: string;
    email: string;
    password: string;
    mobile: string;
}

export interface UserLoginDto {
    username: string;
    password: string;
    token: string;
}