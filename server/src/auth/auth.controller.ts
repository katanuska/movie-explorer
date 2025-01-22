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
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';

// TODO: add refresh token
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  @Get('user')
  async currentUser(@CurrentUser() currentUser: JwtPayload): Promise<UserDto> {
    if (!currentUser) throw new UnauthorizedException();

    const user = await this.authService.getCurrentUser(currentUser.username);

    if (!user) throw new UnauthorizedException();

    return plainToInstance(UserDto, user);
  }

  @Post('signup')
  @Public()
  async signup(
    @Res({ passthrough: true }) response: Response,
    @Body() signupDto: SignupDto,
  ): Promise<UserDto> {
    const { user, jwtToken } = await this.authService.signup(signupDto);

    this.setJwtCookie(response, jwtToken);

    return plainToInstance(UserDto, user);
  }

  @Post('signin')
  @Public()
  @HttpCode(200)
  async signin(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Partial<User> | null> {
    const { user, jwtToken } = await this.authService.signin(signInDto);

    this.setJwtCookie(response, jwtToken);

    return plainToInstance(UserDto, user);
  }

  @Post('signout')
  @HttpCode(204)
  async signout(@Res({ passthrough: true }) response: Response): Promise<void> {
    const { maxAge, ...options } = this.jwtConfiguration.cookieOptions;
    response.clearCookie(this.jwtConfiguration.cookieName, options);
  }

  private setJwtCookie(response: Response, jwtToken: string): void {
    response.cookie(
      this.jwtConfiguration.cookieName,
      jwtToken,
      this.jwtConfiguration.cookieOptions,
    );
  }
}
