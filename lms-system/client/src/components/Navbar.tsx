import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const user = false;

  return (
    <header className="header">
      <div className="text-sm md:text-xl">Logo</div>
      <nav>
        <ul className="flex-center gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Button
                  asChild
                  className="bg-jordy-blue-600 hover:bg-jordy-blue-400 text-sm md:text-xl px-3 py-2 md:px-6 md:py-6"
                >
                  <Link to="/login">Login</Link>
                </Button>
              </li>
              <li>
                <Button
                  asChild
                  className="bg-transparent border border-jordy-blue-600 text-sm md:text-xl px-3 py-2 md:px-6 md:py-6"
                >
                  <Link to="/sign-up">SignUp</Link>
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <div className="h-12 w-12 rounded-full bg-white">
                  <img src="" alt="Logo" />
                </div>
              </li>
              <li>
                <Button
                  asChild
                  className="bg-jordy-blue-600 hover:bg-jordy-blue-400 text-sm md:text-xl px-3 py-2 md:px-6 md:py-6"
                >
                  <Link to="/login">Logout</Link>
                </Button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
