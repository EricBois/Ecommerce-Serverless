import React, { useEffect } from "react";
import { useRouter } from "next/router";

function OrderCancelPage() {
  const router = useRouter();
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("canceled")) {
      console.log("Order canceled.");
    }
    router.push("/cart");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>Order Cancel Page</div>;
}

export default OrderCancelPage;
