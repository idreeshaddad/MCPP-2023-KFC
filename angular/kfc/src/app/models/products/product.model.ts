import { UploaderImage } from "src/app/directives/image-uploader/UploaderImage.data";

export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  categoryName: string;
  images: UploaderImage[];
}
