import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";

function CustomerOrder() {
  return <div>Protected customer order page.</div>;
}

export default withAuthenticator(CustomerOrder);
