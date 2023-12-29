import { E_Order_Remark, E_Order_Status } from "./enums";

export interface I_Product {
  // id and slug are automatic
  id: string;
  slug: string;

  // ratings average and ratings number comes from user portal review api
  ratingsAverage: number;
  ratingsNumber: number;

  // fields for admin to create product
  images: string[]; //with at least 3 images and at most 5

  name: string;
  category: string;
  price: number;

  quantityLeft: number;
  shortDescription: string;
  description: string;

  discountedPrice?: number;
  brand?: string;
  model?: string;

  colors?: Array<string>;
  sizes?: Array<string>;
  // end of admin fields to create product

  // the below applies to user profile

  isAddedToCart?: boolean;
  quantityInCart: number;
  selectedColor?: string;
  selectedSize?: string;
  createdAt: number;
}

export interface I_FormMessage {
  type: "success" | "error" | "";
  content: string;
}

export interface I_Review {
  reviewerName: string;
  reviewTitle: string;
  rating: number;
  reviewContent: string;
  date: number;
}

export interface I_Order {
  date: number;
  orderId: string; //generated to be something like #2023-12-29-xyz-anbbdbdb
  amount: number;
  quantity: number;
  orderItems?: Array<I_Product>;
  userEmail?: string; //comes from api when creating the order
  id: string; //comes from api
  // only status and remark can be updated from edit api
  status: E_Order_Status;
  remark: E_Order_Remark;
}

export interface I_Profile {
  imgUrl: string;
  firstName: string;
  lastName: string;
  residentState: string;
  address: string;
  phoneNumber: string;
  email: string;
  isVerified: boolean;
  bankDetails: I_BankDetails;
}

export interface I_BankDetails {
  bankName: string;
  accountNumber: string;
}

export interface I_Notification {
  id?: string; //id is automatically generated in api
  sender?: string; //sender is automatically generated in api
  date?: number; //date is automatically generated in api

  recipientEmail: string;
  title: string;
  content: string;
  priority: "low" | "medium" | "high";
}

export interface I_Category {
  id: string;
  name: string;
  createdAt: number;
  description: string;
  productSize: number;
}
