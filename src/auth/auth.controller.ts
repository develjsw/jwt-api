import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/v1/jwt')
export class AuthController {
    constructor(private authService: AuthService) {}

    /**
     * @desc1 registered-claim : 서비스에서 필요한 정보 X, 토큰에 대한 정보 O, 이미 정해져 있는 클레임
     * @desc2 private-claim : Server ↔ Client 간에 협의하여 설정
     * @desc3 public-claim : 충돌이 방지된 이름 형식, 클레임 이름 URI 형식으로 설정
     * @param payloadDto - registered-claim, private-claim, public-claim 방식에 따라 값이 다르고,
     * 비공개 클레임의 경우에는 형식 자체가 규정되어 있지 않기에 Record 사용
     */
    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() payloadDto: Record<string, any>) {
        return await this.authService.jwtCreate(payloadDto);
    }

    @Get(':token')
    async detail(@Param('token') token: string) {
        const data = await this.authService.jwtDecode(token);
        return {
            data: data
        };
    }
}
