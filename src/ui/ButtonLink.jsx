/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const className = "text-sm text-blue-500 hover:text-blue-600 hover:underline";
function ButtonLink({ children, to, onClick }) {
  if (to === -1)
    return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    );
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

export default ButtonLink;
