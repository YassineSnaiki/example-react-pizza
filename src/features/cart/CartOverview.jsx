import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPizzasNum, getTotalPrice } from "./CartSlice";

function CartOverview() {
  const pizzasNum = useSelector(getPizzasNum);

  const totalPrice = useSelector(getTotalPrice);

  return (
    <div className="flex justify-between bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:p-6 md:text-base">
      <p className="space-x-4 font-semibold sm:space-x-6">
        <span>{pizzasNum} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
