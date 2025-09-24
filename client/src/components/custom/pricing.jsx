import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Pricing() {
  const [ticketAmount, setTicketAmount] = useState(499);
  const [orderID, setOrderID] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("Gaurav Kumar");
  const [email, setEmail] = useState("gauravkumar@fmail.com");
  const [phone, setPhone] = useState("+919876543210");
  const navigate = useNavigate();
  const eventId = "68d1d78ba009977a61bb0637";

  const handlePayment = async (e) => {
    e.preventDefault();

    // 1. Create order on server
    const res = await fetch("http://localhost:5000/api/payments/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: ticketAmount,
        currency: "INR",
        receipt: `receipt_${Math.random().toString(36).substring(7)}`,
      }),
    });
    const data = await res.json();
    if (!data.success) return alert("Server error. Are you running backend?");

    const orderId = data.order.id;

    // 2. Create ticket with paymentStatus pending
    const ticketRes = await fetch("http://localhost:5000/api/tickets/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId,
        quantity,
        price: ticketAmount,
        orderId,
      }),
    });
    const ticketData = await ticketRes.json();
    if (!ticketData.success) return alert(ticketData.message);

    const bookingId = ticketData.ticket.bookingId;

    // 3. Initialize Razorpay
    const options = {
      key: "rzp_test_RKdvCOb9U75RGb",
      amount: ticketAmount * 100,
      currency: "INR",
      name: "Jam Junction Lucknow",
      description: "Test Transaction",
      order_id: orderId,
      handler: async (response) => {
        console.log(response);

        // 4. Verify payment on server
        const validatePayment = await fetch(
          "http://localhost:5000/api/payments/verify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId,
            }),
          }
        );

        const res = await validatePayment.json();
        console.log(res);
        if (res.success) {
          alert("Payment successful!");
          navigate(`/qr/${res.bookingId}`);
        } else {
          alert("Payment verification failed!");
        }
      },
      prefill: { name, email, contact: phone },
      theme: { color: "#3399cc" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const addToBuy = (id) => {
    //add item to cart
    console.log("Added to cart", id);
  };

  const product = {
    _id: "68d1d78ba009977a61bb0637",
    name: "Shaan-E-Shukoon",
    price: 499,
    offerPrice: 199,
    category: "Concert",
    image: [],
  };

  const cartItems = {};
  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center justify-start gap-2 px-2 pt-10">
        <div className="w-full flex flex-col justify-center items-start pl-3 h-14 border border-gray-200 rounded-md">
          <div className="font-medium text-sm text-gray-500">Solo</div>
          <div className="font-medium text-base text-gray-700">₹ 199.00</div>
        </div>
        <div className="w-full flex flex-col justify-center items-start pl-3 h-14 border border-gray-200 rounded-md">
          <div className="font-medium text-sm text-gray-500">Group of 4</div>
          <div className="font-medium text-base text-gray-700">₹ 699.00</div>
        </div>
        <div className="w-full flex flex-row justify-between items-center pl-3 h-14 border border-gray-200 rounded-md">
          <div className="flex items-end justify-between w-full ">
            <p className="md:text-xl text-base font-medium text-primary">
              ${product.offerPrice}{" "}
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                ${product.price}
              </span>
            </p>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-primary"
            >
              {!cartItems[product._id] ? (
                <button
                  className="cursor-pointer flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium"
                  onClick={() => addToBuy(product._id)}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                      stroke="#615fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => addToBuy(product._id)}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buy Option */}
        <div className="w-full flex justify-center items-center h-40 bg-gradient-to-b from-transparent via-white to-white fixed bottom-0 left-0 right-0 p-4">
          <button
            onClick={handlePayment}
            className="flex justify-center items-center gap-6 w-full px-6 h-10 rounded-lg bg-violet-500 hover:bg-violet-600 text-white text-base font-medium figtree mt-6"
          >
            Buy Tickets ₹499
            <div className="bg-violet-800 rounded-full w-6 h-6 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
                fill="#FFFFFF"
              >
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Pricing;
