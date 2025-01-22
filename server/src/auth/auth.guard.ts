import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService, JwtPayload } from './auth.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isPublicRoute(context)) return true;

    const request = context.switchToHttp().getRequest();
    const payload: JwtPayload =
      await this.authService.validateJwtToken(request);
    request.user = payload;

    return true;
  }

  private isPublicRoute = (context: ExecutionContext) => {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  };
}
