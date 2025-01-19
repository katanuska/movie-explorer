import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from 'src/config/jwt.config';
import { JwtPayload } from './auth.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('User verification start...');

    if (this.isPublicRoute(context)) return true;

    const request = context.switchToHttp().getRequest();
    const payload: JwtPayload = await this.validateJwtToken(request);
    request.user = payload;

    return true;
  }

  private isPublicRoute = (context: ExecutionContext) => {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      console.log('Public route');
      return true;
    }
    return false;
  };

  private async validateJwtToken(request: Request): Promise<JwtPayload> {
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      console.log('Verify token ', token);
      return await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfiguration.secret,
      });
    } catch {
      console.log('User verification error');
      throw new UnauthorizedException();
    }
  }

  private extractToken(request: Request): string | undefined {
    return request.cookies?.[this.jwtConfiguration.cookieName];
  }
}
