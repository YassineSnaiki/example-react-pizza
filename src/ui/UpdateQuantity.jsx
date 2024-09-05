import { useDispatch } from "react-redux";
import Button from "./Button";
import { decreaseQuantity, increaseQuantity } from "../features/cart/CartSlice";

function UpdateQuantity({ pizzaId, quantity }) {
  const dispatch = useDispatch();
  return (
    <div className="space-x-2">
      <Button onClick={() => dispatch(decreaseQuantity(pizzaId))} type="round">
        -
      </Button>
      <span className="text-sm font-medium">{quantity}</span>
      <Button onClick={() => dispatch(increaseQuantity(pizzaId))} type="round">
        +
      </Button>
    </div>
  );
}

export default UpdateQuantity;
