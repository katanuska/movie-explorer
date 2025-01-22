import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { SignupDto } from './dto/signup.dto';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import { Request, Response } from 'express';

//TODO: implement refresh token
export type JwtPayload = {
  sub: number;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  private async validateUser(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findOne(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  private async createJwtToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
    };

    return this.jwtService.signAsync(payload);
  }

  private extractToken(request: Request): string | undefined {
    return request.cookies?.[this.jwtConfiguration.cookieName];
  }

  setJwtCookie(response: Response, jwtToken: string): void {
    response.cookie(
      this.jwtConfiguration.cookieName,
      jwtToken,
      this.jwtConfiguration.cookieOptions,
    );
  }

  validateJwtToken(request: Request): Promise<JwtPayload> {
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      return this.jwtService.verifyAsync(token, {
        secret: this.jwtConfiguration.secret,
      });
    } catch {
      throw new UnauthorizedException();
    }
  }

  async getCurrentUser(username: string): Promise<User | null> {
    return this.userService.findOne(username);
  }

  async signup(
    signupDto: SignupDto,
  ): Promise<{ jwtToken: string; user: User }> {
    const user = await this.userService.create(
      signupDto.username,
      signupDto.password,
    );
    const jwtToken = await this.createJwtToken(user);
    return { jwtToken, user };
  }

  async signin(loginDTO: SignInDto): Promise<{ jwtToken: string; user: User }> {
    const { username, password } = loginDTO;
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const jwtToken = await this.createJwtToken(user);

    return { jwtToken, user };
  }
}
