import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { SignUpUserDto } from './dto/signup-user.dto';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authService: AuthsService) {}

  @Post('/signup')
  async signUpUser(@Body() signUpUserDto: SignUpUserDto, @Req() req: Request) {
    return { user: 'signed up' };
  }
}
