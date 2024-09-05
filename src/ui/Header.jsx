import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <div className="flex justify-between border-b border-stone-500 bg-yellow-400 px-3 py-4 uppercase sm:px-6">
      <Link to="/">
        <h2 className="font-pizza tracking-widest">Fast react pizza co.</h2>
      </Link>
      <SearchOrder />
      <UserName />
    </div>
  );
}

export default Header;
