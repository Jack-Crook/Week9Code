// Describes what a product looks like, so TypeScript can check we use it correctly.
// A ? means the field is optional.
export interface Product {
  _id?: string;         // Mongo's automatic id (not set until the product is saved)
  Id: number;           // our own numeric id
  Name: string;         // up to 50 characters
  Description: string;  // up to 255 characters
  Price: number;        // price to 2 decimal places
  units: number;        // how many are in stock
  type?: string;
}
