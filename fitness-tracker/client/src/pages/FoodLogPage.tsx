import { quickActivitiesFoodLog } from "@/assets/seeder";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useAppContext from "@/hooks/useAppContext";
import type { FoodEntry, FormData } from "@/types";
import { Loader2Icon, PlusIcon, SparkleIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FoodLogPage = () => {
  const { allFoodLogs, setAllFoodLogs } = useAppContext();

  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    calories: 0,
    mealType: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().split("T")[0];
  const loadEntries = () => {
    const todayEntries = allFoodLogs.filter(
      (e: FoodEntry) => e.createdAt?.split("T")[0] === today,
    );
    setEntries(todayEntries);
  };

  const handleQuickAdd = (activityName: string) => {
    setFormData((prev) => ({
      ...prev,
      mealType: activityName,
    }));
    setShowForm(true);
  };
  const totalCalories = entries.reduce(
    (total, entry) => total + entry.calories,
    0,
  );

  useEffect(() => {
    (() => {
      loadEntries();
    })();
  }, [allFoodLogs]);

  return (
    <section className="page-container">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold theme-text">Food log</h1>
            <p className="text-sm mt-1 theme-text">Track your daily intake</p>
          </div>
          <div className="text-right">
            <p className="text-sm theme-text">Today's Total</p>
            <p className="text-xl font-semibold text-mint-green-600 dark:text-mint-green-400">
              {totalCalories} kcal
            </p>
          </div>
        </div>
      </div>

      <div className="page-content-grid">
        {!showForm && (
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold theme-text mb-3">Quick Add</h3>
              <div className="flex flex-wrap gap-2">
                {quickActivitiesFoodLog.map((activity) => (
                  <Button
                    className="food-log-btn"
                    key={activity.name}
                    onClick={() => handleQuickAdd(activity.name)}
                  >
                    {activity.emoji} {activity.name}
                  </Button>
                ))}
              </div>
            </Card>
            <Button
              className="w-full bg-mint-green-700 dark:bg-mint-green-500 hover:bg-mint-green-500 dark:hover:bg-mint-green-300 text-white"
              onClick={() => setShowForm(true)}
            >
              <PlusIcon className="size-5" />
              Add Food Entry
            </Button>
            <Button
              className="w-full bg-mint-green-700 dark:bg-mint-green-500 hover:bg-mint-green-500 dark:hover:bg-mint-green-300 text-white"
              onClick={() => inputRef.current?.click()}
            >
              <SparkleIcon className="size-5" />
              AI Food Snap
            </Button>
            <Input type="file" accept="images/*" hidden ref={inputRef} />
            {loading && (
              <div className="fixed inset-0 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur flex-center z-10">
                <Loader2Icon className="size-8 text-mint-green-600 dark:text-mint-green-400" />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FoodLogPage;
