import { Router, json } from "express";
import Stripe from "stripe";

const donateRouter = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

donateRouter.post("/create-checkout-session", json(), async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount < 1) {
            return res.status(400).json({ success: false, error: "Amount must be at least $1" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: "Donation" },
                        unit_amount: Math.round(amount * 100),
                    },
                    quantity: 1,
                },
            ],
            success_url: `${req.headers.origin}/donate?success=true`,
            cancel_url: `${req.headers.origin}/donate?canceled=true`,
        });

        res.json({ success: true, url: session.url });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default donateRouter;
