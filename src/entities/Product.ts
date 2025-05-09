import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];
}
