import mongoose, { Document, Schema } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<IProduct>("Product", productSchema);

export { ProductModel, IProduct };
