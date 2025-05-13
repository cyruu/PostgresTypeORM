import {
  IsArray,
  ArrayNotEmpty,
  IsInt,
  IsString,
  MinLength,
} from "class-validator";
import { Type } from "class-transformer";

export class addToCartDto {
  @IsInt({ each: true, message: "id must be integer" })
  @Type(() => Number)
  productId: number;
}
