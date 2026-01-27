declare global {
  interface RegisterBody {
    name: string;
    email: string;
    password: string;
    role: string;
  }
}

export {};
