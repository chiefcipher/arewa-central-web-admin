import { I_Product } from "../typescript/interfaces";
import { SampleProductImage } from "./assets";

export const SAMPLE_PRODUCT: I_Product = {
  id: "random-id",
  ratingsAverage: 4,
  ratingsNumber: 3000,
  colors: ["red", "blue", "orange", "green"],
  sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
  images: [SampleProductImage, SampleProductImage, SampleProductImage],
  name: "Samsung Galaxy S20",
  category: "phones",
  slug: "samsung-galaxy-s20",
  price: 400000,
  discountedPrice: 390000,
  shortDescription: "a nice phone",
  brand: "Samsung",
  // selectedColor: "red",
  selectedSize: "XL",
  model: "Galaxy",
  description: "A nice phone\n\n a nice phone\n\nbought by apple",
  quantityLeft: 40,
  quantityInCart: 20,
  createdAt: Date.now(),
};
