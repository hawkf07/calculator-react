import React from "react";
import { ACTIONS } from "../App";
export default function OperationButton({ operation, dispatch }) {
  return (
    <button
      className="btn btn-number"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {" "}
      {operation}
    </button>
  );
}
