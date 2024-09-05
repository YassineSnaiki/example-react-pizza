import { Outlet, useNavigation } from "react-router";
import CartOverview from "../features/cart/CartOverview";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
function AppLayout() {
  const { cart } = useSelector((state) => state.cart);
  const { state } = useNavigation();
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {state === "loading" && <Spinner />}
      <Header />
      <div className=" overflow-scroll">
        <main className="mx-auto max-w-3xl ">
          <Outlet />
        </main>
      </div>
      {cart.length !== 0 && <CartOverview />}
      <Footer />
    </div>
  );
}

export default AppLayout;
