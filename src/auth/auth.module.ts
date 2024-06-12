import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import localConfig from '../config/local/local.config';
import developmentConfig from '../config/production/production.config';
import productionConfig from '../config/development/development.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

let config;
switch (process.env.NODE_ENV) {
    case 'production':
        config = productionConfig;
        break;
    case 'development':
        config = developmentConfig;
        break;
    default:
        config = localConfig;
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
