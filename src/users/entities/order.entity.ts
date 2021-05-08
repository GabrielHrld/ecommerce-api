import { Product } from "src/products/entities/products.entity";
import { User } from "./users.entity";

export class Order {
  date: Date;
  user: User;
  products: Product[];
}