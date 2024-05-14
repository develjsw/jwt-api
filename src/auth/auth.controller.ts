import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PayloadDto } from './dto/payload.dto';
import { AuthService } from './auth.service';

@Controller('api/v1/jwt')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() payloadDto: PayloadDto) {
        return await this.authService.jwtCreate(payloadDto);
    }

    @Get(':tokenId')
    async detail() {}
}
