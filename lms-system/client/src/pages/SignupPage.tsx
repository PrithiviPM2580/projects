import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { toast } from "sonner";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data?.success) {
        navigate("/login");
        toast.success(
          response.data.message || "Sign up successful! Please log in.",
        );
      } else {
        toast.error(
          response.data.message || "Sign up failed. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };
  return (
    <div className="w-full h-screen fixed overflow-hidden flex-center ">
      <div className="form-container sign-up">
        <p className="title">Create account</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              className="input"
              placeholder="Name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <RadioGroup
            value={user.role}
            onValueChange={(value) =>
              setUser((prev) => ({
                ...prev,
                role: value,
              }))
            }
            className="flex flex-col gap-4"
          >
            <Label>Role</Label>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="instructor" id="instructor" />
                <Label htmlFor="instructor">Instructor</Label>
              </div>
            </div>
          </RadioGroup>
          <button className="form-btn bg-border" type="submit">
            Sign Up
          </button>
        </form>
        <p className="sign-up-label text-center">
          Already have an account?
          <Link to="/login">
            <span className="sign-up-link">Log in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
