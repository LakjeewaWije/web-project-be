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

@Controller('auths')
export class AuthsController {
  constructor(private readonly authService: AuthsService) {}

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
    let res = await this.authService.logInUser(logInUser);
    return res;
  }
}
