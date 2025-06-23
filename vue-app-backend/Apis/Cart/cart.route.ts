import express, { Router, RequestHandler } from 'express';
import auth from '../../Middlewares/auth.js';
import { addToCart } from './cart.controller.js';

const router: Router = express.Router();

router.post('/add', auth as RequestHandler, addToCart as RequestHandler);

export default router; 