import { buffer } from "micro";
import * as admin from "firebase-admin";
const serviceAccount = require("../../../permissions.json");

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const fullfillOrder = async (session) => {
  console.log("csl4");

  console.log(session, "data of session");
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
        amount: session.amount_total / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() =>
      console.log(`order with ref ${session.id} have been pushed in the DB`)
    )
    .catch((err) => console.log(err));
};

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export default async (req, res) => {
  if (req.method === "POST") {
    console.log("csl1");
    const reqBuffer = await buffer(req);
    const payload = reqBuffer.toString();
    const signature = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      );
      console.log("csl2");
    } catch (err) {
      console.log("ERROR", err.message);
      return res.status(400).send(`webhook error: ${err.message}`);
    }
    if (event.type === "checkout.session.completed") {
      console.log("csl3");

      const session = event.data.object;
      return fullfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => {
          console.log(err);
          res.status(400).send(`webhook error:${err}`);
        });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
