import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configLocal from './config/local/config.local';
import configDevelopment from './config/development/config.development';
import configProduction from './config/production/config.production';

let config;
switch (process.env.NODE_ENV) {
    case 'development':
        config = configDevelopment;
        break;
    case 'production':
        config = configProduction;
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
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
