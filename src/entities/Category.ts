import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Product } from "./Product";
import { ArrayNotEmpty, IsNotEmpty } from "class-validator";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: "name cannot be empty" })
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
