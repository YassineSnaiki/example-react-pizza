import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import ButtonLink from "../../ui/ButtonLink";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./CartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const { userName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  function handleClear() {
    dispatch(clearCart());
  }
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <ButtonLink to="/menu">&larr; Back to menu</ButtonLink>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>
      <ul className="my-6 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="space-x-4">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={handleClear}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
