import React from "react";
import { ACTIONS } from "../App";
export default function DigitButton({ digit, dispatch }) {
  return (
    <button
      className="btn btn-number"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {" "}
      {digit}
    </button>
  );
}
