import { registerAs } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

const JWT_SECRET = path.resolve('./secret/production/jwt-secret');

export default registerAs('config-info', () => ({
    port: parseInt(process.env.PORT, 10) || 9002,

    jwt: {
        secret: fs.readFileSync(JWT_SECRET).toString()
    }
}));
