import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { setAuthUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);

  const logoutHandler = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/logout`, {
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setAuthUser(null));
        toast.success("Logout Successful");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout Failed. Please try again.");
    }
  };

  return (
    <header className="header">
      <div className="text-sm md:text-xl">Logo</div>
      <nav>
        <ul className="flex-center gap-2 md:gap-6">
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
                  className="bg-jordy-blue-600 hover:bg-jordy-blue-400 text-sm md:text-xl px-3 py-0 md:px-6 md:py-6"
                >
                  <Link to="/login">Login</Link>
                </Button>
              </li>
              <li>
                <Button
                  asChild
                  className="bg-transparent border border-jordy-blue-600 text-sm md:text-xl px-3 py-0 md:px-6 md:py-6"
                >
                  <Link to="/sign-up">SignUp</Link>
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/profile">
                  <div className="h-12 w-12 rounded-full bg-white">
                    <img src="" alt="Logo" />
                  </div>
                </Link>
              </li>
              <li>
                <Button
                  onClick={logoutHandler}
                  asChild
                  className="bg-jordy-blue-600 hover:bg-jordy-blue-400 text-sm md:text-xl px-3 py-0 md:px-6 md:py-6"
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
