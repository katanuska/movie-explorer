import { registerAs } from '@nestjs/config';
import { CookieOptions } from 'express';

const DEFAULT_EXPIRATION = 3600000; // 1 hour in milliseconds
const COOKIE_NAME = 'jwt';

export default registerAs('jwt', () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const expiration = parseInt(
    process.env.JWT_EXPIRATION || DEFAULT_EXPIRATION.toString(),
    10,
  );
  if (isNaN(expiration)) {
    throw new Error('JWT_EXPIRATION must be a valid number (in milliseconds)');
  }

  return {
    secret: process.env.JWT_SECRET,
    expiration: expiration,
    cookieName: COOKIE_NAME,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: expiration,
    } as CookieOptions,
  };
});
