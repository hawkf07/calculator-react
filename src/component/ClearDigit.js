import React from "react";
import { ACTIONS } from "../App";
export default function OperationButton({ digit, dispatch }) {
  return (
    <button
      className="btn btn-number AC"
      onClick={() =>
        dispatch({ type: ACTIONS.CLEAR_DIGIT, payload: { digit } })
      }
    >
      {" "}
      {digit}
    </button>
  );
}
