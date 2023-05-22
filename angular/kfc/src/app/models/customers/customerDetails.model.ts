import { OrderList } from "../orders/orderList.model";

export interface CustomerDetails {
  id: number;
  fullName: string;
  phoneNumber: string;
  age: number;
  orders: OrderList[];
}
