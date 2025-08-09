import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { Role } from 'src/role/role.enum';
import { InstrumentCategories } from 'src/utils/categoryTypes.enum';
import { InstrumentBrands } from 'src/utils/brandTypes.enum';

export class GetProductDto {
  @ApiProperty({ required: false, enum: InstrumentCategories })
  @IsOptional()
  // @IsEnum(CategoryTypes)
  @IsString()
  productCategory?: InstrumentCategories;

  @ApiProperty({ required: false, enum: InstrumentBrands })
  @IsOptional()
  // @IsEnum(BrandTypes)
  @IsString()
  productBrand?: InstrumentBrands;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z]+,(asc|desc)$/i, {
    message: 'Invalid sort parameter. Format should be "field,order".',
  })
  sort?: string;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  pageNumber?: number;

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(1000)
  pageSize?: number;
}
