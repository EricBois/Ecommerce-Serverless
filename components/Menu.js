import React from "react";
import Button from "./Button";

export default function Menu({ setFilterBy }) {
  return (
    <div className="grid grid-cols-1 items-center ml-5 mt-3">
      <div className="flex items-center -mb-5">
        <Button onClick={() => setFilterBy("")}>All Products</Button>
        <Button onClick={() => setFilterBy("electronic")}>Electronic</Button>
        <Button onClick={() => setFilterBy("shoes")}>Shoes</Button>
        <Button onClick={() => setFilterBy("accessories")}>Accessories</Button>
      </div>
    </div>
  );
}
