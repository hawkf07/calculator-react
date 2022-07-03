import logo from "./logo.svg";
import React, { useState, useReducer } from "react";
import "./App.css";
import DigitButton from "./component/DigitButton";
import OperationButton from "./component/operationButton";
import ClearDigit from "./component/ClearDigit";
export const ACTIONS = {
  ADD_DIGIT: "addDigit",
  CLEAR_DIGIT: "clearDigit",
  REMOVE_DIGIT: "removeDigit",
  EVALUATE: "evaluate",
  CHOOSE_OPERATION: "chooseOperation",
};

function evalute({ previousOperand, currentOperand, operation }) {
  const current = parseFloat(currentOperand);
  const prev = parseFloat(previousOperand);
  let computation;
  if (isNaN(current) || isNaN(prev)) {
    return;
  }

  switch (operation) {
    case "+":
      computation = current + prev;
      break;
    case "-":
      computation = current - prev;
      break;
    case "*":
      computation = current * prev;
      break;
    case "/":
      computation = current / prev;
      break;
  }
  return computation.toString();
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit.includes("0") && state.currentOperand === undefined) {
        return {};
      }
      if (payload.digit.includes(".") && state.currentOperand.includes(".") ){
	return {};
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CLEAR_DIGIT:
      if (payload.digit.includes("AC")) {
        return {};
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (
        state.currentOperand === undefined &&
        state.previousOperand === undefined
      ) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: null,
          operation: payload.operation,
        };
      }
      return {
        previousOperand: evalute(state),
        currentOperand: null,
        operation: payload.operation,
      };
    case ACTIONS.EVALUATE:
      if (
        state.currentOperand == null &&
        state.previousOperand == null &&
        state.operation == null
      ) {
        return state;
      }

      return {
        ...state,
        previousOperand: evalute(state),
        currentOperand: null,
      };
    case ACTIONS.REMOVE_DIGIT:
      if (state.currentOperand == null ) {
				return state
			}
      return {
        ...state,
        currentOperand:state.currentOperand.slice(0,-1)
      }
  }
}

function App() {
  // state stuff
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="App">
      <div className="container">
        <div className="calculator-grid">
          <div className="output">
            <span className="previousOperand">
              {previousOperand == null ? "" : Number(previousOperand).toLocaleString()} {operation}
            </span>

            <span className="currentOperand">{currentOperand == null ? "" : Number(currentOperand).toLocaleString()}</span>
          </div>

          <ClearDigit digit="AC" dispatch={dispatch} />
          <button className="btn btn-number" onClick={() => dispatch({type:ACTIONS.REMOVE_DIGIT})} >DEL</button>
          <OperationButton operation="+" dispatch={dispatch} />
          <OperationButton operation="-" dispatch={dispatch} />
          <OperationButton operation="*" dispatch={dispatch} />
          <OperationButton operation="/" dispatch={dispatch} />
          {/*<button data-name="number" className="btn btn-number zero">0</button>*/}
          <DigitButton digit="." dispatch={dispatch} />
          <DigitButton dispatch={dispatch} digit="0" />
          <DigitButton dispatch={dispatch} digit="1" />
          <DigitButton dispatch={dispatch} digit="2" />
          <DigitButton dispatch={dispatch} digit="3" />
          <DigitButton dispatch={dispatch} digit="4" />
          <DigitButton dispatch={dispatch} digit="5" />
          <DigitButton dispatch={dispatch} digit="6" />
          <DigitButton dispatch={dispatch} digit="7" />
          <DigitButton dispatch={dispatch} digit="8" />
          <DigitButton dispatch={dispatch} digit="9" />
          <button
            onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
            data-name="operator"
            className="btn btn-operator equal"
          >
            =
          </button>
        </div>
      </div>
	  <center>
	  <h1 style={{color:"white"}} > {previousOperand} </h1>
	  </center>
    </div>
  );
}

export default App;
