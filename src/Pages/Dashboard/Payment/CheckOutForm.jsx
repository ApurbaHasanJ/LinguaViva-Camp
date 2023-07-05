import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

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

    const { error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "Unknown",
          },
        },
      }
    );

    if (confirmError) {
      console.log(confirmError);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: confirmError?.message,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payment Successful",
        text: "Your payment has been processed successfully.",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/dashboard/selected-classes");
      });
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
        padding: "10px 12px",
        border: "1px solid #d4d4d4",
        borderRadius: "4px",
      },
      invalid: {
        color: "#9e2146",
        borderColor: "#9e2146",
      },
    },
  };

  return (
    <div className="my-container mb-10">
      <form className="border p-5 rounded-md" onSubmit={handleSubmit}>
        <CardElement options={cardElementOptions} />
        {cardError && <p className="text-red-500">{cardError}</p>}
        <button
          className="btn mt-6 btn-sm bg-sky-300 hover:bg-sky-400"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      
    </div>
  );
};

export default CheckOutForm;
