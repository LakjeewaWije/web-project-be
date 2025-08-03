import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsArray,
} from 'class-validator';
import { InstrumentBrands } from 'src/utils/brandTypes.enum';
import { InstrumentCategories } from 'src/utils/categoryTypes.enum';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  productName: string;

  @IsEnum(InstrumentCategories)
  @IsNotEmpty()
  @ApiProperty()
  productCategory: InstrumentCategories;

  @IsEnum(InstrumentBrands)
  @IsNotEmpty()
  @ApiProperty()
  productBrand?: InstrumentBrands;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  productDescription?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  weight?: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  status?: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsOptional()
  images?: string[];
}
