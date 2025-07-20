import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { SignUpUserDto } from './dto/signup-user.dto';
import * as bcrypt from 'bcrypt';
import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { Role } from 'src/role/role.enum';

@Injectable()
export class AuthsService {
      constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async signUpUser(dto: SignUpUserDto): Promise<User | any> {
    try {
      const findUser = await this.usersRepository.findOne({
        where: { mobilePhone: dto.mobilePhone },
      });

      if (findUser)
        throw new BadRequestException(
          `User with Mobilephone ${dto.mobilePhone} already exists!`,
        );

      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const phoneNumber = parsePhoneNumberWithError(dto.mobilePhone);

      //save user intially
      const signUpUserDtoNew: User = {
        ...dto,
        countryCode: phoneNumber.countryCallingCode,
        password: hashedPassword,
        roles: [Role.Client],
      };

      await this.usersRepository.save(signUpUserDtoNew);

      const res = await this.usersRepository.findOne({
        where: { mobilePhone: dto.mobilePhone },
      });

      return res;
    } catch (error) {
      throw error;
    }
  }
}
