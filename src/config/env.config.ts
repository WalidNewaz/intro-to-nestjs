import { registerAs } from '@nestjs/config';

export default registerAs('env', () => ({
  environment: process.env.NODE_ENV || 'localhost',
  port: process.env.PORT || 3000,
}));
