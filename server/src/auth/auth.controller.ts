/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  HttpCode,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService, JwtPayload } from './auth.service';
import { SignInDto } from './dto/login.dto';
import { Response } from 'express';
import { SignupDto } from './dto/signup.dto';
import { User } from 'src/user/entities/user.entity';
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  @Get('user')
  async currentUser(
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<Partial<User>> {
    if (!currentUser) throw new UnauthorizedException();

    const user = await this.authService.getCurrentUser(currentUser.username);

    if (!user) throw new UnauthorizedException();

    const { password, ...result } = user;

    return result;
  }

  @Post('signup')
  @Public()
  async create(@Body() signupDto: SignupDto): Promise<Partial<User>> {
    const user = await this.authService.signup(signupDto);

    const { password, ...result } = user;

    return result;
  }

  @Post('signin')
  @Public()
  @HttpCode(200)
  async signin(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Partial<User> | null> {
    const { user, jwtToken } = await this.authService.signin(signInDto);

    response.cookie(
      this.jwtConfiguration.cookieName,
      jwtToken,
      this.jwtConfiguration.cookieOptions,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }
}
