import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  MailIcon,
  AtSignIcon,
  LockIcon,
  EyeOffIcon,
  EyeIcon,
} from "lucide-react";
import apiClient from "@/lib/api-client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema
  .extend({
    fullName: z.string().min(3, "Fullname must be at least 3 characters"),
    userName: z.string().min(3, "Username must be at least 3 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
    gender: z.enum(["Male", "Female"], {
      message: "Please select a gender",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

type Auth = "login" | "signup";
type FormData = z.infer<typeof loginSchema> & {
  fullName?: string;
  userName?: string;
  confirmPassword?: string;
  gender?: "Male" | "Female";
};

const Auth = ({ type }: { type: Auth }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(type === "login" ? loginSchema : signupSchema),
    defaultValues: {
      fullName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "Male",
    },
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      if (type === "login") {
        const response = await apiClient.post("/auth/login", {
          email: data.email,
          password: data.password,
        });
        console.log("Login response:", response.data);

        if (response.data) {
          updateUser(response.data);
          toast.success("Login successful");
          navigate("/", { replace: true });
        } else {
          toast.error("Login failed: No user data received");
        }
      } else {
        console.log("Signup data:", data);
        await apiClient.post("/auth/signup", {
          fullName: data.fullName,
          userName: data.userName,
          email: data.email,
          password: data.password,
          gender: data.gender,
        });
        toast.success("Registration successful, please login");
        navigate("/login", { replace: true });
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred during submission. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="login-page-container ">
      <Card className="login-form-container">
        <CardTitle className="text-center theme-text heading-h2">
          {type === "login" ? "Login" : "Register"}
        </CardTitle>
        <CardDescription className="theme-text text-center">
          {type === "login"
            ? "Please enter your credentials to login."
            : "Fill in the details to create a new account."}
        </CardDescription>
        <CardContent className="w-full">
          <form
            id="form-rhf-demo"
            onSubmit={form.handleSubmit(onSubmit)}
            className="login-form"
          >
            <FieldGroup className="gap-4">
              {type === "signup" && (
                <Controller
                  name="userName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="form-rhf-demo-userName"
                        className="theme-text"
                      >
                        Username
                      </FieldLabel>
                      <div className="relative ">
                        <AtSignIcon className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 theme-text" />
                        <Input
                          {...field}
                          id="form-rhf-demo-userName"
                          aria-invalid={fieldState.invalid}
                          placeholder="Please enter your username"
                          autoComplete="off"
                          className="login-input theme-text"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              )}
              {type === "signup" && (
                <Controller
                  name="fullName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="form-rhf-demo-fullName"
                        className="theme-text"
                      >
                        Fullname
                      </FieldLabel>
                      <div className="relative ">
                        <AtSignIcon className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 theme-text" />
                        <Input
                          {...field}
                          id="form-rhf-demo-fullName"
                          aria-invalid={fieldState.invalid}
                          placeholder="Please enter your fullname"
                          autoComplete="off"
                          className="login-input theme-text"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              )}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-rhf-demo-email"
                      className="theme-text"
                    >
                      Email
                    </FieldLabel>
                    <div className="relative ">
                      <MailIcon className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 theme-text" />
                      <Input
                        {...field}
                        id="form-rhf-demo-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Please enter your email"
                        autoComplete="off"
                        className="login-input theme-text"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-rhf-demo-password"
                      className="theme-text"
                    >
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <LockIcon className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 theme-text" />
                      <Input
                        {...field}
                        id="form-rhf-demo-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Please enter your password"
                        autoComplete="off"
                        className="login-input theme-text"
                        type={showPassword ? "text" : "password"}
                      />
                      <Button
                        type="button"
                        variant="link"
                        size="icon-sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword((p) => !p)}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="w-5 h-5 theme-text cursor-pointer" />
                        ) : (
                          <EyeIcon className="w-5 h-5 theme-text cursor-pointer" />
                        )}
                      </Button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {type === "signup" && (
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="form-rhf-demo-confirmPassword"
                        className="theme-text"
                      >
                        Confirm Password
                      </FieldLabel>
                      <div className="relative">
                        <LockIcon className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 theme-text" />
                        <Input
                          {...field}
                          id="form-rhf-demo-confirmPassword"
                          aria-invalid={fieldState.invalid}
                          placeholder="Please confirm your password"
                          autoComplete="off"
                          className="login-input theme-text"
                          type={showPassword ? "text" : "password"}
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              )}
              {type === "signup" && (
                <Controller
                  name="gender"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="theme-text">Gender</FieldLabel>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="grid grid-cols-2 gap-4"
                      >
                        <label className="flex items-center gap-2 theme-text">
                          <RadioGroupItem value="Male" />
                          Male
                        </label>
                        <label className="flex items-center gap-2 theme-text">
                          <RadioGroupItem value="Female" />
                          Female
                        </label>
                      </RadioGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              )}
            </FieldGroup>
            <Button
              type="submit"
              className="login-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : type === "login"
                  ? "Login"
                  : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          {type === "login" ? (
            <p className="theme-text">
              Dont't have the account ?{" "}
              <Button
                variant="link"
                className="text-mint-green-600 font-semibold px-1"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
            </p>
          ) : (
            <p className="theme-text">
              Already have an account?{" "}
              <Button
                variant="link"
                className="text-mint-green-600 font-semibold px-1"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </p>
          )}
        </CardFooter>
      </Card>
    </section>
  );
};

export default Auth;
