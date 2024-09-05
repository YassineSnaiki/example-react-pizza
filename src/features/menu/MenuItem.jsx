/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, deleteItem, increaseQuantity } from "../cart/CartSlice";
import { useEffect } from "react";
import UpdateQuantity from "../../ui/UpdateQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const { cart } = useSelector((state) => state.cart);
  const item = cart.find((item) => item.pizzaId === id);

  const dispatch = useDispatch();
  function addToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newItem));
  }
  return (
    <li className="flex  gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut && "opacity-70 grayscale"}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm uppercase">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-medium text-stone-500">Sold out</p>
          )}
          {item !== undefined && (
            <div className="flex gap-10">
              <UpdateQuantity pizzaId={id} quantity={item.quantity} />
              <Button onClick={() => dispatch(deleteItem(id))} type="small">
                delete
              </Button>
            </div>
          )}
          {!soldOut && item === undefined && (
            <Button onClick={addToCart} type="small">
              add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
