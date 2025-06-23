import { Request, Response } from 'express';
import Cart from './cart.model.js';
import { ICartProduct } from '../../types/index.js';

export const addToCart = async (req: Request, res: Response) => {
    const userId = req.user?._id || req.body.userId; // Adjust as per your auth middleware
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            // Create new cart
            cart = new Cart({
                user: userId,
                products: [{ product: productId, quantity }],
            });
        } else {
            // Check if product already in cart
            const productIndex = cart.products.findIndex((p: ICartProduct) => p.product.toString() === productId);
            if (productIndex > -1) {
                // Update quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // Add new product
                cart.products.push({ product: productId, quantity });
            }
        }
        await cart.save();
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error: error instanceof Error ? error.message : error });
    }
}; 