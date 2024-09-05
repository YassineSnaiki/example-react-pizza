/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const base =
  "inline-block rounded-full bg-yellow-400  font-semibold uppercase text-stone-800 transition-colors hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2";
function Button({ children, disabled, to, type, onClick, className }) {
  const styles = {
    primary: `${base} px-4 py-3  sm:px-6 sm:py-4 ${className}`,
    small: `${base} text-[12px] px-3 py-2 sm:px-4 sm:py-2 ${className}`,
    round: `${base} text-sm px-2.5 py-1 sm:px-3.5 sm:py-2 ${className}`,
    secondary: `inline-block rounded-full border border-stone-300  font-semibold uppercase text-stone-400 hover:text-stone-800 transition-colors hover:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-400 focus:ring-offset-2 px-4 py-2.5  sm:px-6 sm:py-3.5 ${className}`,
  };
  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  return (
    <button onClick={onClick} disabled={disabled} className={styles[type]}>
      {!disabled ? children : "submitting"}
    </button>
  );
}

export default Button;
