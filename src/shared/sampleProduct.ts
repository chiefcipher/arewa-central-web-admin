import { I_Product } from "../typescript/interfaces";
import { SampleProductImage } from "./assets";

export const SAMPLE_PRODUCT: I_Product = {
  ratingsAverage: 4,
  ratingsNumber: 3000,
  colors: ["red", "blue", "orange", "green"],
  sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
  imgUrl: SampleProductImage,
  name: "Samsung Galaxy S20",
  category: "phones",
  slug: "samsung-galaxy-s20",
  price: 400000,
  discountedPrice: 390000,
  shortDescription: "a nice phone",
  brand: "Samsung",
  model: "Galaxy",
  description: "A nice phone",
  quantityLeft: 40,
  quantityInCart: 20,
  createdAt: Date.now(),
};
