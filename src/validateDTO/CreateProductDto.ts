import {
  IsArray,
  ArrayNotEmpty,
  IsInt,
  IsString,
  MinLength,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateProductDto {
  @IsString()
  @MinLength(5, { message: "Product name must be at least 5 characters long" })
  name: string;

  @IsArray({ message: "Category field must be array" })
  @ArrayNotEmpty({ message: "Array cant be empty" })
  @IsInt({ each: true, message: "Each id must be integer" })
  @Type(() => Number)
  categoryIds: number[];
}
