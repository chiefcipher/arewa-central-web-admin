import { E_Order_Remark, E_Order_Status } from "./enums";

export interface I_Product {
  ratingsAverage: number;
  ratingsNumber: number;
  colors?: Array<string>;
  sizes?: Array<string>;
  imgUrl: string;
  name: string;
  category: string;
  slug: string;
  price: number;
  discountedPrice?: number;
  shortDescription: string;
  brand?: string;
  model?: string;
  description: string;
  quantityLeft: number;
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
  date: string;
  orderId: string;
  status: E_Order_Status;
  amount: number;
  quantity: number;
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
  sender: string;
  title: string;
  content: string;
  priority: "low" | "medium" | "high";
  date: number;
}

export interface I_Category {
  id: string;
  name: string;
  createdAt: number;
  description: string;
  productSize: number;
}
