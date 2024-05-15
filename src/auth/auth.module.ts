import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import configLocal from '../config/local/config.local';
import configProduction from '../config/production/config.production';
import configDevelopment from '../config/development/config.development';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const configInfo = configService.get('config-info');
                return { secret: configInfo.jwt.secret };
            },
            inject: [ConfigService],
            global: true
        })
    ],
    exports: [],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
