import Order from "@/components/Order";
import moment from "moment";
import { getSession, useSession } from "next-auth/react";
import db from "../../firebase";
import Head from "next/head";
function Orders({ orders }) {
  const data = useSession();

  return (
    <div>
      <Head>
        <title> orders</title>
      </Head>
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {data ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please Sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map((order) => {
            return <Order key={order.id} {...order} />;
          })}
        </div>
      </main>
    </div>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const stripeOrders = await db
    .collection("users")
    .doc((await session).user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return {
    props: {
      orders,
    },
  };
}
