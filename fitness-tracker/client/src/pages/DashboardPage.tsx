import { getMotivationalMessage } from "@/assets/seeder";
import ProgressBar from "@/components/ProgressBar";
import { Card } from "@/components/ui/card";
import useAppContext from "@/hooks/useAppContext";
import { cn } from "@/lib/utils";
import type { ActivityEntry, FoodEntry } from "@/types";
import {
  Activity,
  FlameIcon,
  HamburgerIcon,
  Ruler,
  ScaleIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [todayFood, setTodoFood] = useState<FoodEntry[]>([]);
  const [todayActivities, setTodayActivities] = useState<ActivityEntry[]>([]);
  const { user, allActivityLogs, allFoodLogs } = useAppContext();
  const DAILY_CALORIE_GOAL = user?.dailyCalorieIntake || 2000;

  const loadUserData = () => {
    const today = new Date().toISOString().split("T")[0];
    const foodDate = allFoodLogs.filter(
      (f: FoodEntry) => f.createdAt?.split("T")[0] === today,
    );
    setTodoFood(foodDate);
    const activityDate = allActivityLogs.filter(
      (a: ActivityEntry) => a.createdAt?.split("T")[0] === today,
    );
    setTodayActivities(activityDate);
  };

  useEffect(() => {
    (() => {
      loadUserData();
    })();
  }, [allActivityLogs, allFoodLogs]);

  const totalCalories: number = todayFood.reduce(
    (sum, item) => sum + item.calories,
    0,
  );
  const remainingCalories: number = DAILY_CALORIE_GOAL - totalCalories;
  const totalActivitiesMinutes: number = todayActivities.reduce(
    (sum, item) => sum + item.duration,
    0,
  );

  const totalBurned: number = todayActivities.reduce(
    (sum, item) => sum + (item.calories || 0),
    0,
  );
  const motivation = getMotivationalMessage(
    totalCalories,
    totalActivitiesMinutes,
    DAILY_CALORIE_GOAL,
  );

  return (
    <section className="page-container">
      <div className="dashboard-header">
        <p className="text-mint-green-100 text-sm font-medium">Welcome Back</p>
        <h1 className="text-2xl font-semibold mt-1">
          Hi there! 👋 {user?.username}
        </h1>

        <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{motivation.emoji}</span>
            <p className="text-white font-medium">{motivation.text}</p>
          </div>
        </div>
      </div>
      <div className="dashboard-grid">
        <Card className="shadow-lg col-span-2 p-4 gap-2!">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 flex-center rounded-xl">
                <HamburgerIcon className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm theme-text">Calories Consumed</p>
                <p className="text-xl font-medium theme-text">
                  {totalCalories}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm theme-text">Limit</p>
              <p className="text-xl font-medium theme-text">
                {DAILY_CALORIE_GOAL} kcal
              </p>
            </div>
          </div>
          <ProgressBar value={totalCalories} max={DAILY_CALORIE_GOAL} />
          <div className="mt-4 flex items-center justify-between">
            <div
              className={cn(
                "px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400",
                remainingCalories >= 0 &&
                  "bg-mint-green-50 dark:bg-mint-green-900/10 text-mint-green-700 dark:text-mint-green-400",
              )}
            >
              <p className="text-sm font-medium">
                {remainingCalories >= 0
                  ? remainingCalories + " kcl remaining"
                  : Math.abs(remainingCalories) + " kcl over"}
              </p>
            </div>
            <p className="text-sm theme-text">
              {Math.round((totalCalories / DAILY_CALORIE_GOAL) * 100)}%
            </p>
          </div>
          <div className="border-t border-slate-100 dark:border-slate-800 my-4" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 flex-center rounded-xl">
                <FlameIcon className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm theme-text">Calories Burned</p>
                <p className="text-xl font-medium theme-text">{totalBurned}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm theme-text">Goal</p>
              <p className="text-xl font-medium theme-text">
                {user?.dailyCalorieBurn || 400} kcal
              </p>
            </div>
          </div>
          <ProgressBar
            value={totalBurned}
            max={user?.dailyCalorieBurn || 400}
          />
        </Card>

        <div className="dashboard-card-grid">
          <Card className="p-4 gap-1!">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex-center">
                <Activity className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-sm theme-text">Active</p>
            </div>
            <p className="text-2xl font-semibold theme-text">
              {totalActivitiesMinutes}
            </p>
            <p className="text-sm theme-text">minutes today</p>
          </Card>
          <Card className="p-4 gap-1!">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex-center">
                <ZapIcon className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-sm theme-text">Workouts</p>
            </div>
            <p className="text-2xl font-semibold theme-text">
              {todayActivities.length}
            </p>
            <p className="text-sm theme-text">activities logged</p>
          </Card>
        </div>
        {user && (
          <Card className="bg-linear-to-r from-slate-800 to-slate-700 p-4!">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex-center">
                <TrendingUpIcon className="w-6 h-6 text-mint-green-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Your Goal</p>
                <p className="text-white font-medium capitalize">
                  {user.goal === "lose" && "🔥 Lose Weight"}
                  {user.goal === "maintain" && "⚖️ Maintain Weight"}
                  {user.goal === "gain" && "💪 Gain Weight"}
                </p>
              </div>
            </div>
          </Card>
        )}

        {user && user.weight && (
          <Card className="p-4!">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex-center">
                <ScaleIcon className="w-6 h-6 text-mint-green-400" />
              </div>
              <div>
                <h3 className="font-medium theme-text">Body Metrics</h3>
                <p className="text-slate-500 text-sm">Your stats</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                    <ScaleIcon className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-sm theme-text">Weight</p>
                </div>
                <p className="font-medium theme-text">{user.weight} kg</p>
              </div>

              {user.height && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <Ruler className="w-5 h-5 text-slate-400" />
                    </div>
                    <p className="text-sm theme-text">Height</p>
                  </div>
                  <p className="font-medium theme-text">{user.height} cm</p>
                </div>
              )}
              {user?.height && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium theme-text">BMI</p>
                    {(() => {
                      const bmi = (
                        user?.weight / Math.pow(user.height / 100, 2)
                      ).toFixed(1);
                      const getStatus = (b: number) => {
                        if (b < 18.5)
                          return {
                            color: "text-blue-500",
                            bg: "bg-blue-500",
                          };
                        if (b < 25)
                          return {
                            color: "text-mint-green-500",
                            bg: "bg-mint-green-500",
                          };
                        if (b < 30)
                          return {
                            color: "text-orange-500",
                            bg: "bg-orange-500",
                          };

                        return {
                          color: "text-red-500",
                          bg: "bg-red-500",
                        };
                      };
                      const status = getStatus(Number(bmi));
                      return (
                        <span
                          className={`text-lg font-semibold ${status.color}`}
                        >
                          {bmi}
                        </span>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
