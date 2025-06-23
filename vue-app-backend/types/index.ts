import mongoose from "mongoose";

export enum UserType {
    SUPERADMIN = "SUPERADMIN",
    SELLER = "SELLER",
    BUYER = "BUYER"
}

export interface IUser {
    _id: string;
    type: UserType;
    email: string;
    password: string;
    products: string[];
    resetToken?: string;
    resetTokenExpiration?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}

export interface ISession {
    token: string;
    userId: string;
    expires: Date;
}

export interface IProduct {
    name: string;
    price: string;
    description: string;
    seller?: mongoose.Schema.Types.ObjectId;
    productImage: string;
}

export interface User {
    type: UserType;
    [key: string]: any;
}

export interface ICartProduct {
    product: string; // Product ID
    quantity: number;
}

export interface ICart {
    user: string; // User ID
    products: ICartProduct[];
    createdAt?: Date;
    updatedAt?: Date;
}