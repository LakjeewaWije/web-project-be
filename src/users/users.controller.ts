import { Body, Controller, Put, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Update User',
    description: 'Update the user details after logs in',
  })
  @Put('/update')
  async updateUser(@Body() dto: UpdateUserDto, @Req() req: Request) {
    const userId = req['user'].userId;
    const res = await this.usersService.updateUser(dto, userId);
    return { user: res };
  }
}
