import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-sky-800">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-2xl text-amber-50">
            {" "}
            User Management System
          </h1>
        </Link>
        <ul className="flex gap-4 text-amber-50">
          <Link to= '/home'>
            <li>Home</li>
          </Link>
          <Link to= '/about'>
            <li> About</li>
          </Link>
          <Link to= '/sign-in'>
            <li> Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
