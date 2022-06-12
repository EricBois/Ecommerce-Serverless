import React, { useEffect } from "react";

function OrderCancelPage() {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("canceled")) {
      console.log("Order canceled.");
    }
  }, []);
  return <div>Order Cancel Page</div>;
}

export default OrderCancelPage;
