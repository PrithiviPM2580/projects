import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="w-full h-screen fixed overflow-hidden flex-center ">
      <div className="form-container sign-up">
        <p className="title">Create account</p>
        <form className="form">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" className="input" placeholder="Name" />
          </div>
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
          <RadioGroup defaultValue="option-one" className="flex flex-col gap-4">
            <Label>Role</Label>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Instructor</Label>
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
