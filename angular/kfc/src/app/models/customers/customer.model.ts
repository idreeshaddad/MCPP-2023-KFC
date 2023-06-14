import { UploaderImage } from "src/app/directives/image-uploader/UploaderImage.data";

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  images: UploaderImage[];
}
