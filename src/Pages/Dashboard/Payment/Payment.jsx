import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";

const Payment = () => {
  // TODO: Provide Publishable key
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)


  return (
    <>
      <Helmet>
        <title>Payment | LVC</title>
      </Helmet>
      <div className="flex justify-center">
        <h2 className="text-center my-5 font-semibold text-2xl bg-sky-200 p-3 px-6 rounded-tr-full rounded-bl-full inline-block">
          Payment Classes
        </h2>
      </div>

      <Elements stripe={stripePromise}>

      <CheckOutForm/>
      </Elements>
    </>
  );
};

export default Payment;
