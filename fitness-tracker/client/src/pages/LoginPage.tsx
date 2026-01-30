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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";

const formSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type Auth = "login" | "sign-up";

const LoginPage = () => {
  const [auth, setAuth] = useState<Auth>("login");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <section className="login-page-container ">
      <Card className="login-form-container">
        <CardTitle>{auth === "login" ? "Login" : "Register"}</CardTitle>
        <CardDescription>
          {auth === "login"
            ? "Please enter your credentials to login."
            : "Fill in the details to create a new account."}
        </CardDescription>
        <CardContent>
          <form
            id="form-rhf-demo"
            onSubmit={form.handleSubmit(onSubmit)}
            className="login-form"
          >
            <FieldGroup>
              <Controller
                name="userName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-userName">
                      Username
                    </FieldLabel>
                    <div className="relative ">
                      <MailIcon className="absolute top-1/2 left-2 -translate-y-1/2" />
                      <Input
                        {...field}
                        id="form-rhf-demo-userName"
                        aria-invalid={fieldState.invalid}
                        placeholder="Please enter your username"
                        autoComplete="off"
                        className="login-input"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Please enter your email"
                      autoComplete="off"
                      className="login-input"
                    />
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
                    <FieldLabel htmlFor="form-rhf-demo-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Please enter your password"
                      autoComplete="off"
                      className="login-input"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          {auth === "login" ? (
            <p>
              Dont't have the account ?{" "}
              <Button onClick={() => setAuth("sign-up")}>Sign up</Button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Button onClick={() => setAuth("login")}>Login</Button>
            </p>
          )}
        </CardFooter>
      </Card>
    </section>
  );
};

export default LoginPage;
