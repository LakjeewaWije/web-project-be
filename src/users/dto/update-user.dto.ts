import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsLatLong,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { UUID } from 'crypto';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  emailAddress: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  eircode: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  oldPassword: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  password: string;
}
