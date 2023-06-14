import { UploaderImage } from "src/app/directives/image-uploader/UploaderImage.data";
import { OrderList } from "../orders/orderList.model";

export interface CustomerDetails {
  id: number;
  fullName: string;
  phoneNumber: string;
  age: number;
  orders: OrderList[];
  images: UploaderImage[];
}
