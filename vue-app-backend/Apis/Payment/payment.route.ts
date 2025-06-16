import express, { Router, RequestHandler } from 'express';
import auth from '../../Middlewares/auth.js';
import roleAccess from '../../Middlewares/roleAccess.js';
import { UserType } from '../../types/index.js';
import { createPaymentIntent, handleWebhook } from './payment.controller.js';

const router: Router = express.Router();

router.post(
    "/create-payment-intent",
    auth as RequestHandler,
    roleAccess([UserType.BUYER]) as RequestHandler,
    createPaymentIntent as RequestHandler
);

// Cast handleWebhook to RequestHandler to fix type mismatch
router.post(
    "/webhook",
    express.raw({ type: 'application/json' }),
    handleWebhook as RequestHandler
);

export default router; 