import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="w-full h-screen fixed overflow-hidden flex-center ">
      <div className="form-container login">
        <p className="title">Log in</p>
        <form className="form">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="input"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="input"
              placeholder="Password"
            />
          </div>
          <button className="form-btn bg-border" type="submit">
            Log In
          </button>
        </form>
        <p className="sign-up-label text-center">
          Don't have an account?
          <Link to="/signup">
            <span className="sign-up-link">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
