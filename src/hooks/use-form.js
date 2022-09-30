import { useReducer } from "react";
const useForm = function (validateValue) {
  const inputStateReducer = (state, action) => {
    if (action.type === "INPUT") {
      return { value: action.value, isTouched: state.isTouched };
    }
    if (action.type === "BLUR") {
      return { value: state.value, isTouched: true };
    }
    if (action.type === "RESET") {
      return { value: "", isTouched: false };
    }
    return {
      value: "",
      isTouched: false,
    };
  };
  //const [enteredValue, setEnteredValue] = useState("");
  //const [isTouched, setIsTouched] = useState(false);
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    value: "",
    isTouched: false,
  });
  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;
  const valueChangeHandler = (e) => {
    dispatch({ type: "INPUT", value: e.target.value });
  };
  const inputBlurHandler = (e) => {
    dispatch({ type: "BLUR" });
  };
  const reset = () => {
    dispatch({ type: "RESET" });
  };
  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useForm;
