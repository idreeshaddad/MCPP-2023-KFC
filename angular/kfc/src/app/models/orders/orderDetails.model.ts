import { Product } from "../products/product.model";

export interface OrderDetails {
  id: number;
  totalPrice: number;
  note: string;
  orderDate: string;
  customerFullName: string;
  products: Product[];
}
