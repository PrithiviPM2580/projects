import mockApi from "@/assets/mockApi";
import {
  initialState,
  type User,
  type ActivityEntry,
  type FoodEntry,
  type Credentials,
} from "@/types";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext(initialState);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>(null);
  const [isUserFetched, setIsUserFetched] = useState<boolean>(false);
  const [onboardingCompleted, setOnboardingCompleted] =
    useState<boolean>(false);
  const [allFoodLogs, setAllFoodLogs] = useState<FoodEntry[]>([]);
  const [allActivityLogs, setAllActivityLogs] = useState<ActivityEntry[]>([]);

  const signUp = async (credentials: Credentials) => {
    const { data } = await mockApi.auth.register(credentials);
    setUser(data.user);
    if (data?.user?.age && data?.user?.weigth && data?.user?.goal) {
      setOnboardingCompleted(true);
    }
    localStorage.setItem("token", data.jwt);
  };

  const login = async (credentials: Credentials) => {
    const { data } = await mockApi.auth.login(credentials);
    setUser({ ...data.user, token: data.jwt });
    if (data?.user?.age && data?.user?.weigth && data?.user?.goal) {
      setOnboardingCompleted(true);
    }
    localStorage.setItem("token", data.jwt);
  };

  const fetchedUser = async (token: string) => {
    const { data } = await mockApi.user.me();
    setUser({ ...data, token });
    if (data?.age && data?.weigth && data?.goal) {
      setOnboardingCompleted(true);
    }
    setIsUserFetched(true);
  };

  const fetchedFoodLogs = async () => {
    const { data } = await mockApi.foodLogs.list();
    setAllFoodLogs(data);
  };

  const fetchedActivityLogs = async () => {
    const { data } = await mockApi.activityLogs.list();
    setAllActivityLogs(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setOnboardingCompleted(false);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        await fetchedUser(token);
        await fetchedFoodLogs();
        await fetchedActivityLogs();
      })();
    } else {
      setIsUserFetched(true);
    }
  }, []);

  const value = {
    user,
    setUser,
    login,
    signup: signUp,
    fetchUser: fetchedUser,
    isUserFetched,
    logout,
    onboardingCompleted,
    setOnboardingCompleted,
    allFoodLogs,
    setAllFoodLogs,
    allActivityLogs,
    setAllActivityLogs,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
