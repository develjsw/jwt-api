import { registerAs } from '@nestjs/config';

export default registerAs('config-info', () => ({
    port: parseInt(process.env.PORT, 10) || 9002
}));
