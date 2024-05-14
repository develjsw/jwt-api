import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from './dto/payload.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async jwtCreate(payloadDto: PayloadDto): Promise<string> {
        return await this.jwtService.signAsync(payloadDto, { secret: 'tmp-secret', expiresIn: '2d' });
    }
}
