import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckOutForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure()
  const [cardError, setCardError] = useState("");
  const {user}=useAuth();
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', {price})
    .then(res => {
      setClientSecret(res.data.clientSecret)
    })
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    console.log("card", card);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }
    const {paymentIntent, error:confirmError}= await stripe
  .confirmCardPayment(clientSecret, {
    payment_method: {
      card: card,
      billing_details: {
        name: user?.displayName || 'Anonymous',
        email: user?.email || 'Unknown'
      },
    },
  })
  if(confirmError){
    console.log(confirmError);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: confirmError,
    });
  }
  console.log(paymentIntent);
  };

  return (
    <div className="my-container">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn mt-6 btn-sm bg-sky-300 hover:bg-sky-400"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-500">{cardError}</p>}
    </div>
  );
};

export default CheckOutForm;
