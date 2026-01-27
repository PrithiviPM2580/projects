import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/constants";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispach = useDispatch();
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setuser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data?.success) {
        navigate("/");
        dispach(setAuthUser(response.data?.user));
        toast.success(response.data.message || "Login successful!");
      } else {
        toast.error(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="w-full h-screen fixed overflow-hidden flex-center ">
      <div className="form-container login">
        <p className="title">Log in</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="input"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
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
