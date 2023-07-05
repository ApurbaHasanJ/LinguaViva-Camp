import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import useBooked from "../../../Hooks/useBooked";

// TODO: Provide Publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const { id } = useParams();
  const [bookedClasses] = useBooked();
  const selectedClass = bookedClasses.find((cls) => cls._id === id);
  console.log(selectedClass?.price);

  return (
    <>
      <Helmet>
        <title>Payment | LVC</title>
      </Helmet>
      <div className="flex justify-center">
        <h2 className="text-center my-5 font-semibold text-2xl bg-sky-200 p-3 px-6 rounded-tr-full rounded-bl-full inline-block">
          Payment
        </h2>
      </div>
      <Elements stripe={stripePromise}>
        <CheckOutForm price={selectedClass?.price} />
      </Elements>
    </>
  );
};

export default Payment;
