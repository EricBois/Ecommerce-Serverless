import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useProducts } from "../../hooks";

function OrderSuccessPage() {
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("session_id")) {
      setOrderId(query.get("session_id"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Order Success Page</h1>
      <Link href={`/customer-session/${orderId}`}>
        <a>View Order</a>
      </Link>
    </div>
  );
}

export default OrderSuccessPage;
