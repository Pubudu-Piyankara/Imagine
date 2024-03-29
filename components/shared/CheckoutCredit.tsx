"use client";
import  { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { checkoutCredits } from "@/lib/actions/transaction.actions";
import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";

type Props = {
    plan: string;
    amount: number;
    credits: number;
    buyerId: string;
  };

const CheckoutCredit = ({
  plan,
  amount,
  credits,
  buyerId,
}: Props) => {
  const { toast } = useToast();

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Order placed!",
        description: "You will receive an email confirmation",
        duration: 5000,
        className: "success-toast",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Order canceled!",
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, []);

  const onCheckout = async () => {
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };

    await checkoutCredits(transaction);
  };

  return (
    <form action={onCheckout} method="POST">
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-blue-600 bg-cover hover:bg-blue-900"
        >
          Buy Credit
        </Button>
      </section>
    </form>
  );
};

export default CheckoutCredit;


