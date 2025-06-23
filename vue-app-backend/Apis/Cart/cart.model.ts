import mongoose, { Schema, Document, Types } from 'mongoose';
import { ICart, ICartProduct } from '../../types/index.js';

export interface ICartProductDocument extends ICartProduct, Document {}
export interface ICartDocument extends ICart, Document {}

const CartProductSchema = new Schema({
    product: { type: Types.ObjectId, ref: 'Products', required: true },
    quantity: { type: Number, required: true, default: 1 },
});

const CartSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'users', required: true, unique: true },
    products: [CartProductSchema],
}, { timestamps: true });

export default mongoose.model<ICartDocument>('Cart', CartSchema); 