import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./formStyles.css";

const CheckOutForm = ({ cls, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  // const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  console.log(cls);
  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

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

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "Unknown",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: confirmError?.message,
      });
      return;
    }
    // else {
    //   Swal.fire({
    //     position: "top-end",
    //     icon: "success",
    //     title: "Payment Successful",
    //     text: "Your payment has been processed successfully.",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   }).then(() => {
    //     navigate("/dashboard/selected-classes");
    //   });
    // }

    console.log("payment intent", paymentIntent);
    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      // setTransactionId(paymentIntent.id);
      // save payment information to the server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price: parseFloat(price),
        date: new Date(),
        selectedCls: cls?._id,
        clsId: cls?.clsId,
        status: "service pending",
        clsNames: cls?.title,
      };
      axiosSecure.post("/payment", payment).then((res) => {
        console.log(res.data);
        if (res.data.insertedResult.insertedId) {
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
          disabled={!stripe || !clientSecret || processing || cardError}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;
