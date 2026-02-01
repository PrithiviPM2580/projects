import { goalLabels, goalOptions } from "@/assets/seeder";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useAppContext from "@/hooks/useAppContext";
import useTheme from "@/hooks/useTheme";
import type { ProfileFormData, UserData } from "@/types";
import {
  Calendar,
  LogOutIcon,
  MoonIcon,
  Scale,
  SunIcon,
  Target,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "@/components/Select";
import mockApi from "@/assets/mockApi";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user, logout, fetchUser, allFoodLogs, allActivityLogs } =
    useAppContext();
  const { theme, toggleTheme } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    age: 0,
    weight: 0,
    height: 0,
    goal: "maintain",
    dailyCalorieBurn: 400,
    dailyCalorieIntake: 2000,
  });

  const fetchUserData = () => {
    if (user) {
      setFormData({
        age: user?.age || 0,
        weight: user?.weight || 0,
        height: user?.height || 0,
        goal: user?.goal || "maintain",
        dailyCalorieBurn: user?.dailyCalorieBurn || 400,
        dailyCalorieIntake: user?.dailyCalorieIntake || 2000,
      });
    }
  };

  useEffect(() => {
    (() => {
      fetchUserData();
    })();
  }, [user]);

  const handleSave = async () => {
    try {
      const updates: Partial<UserData> = {
        ...formData,
        goal: formData.goal as "lose" | "maintain" | "gain",
      };
      await mockApi.user.update(user?.id || "", updates);
      await fetchUser(user?.token || "");
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
    setIsEditing(false);
  };

  const getStats = () => {
    const totalFoodEntries = allFoodLogs?.length || 0;
    const totalActivityEntries = allActivityLogs?.length || 0;
    return { totalFoodEntries, totalActivityEntries };
  };

  const stats = getStats();

  if (!user || !formData) return null;

  return (
    <section className="page-container">
      <div className="page-header">
        <h1 className="text-2xl font-semibold theme-text">Profile</h1>
        <p className="text-sm mt-1 theme-text">Manage your settings</p>
      </div>
      <div className="profile-content">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-linear-to-br from-mint-green-400 to-mint-green-600 flex-center">
              <User />
            </div>
            <div>
              <h2 className="text-lg font-semibold theme-text">Your Profie</h2>
              <p className="theme-text text-xs">
                Member since{" "}
                {new Date(user?.createdAt || "").toLocaleDateString()}
              </p>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  className="py-6! input"
                  id="age"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: Number(e.target.value) })
                  }
                  min={13}
                  max={120}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  className="py-6! input"
                  id="weight"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      weight: Number(e.target.value),
                    })
                  }
                  min={20}
                  max={300}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  className="py-6! input"
                  id="height"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      height: Number(e.target.value),
                    })
                  }
                  min={100}
                  max={250}
                />
              </div>
              <Select
                label="Fitness Goal"
                value={formData.goal}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    goal: value as "lose" | "maintain" | "gain",
                  })
                }
                options={goalOptions}
              />

              <div className="flex gap-3 pt-2">
                <Button
                  variant="secondary"
                  className="flex-1 py-6!"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      age: Number(user?.age),
                      weight: Number(user?.weight),
                      height: Number(user?.height),
                      goal: user?.goal || "",
                      dailyCalorieBurn: user?.dailyCalorieBurn || 2000,
                      dailyCalorieIntake: user?.dailyCalorieIntake || 400,
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 w-full py-6! bg-mint-green-700 dark:bg-mint-green-500 hover:bg-mint-green-500 dark:hover:bg-mint-green-300 text-white"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
                  <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex-center">
                    <Calendar className="size-4.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm theme-text">Age</p>
                    <p className="font-semibold theme-text">
                      {user?.age} years
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
                  <div className="size-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex-center">
                    <Scale className="size-4.5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm theme-text">Weight</p>
                    <p className="font-semibold theme-text">
                      {user?.weight} kg
                    </p>
                  </div>
                </div>
                {user?.height !== 0 && (
                  <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
                    <div className="size-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex-center">
                      <User className="size-4.5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm theme-text">Height</p>
                      <p className="font-semibold theme-text">
                        {user?.height} cm
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
                  <div className="size-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex-center">
                    <Target className="size-4.5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm theme-text">Goal</p>
                    <p className="font-semibold theme-text">
                      {goalLabels[user?.goal || "gain"]} cm
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="secondary"
                onClick={() => setIsEditing(true)}
                className="w-full mt-4 py-6!"
              >
                Edit Profile
              </Button>
            </>
          )}
        </Card>
        <div className="space-y-4">
          <Card className="theme-bg p-4">
            <h3 className="font-semibold theme-text">Your Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-mint-green-50 dark:bg-mint-green-900/10 rounded-xl">
                <p className="text-2xl font-semibold text-mint-green-600 dark:text-mint-green-400">
                  {stats.totalFoodEntries}
                </p>
                <p className="text-sm theme-text">Food entries</p>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
                <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  {stats.totalActivityEntries}
                </p>
                <p className="text-sm theme-text">Activities</p>
              </div>
            </div>
          </Card>
          <div className="lg:hidden">
            <Button
              className="flex items-center gap-3 px-4 py-6! w-full text-slate-500 dark:text-slate-400 hover:bg-slate-600 dark:hover:bg-slate-800 hover:text-slate-700 rounded-lg transition-colors duration-200 cursor-pointer"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <MoonIcon className="size-5" />
              ) : (
                <SunIcon className="size-5" />
              )}
              <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
            </Button>
          </div>

          <Button
            variant="destructive"
            onClick={logout}
            className="w-full ring ring-red-300 hover:ring-2 py-6!"
          >
            <LogOutIcon className="size-4" />
            Logout
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
