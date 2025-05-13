import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.carts)
  product: Product;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;
}
