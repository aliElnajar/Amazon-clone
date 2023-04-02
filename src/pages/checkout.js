import CheckoutItem from "@/components/CheckoutItem";
import Image from "next/image";
import { useSelector } from "react-redux";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Head from "next/head";
const Checkout = () => {
  const wholeState = useSelector((state) => state);
  const { cartItems, totalAmount, itemsQuantity } = wholeState;
  const { data } = useSession();

  const stripePromise = loadStripe(process.env.stripe_public_key);

  const clickCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: cartItems,
      email: data.user.email,
    });

    const result = stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };
  return (
    <div className="bg-gray-100">
      <Head>
        <title> checkout</title>
      </Head>
      <main className="lg:flex max-w-screen-xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            alt="bannerimg"
            width={1020}
            height={250}
            className="object-contain h-52 w-1020px"
          />
          <div className="flex flex-col p-5 s-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {cartItems.length ? "Shopping basket" : "no itmes in the basket"}
            </h1>
            {cartItems.map((item) => (
              <CheckoutItem key={item.id} {...item} />
            ))}
          </div>
        </div>
        {cartItems.length ? (
          <div className="flex flex-col bg-white p-10 shadow-md">
            <h2 className="whitespace-nowrap">Subtotal ({itemsQuantity})</h2>

            <span>
              <Currency quantity={totalAmount} currency='gbp' />
            </span>
            <button
              onClick={clickCheckoutSession}
              disabled={!data}
              className={`button mt-2 ${
                !data
                  ? "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                  : ""
              }`}
            >
              {data ? `proceed to checkout` : `sign in to checkout`}
            </button>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default Checkout;
