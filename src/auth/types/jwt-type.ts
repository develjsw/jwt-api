import { JwtHeader, JwtPayload } from 'jsonwebtoken';

export type TJwt = {
    header: JwtHeader;
    payload: JwtPayload | string;
    signature: string;
};

export type TJwtPayload = JwtPayload;
