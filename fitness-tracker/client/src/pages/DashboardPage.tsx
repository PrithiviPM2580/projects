import { getMotivationalMessage } from "@/assets/seeder";
import ProgressBar from "@/components/ProgressBar";
import { Card } from "@/components/ui/card";
import useAppContext from "@/hooks/useAppContext";
import type { ActivityEntry, FoodEntry } from "@/types";
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
        <Card className="shadow-lg col-span-2">
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold theme-text">
                  Calorie Intake
                </h2>
                <span className="text-sm font-medium theme-text">
                  {totalCalories} / {DAILY_CALORIE_GOAL} kcal
                </span>
              </div>
              <ProgressBar value={totalCalories} max={DAILY_CALORIE_GOAL} />
              <p className="text-sm theme-text mt-2">
                Remaining: {remainingCalories > 0 ? remainingCalories : 0} kcal
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold theme-text">
                  Calories Burned
                </h2>
                <span className="text-sm font-medium theme-text">
                  {totalBurned} / {user?.dailyCalorieBurn || 400} kcal
                </span>
              </div>
              <ProgressBar
                value={totalBurned}
                max={user?.dailyCalorieBurn || 400}
              />
              <p className="text-sm theme-text mt-2">
                Activities: {totalActivitiesMinutes} minutes
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default DashboardPage;
