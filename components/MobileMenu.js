import React, { useState } from "react";

export default function MobileMenu({ setFilterBy }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      className="p-4 w-16 space-y-2 bg-[#263238] rounded shadow block sm:hidden -mb-5 relative"
    >
      <span className="block w-8 h-0.5 bg-gray-100 "></span>
      <span className="block w-8 h-0.5 bg-gray-100 "></span>
      <span className="block w-8 h-0.5 bg-gray-100 "></span>
      {open && (
        <ul className="absolute text-gray-700 pt-1">
          <li className="w-48">
            <a
              className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              onClick={() => {
                setFilterBy("");
                setOpen(false);
              }}
            >
              All Products
            </a>
          </li>
          <li className="w-48">
            <a
              className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              onClick={() => {
                setFilterBy("electronic");
                setOpen(false);
              }}
            >
              Electronic
            </a>
          </li>
          <li className="w-48">
            <a
              className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              onClick={() => {
                setFilterBy("shoes");
                setOpen(false);
              }}
            >
              Shoes
            </a>
          </li>
          <li className="w-48">
            <a
              className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              onClick={() => {
                setFilterBy("accessories");
                setOpen(false);
              }}
            >
              Accessories
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
