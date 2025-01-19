import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { SignupDto } from './dto/signup.dto';

//TODO: signout
//TODO: refresh token

export type JwtPayload = {
  sub: number;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async getCurrentUser(username: string): Promise<User | null> {
    return this.userService.findOne(username);
  }

  async signup(signupDto: SignupDto): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await this.userService.create(
      signupDto.username,
      signupDto.password,
    );
    return user;
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async createJwtToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
    };

    return this.jwtService.signAsync(payload);
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
