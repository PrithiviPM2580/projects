import { useState } from "react";
import { Input } from "@/components/ui/input";
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
import useAppContext from "@/hooks/useAppContext";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema.extend({
  userName: z.string().min(3, "Username must be at least 3 characters"),
});

type Auth = "login" | "sign-up";
type FormData = z.infer<typeof loginSchema> & { userName?: string };

const LoginPage = () => {
  const [auth, setAuth] = useState<Auth>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, signup } = useAppContext();

  const form = useForm<FormData>({
    resolver: zodResolver(auth === "login" ? loginSchema : signupSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      if (auth === "login") {
        await login({
          email: data.email,
          password: data.password,
        });
      } else {
        if (!data.userName) return;
        await signup({
          username: data.userName,
          email: data.email,
          password: data.password,
        });
      }
      toast.success(
        `Successfully ${auth === "login" ? "logged in" : "registered"}`,
      );
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred during submission. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="login-page-container ">
      <Card className="login-form-container">
        <CardTitle className="text-center theme-text heading-h2">
          {auth === "login" ? "Login" : "Register"}
        </CardTitle>
        <CardDescription className="theme-text text-center">
          {auth === "login"
            ? "Please enter your credentials to login."
            : "Fill in the details to create a new account."}
        </CardDescription>
        <CardContent className="w-full">
          <form
            id="form-rhf-demo"
            onSubmit={form.handleSubmit((data) => {
              onSubmit(data);
            })}
            className="login-form"
          >
            <FieldGroup className="gap-4">
              {auth === "sign-up" && (
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
            </FieldGroup>
            <Button
              type="submit"
              className="login-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : auth === "login"
                  ? "Login"
                  : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          {auth === "login" ? (
            <p className="theme-text">
              Dont't have the account ?{" "}
              <Button
                variant="link"
                className="text-mint-green-600 font-semibold px-1"
                onClick={() => setAuth("sign-up")}
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
                onClick={() => setAuth("login")}
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

export default LoginPage;
