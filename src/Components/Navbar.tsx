import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full h-fit flex flex-row justify-between border-b-2 items-center bg-black/30">
      <NavLink to="/" className="cursor-default"></NavLink>
    </nav>
  );
}
