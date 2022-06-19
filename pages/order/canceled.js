import React, { useEffect } from "react";
import { useRouter } from "next/router";

function OrderCancelPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/cart");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>Back to Cart...</div>;
}

export default OrderCancelPage;
