import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { Public } from 'src/utils/publicRequest.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authService: AuthsService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  async signUpUser(@Body() signUpUserDto: SignUpUserDto, @Req() req: Request) {
    var res = await this.authService.signUpUser(signUpUserDto);

    if (!res) {
      throw new BadRequestException(`SignUp failed!, Please try again`);
    }

    return { user: res };
  }

  @Public()
  @Post('/login')
  async logInTrainer(@Body() logInUser: LoginUserDto, @Req() req: Request) {
    let user = await this.authService.logInUser(logInUser);

    let tokenPayload: any = {
      userId: user.userId,
      roles: user.roles,
      firstName: user.firstName,
      mobilePhone: user.mobilePhone,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: '7d',
    });

    const res = {
      user,
      accessToken,
    };

    return res;
  }
}
