export interface SignupUser {
  email: string;
  password: string;
  name: string;
  image?: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type Theme = "dark" | "light" | "system";

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
export type ToastType = "success" | "error";
export type Auth = "login" | "signup";
