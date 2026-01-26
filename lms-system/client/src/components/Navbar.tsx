import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const user = false;

  return (
    <header>
      <div className="logo">Logo</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="/courses">Courses</Link>
            {!user ? (
              <>
                <Button asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <div></div>
                <Button asChild>
                  <Link to="/login">Logout</Link>
                </Button>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
