import React from "react";

export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded bg-orange-700 py-2 px-3 mt-2 text-white hover:bg-orange-800 m-2"
    >
      {children}
    </button>
  );
}
