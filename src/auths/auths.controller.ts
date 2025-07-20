import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { SignUpUserDto } from './dto/signup-user.dto';

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
}
