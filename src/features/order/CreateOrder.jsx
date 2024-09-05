/* eslint-disable no-unused-expressions */
import FormInput from "../../ui/FormInput";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { clearCart, getTotalPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    userName,
    address,
    position,
    error: addressError,
    status: adressStatus,
  } = useSelector((state) => state.user);
  const isloading = adressStatus === "loading";
  const { cart } = useSelector((state) => state.cart);
  const errors = useActionData();
  const { state } = useNavigation();
  const submitting = state === "submitting";
  const totalPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;

  const finalPrice = formatCurrency(totalPrice + priorityPrice);
  const dispatch = useDispatch();

  if (cart.length === 0) return <EmptyCart />;
  return (
    <div>
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let s go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col items-center gap-2 md:flex-row">
          <label className="md:basis-40">First Name</label>
          <FormInput
            type="text"
            name="customer"
            required={true}
            className="grow"
            defaultValue={userName}
          />
        </div>

        <div className="mb-5 flex flex-col items-center gap-2 md:flex-row">
          <label className={`md:basis-40 ${errors?.phone && "self-start"}`}>
            Phone number
          </label>
          <div className="grow">
            <FormInput
              type="tel"
              name="phone"
              required={true}
              className="w-full"
            />
            {errors?.phone && (
              <p className="mt-2 rounded-md bg-red-200 p-2 text-xs text-red-700">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col items-center gap-2 md:flex-row">
          <label className="md:basis-40">Address</label>
          <div className="relative grow">
            <FormInput
              type="text"
              name="address"
              required={true}
              className="w-full"
              defaultValue={address}
              disabled={isloading}
            />
            {address === "" && (
              <Button
                disabled={isloading}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                type="small"
                className="absolute  right-[50%] top-[2px] translate-x-[50%] whitespace-nowrap md:right-[5.5px] md:top-[6px] md:translate-x-0"
              >
                Get My Position
              </Button>
            )}
            {addressError && (
              <p className="mt-2 rounded-md bg-red-200 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-4">
          <input
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 "
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={position ? `${position.latitude},${position.longitude}` : ""}
        />
        <div>
          <Button type="primary" disabled={submitting}>
            Order now {finalPrice}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;

export async function action({ request }) {
  const errors = {};
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  if (!isValidPhone(data.phone))
    errors.phone = "please enter a correct phone number";
  if (Object.keys(errors).length !== 0) return errors;
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
