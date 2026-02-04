import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import type { Auth } from "@/types";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { logInUser, signUpUser } from "@/lib/auth-functions";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
});

const signupSchema = z.object({
  name: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof loginSchema> & { name?: string };

const AuthPage = () => {
  const [auth, setAuth] = useState<Auth>("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(auth === "login" ? loginSchema : signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: FormData) {
    console.log("Form submitted with data:", data);
    setIsSubmitting(true);
    try {
      if (auth === "login") {
        console.log("Attempting login...");
        await logInUser(
          {
            email: data.email,
            password: data.password,
          },
          {
            onLoading: setLoading,
            onToast: (message, type) => {
              console.log("Toast:", message, type);
              if (type === "success") {
                toast.success(message);
              } else {
                toast.error(message);
              }
            },
          },
        );
      } else {
        console.log("Attempting signup...");
        if (!data.name) return;
        await signUpUser(
          {
            name: data.name,
            email: data.email,
            password: data.password,
          },
          {
            onLoading: setLoading,
            onToast: (message, type) => {
              console.log("Toast:", message, type);
              if (type === "success") {
                toast.success(message);
              } else {
                toast.error(message);
              }
            },
          },
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred during submission. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="wrapper">
      <Card
        className={cn("auth-card", auth === "signup" ? "h-125!" : "h-112!")}
      >
        <CardHeader className="w-full">
          <CardTitle className="auth-text">
            {auth === "login" ? "Login" : "Sign Up"}
          </CardTitle>
          <CardDescription className="text-center theme-text">
            {auth === "login"
              ? "Please enter your credentials to login."
              : "Fill in the details to create a new account."}
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full p-0!">
          <form
            className="form"
            id="form-rhf-demo"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              {auth === "signup" && (
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="relative ">
                        <Input
                          {...field}
                          id="form-rhf-demo-name"
                          aria-invalid={fieldState.invalid}
                          placeholder="Name"
                          autoComplete="off"
                          className="input theme-text"
                          type="text"
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
                    <div className="">
                      <Input
                        {...field}
                        id="form-rhf-demo-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Email"
                        autoComplete="off"
                        className="input theme-text"
                        type="email"
                        required
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
                    <div className="">
                      <Input
                        {...field}
                        id="form-rhf-demo-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Password"
                        autoComplete="off"
                        className="input theme-text"
                        type="password"
                        required
                      />
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
              className="button-confirm"
              disabled={isSubmitting || loading}
              form="form-rhf-demo"
            >
              {isSubmitting
                ? "Submitting..."
                : auth === "login"
                  ? "Login"
                  : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="w-full flex items-center justify-center">
          {auth === "login" ? (
            <p className="theme-text text-center w-full">
              Dont't have the account ?{" "}
              <Button
                variant="link"
                className="theme-text font-semibold px-1"
                onClick={() => setAuth("signup")}
              >
                Sign up
              </Button>
            </p>
          ) : (
            <p className="theme-text text-center w-full">
              Already have an account?{" "}
              <Button
                variant="link"
                className="theme-text font-semibold px-1"
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

export default AuthPage;
