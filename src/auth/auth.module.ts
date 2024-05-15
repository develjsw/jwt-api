import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import configLocal from '../config/local/config.local';
import configProduction from '../config/production/config.production';
import configDevelopment from '../config/development/config.development';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { jwtConstants } from './jwtConstants';

let config;
switch (process.env.NODE_ENV) {
    case 'production':
        config = configProduction;
        break;
    case 'development':
        config = configDevelopment;
        break;
    default:
        config = configLocal;
        break;
}

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [config]
        }),
        /*
            secret, signOptions 값을 JwtModule에서 설정하는 방식과
            JwtService에서 함수를 호출할때 매개변수로 보내는 방식 중 전자를 택함
        */
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const configInfo = configService.get('config-info');
                return { secret: configInfo.jwt.secret };
            },
            inject: [ConfigService],
            global: true
            //secret: jwtConstants.secret,
            //signOptions: { expiresIn: '60s' }
        })
    ],
    exports: [],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
