import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TJwt, TJwtPayload } from './types/jwt-type';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async jwtCreate(payloadDto: Record<string, any>): Promise<{ token: string }> {
        return {
            // TODO : 만료시간 설정도 API 매개변수로 받아 처리할지 고민 필요
            token: await this.jwtService.signAsync(payloadDto, { expiresIn: 60 * 60 * 24 }) // expiresIn(s)
        };
    }

    async jwtDecode(token: string): Promise<TJwt> {
        try {
            await this.jwtVerify(token);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
        // TODO : 보안상 이유로 signature를 제외한 header, payload 정보만 반환되도록 변경 예정
        return await this.jwtService.decode(token, { complete: true }); // complete: true - payload 외에 header, signature 정보를 포함하여 반환
    }

    async jwtVerify(token: string): Promise<TJwtPayload> {
        return await this.jwtService.verifyAsync(token);
    }
}
