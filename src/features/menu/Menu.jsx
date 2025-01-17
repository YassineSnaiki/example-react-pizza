/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from "react-router";
import { getMenu } from "../../services/apiRestaurant";
import Menuitem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className=" divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <Menuitem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Menu;

export async function loader(url) {
  const menu = await getMenu();
  return menu;
}
