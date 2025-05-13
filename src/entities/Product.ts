import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Category } from "./Category";
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsString,
  MinLength,
} from "class-validator";
import { Cart } from "./Cart";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString({ message: "Product name must be a string" })
  @MinLength(5, {
    message: "Product name characters should be greater that 5",
  })
  name: string;

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];
}
