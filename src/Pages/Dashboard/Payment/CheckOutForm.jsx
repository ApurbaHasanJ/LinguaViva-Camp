
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckOutForm = () => {
const stripe = useStripe()
const elements = useElements()
const [cardError, setCardError] = useState("")

const handleSubmit = async (event) => {
event.preventDefault()

if(!stripe || !elements){
return
}

const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    console.log("card",card);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })
    if (error) {
      console.log('[error]', error);
      setCardError(error.message)
    } else {
      setCardError('')
      console.log('[PaymentMethod]', paymentMethod);
    }
}

  return (
    <div className='my-container'>
    <form  onSubmit={handleSubmit}>
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
      <button className='btn mt-6 btn-sm bg-sky-300 hover:bg-sky-400' type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
    {cardError && <p className='text-red-500'>{cardError}</p>}
    </div>
  );
};

export default CheckOutForm;
