import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  description: string;
  longDescription?: string;
  instagram?: string;
  instagramlink?: string;
  specifications?: Record<string, string>;
  features?: string[];
  brand?: string;
  brandImage?: string;
  sku?: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, required: true },
  image: { type: String },
  images: [{ type: String }],
  rating: { type: Number, required: true, default: 0 },
  reviews: { type: Number, required: true, default: 0 },
  inStock: { type: Boolean, required: true, default: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  instagram: { type: String },
  instagramlink: { type: String },
  specifications: { type: Map, of: String },
  features: [{ type: String }],
  brand: { type: String },
  brandImage: { type: String },
  sku: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);