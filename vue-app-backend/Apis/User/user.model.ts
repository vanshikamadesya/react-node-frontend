import mongoose, { Schema, Document } from 'mongoose';
import { IUser, UserType } from '../../types/index.js';

export interface IUserDocument extends Omit<IUser, '_id'>, Document { }

const UserSchema = new Schema({
  type: {
    type: String,
    enum: Object.values(UserType),
    default: UserType.BUYER,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Products',
  }],
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

export default mongoose.model<IUserDocument>('users', UserSchema);
