import type { LoginUser, SignupUser, ToastType } from "@/types";
import { authClient } from "./auth-client";

export const signUpUser = async (
  userData: SignupUser,
  callbacks?: {
    onLoading?: (loading: boolean) => void;
    onToast?: (message: string, type: ToastType) => void;
  },
) => {
  return await authClient.signUp.email(
    {
      ...userData,
      callbackURL: "/",
    },
    {
      onRequest: () => {
        callbacks?.onLoading?.(true);
      },
      onSuccess: () => {
        callbacks?.onLoading?.(false);
        callbacks?.onToast?.("Account created successfully!", "success");
      },
      onError: (ctx) => {
        callbacks?.onLoading?.(false);
        callbacks?.onToast?.(ctx.error.message, "error");
      },
    },
  );
};

export const logInUser = async (
  userData: LoginUser,
  callbacks?: {
    onLoading?: (loading: boolean) => void;
    onToast?: (message: string, type: ToastType) => void;
  },
) => {
  return await authClient.signIn.email(
    {
      ...userData,
      callbackURL: "/",
    },
    {
      onRequest: () => {
        callbacks?.onLoading?.(true);
      },
      onSuccess: () => {
        callbacks?.onLoading?.(false);
        callbacks?.onToast?.("Logged in successfully!", "success");
      },
      onError: (ctx) => {
        callbacks?.onLoading?.(false);
        callbacks?.onToast?.(ctx.error.message, "error");
      },
    },
  );
};
