declare global {
  interface RegisterBody {
    name: string;
    email: string;
    password: string;
    role: string;
  }

  type LoginBody = Pick<RegisterBody, "email" | "password">;
}

export {};
