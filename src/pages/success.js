import { CheckIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Link from "next/link";
const Success = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>success</title>
      </Head>
      <main>
        <div className="max-w-screen-lg mx-auto bg-white p-3 ">
          <div className="flex space-x-2 items-start ">
            <CheckIcon className="h-12 text-green-700" />
            <h2 className="font-semibold text-3xl mb-5">
              Your order has been confirmed!
            </h2>
          </div>
          <p>
            order will be delivered within 2-4 business days , for any
            inquieries or suggestions call (01010)
            <br /> to check orders status press the link below{" "}
          </p>
          <Link href="orders">
            <button className="button px-8 py-5 font-semibold mt-8">
              Go to my orders
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Success;
