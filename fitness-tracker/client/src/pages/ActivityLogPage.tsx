import useAppContext from "@/hooks/useAppContext";
import type { ActivityEntry } from "@/types";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { quickActivities } from "@/assets/seeder";
import { Button } from "@/components/ui/button";
import {
  ActivityIcon,
  DumbbellIcon,
  PlusIcon,
  TimerIcon,
  Trash2Icon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import mockApi from "@/assets/mockApi";
import { cn } from "@/lib/utils";

const ActivityLogPage = () => {
  const { allActivityLogs, setAllActivityLogs } = useAppContext();

  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    duration: 0,
    calories: 0,
  });
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const loadActivities = () => {
    const todaysActivities = allActivityLogs.filter((entry) => {
      const entryDate = new Date(entry.date).toISOString().split("T")[0];
      return entryDate === today;
    });
    setActivities(todaysActivities);
  };

  const handleQuickAdd = (activity: { name: string; rate: number }) => {
    setFormData({
      name: activity.name,
      duration: 30,
      calories: activity.rate * 30,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.duration <= 0) {
      return toast.error("Please provide valid activity name and duration.");
    }
    try {
      const { data } = await mockApi.activityLogs.create({ data: formData });
      setAllActivityLogs((prev) => [...prev, data]);
      setShowForm(false);
      setFormData({ name: "", duration: 0, calories: 0 });
      setError("");
      toast.success("Activity added successfully!");
    } catch (error: any) {
      console.error("Error adding activity:", error);
      toast.error(
        error?.message || "Failed to add activity. Please try again.",
      );
    }
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const duration = parseInt(e.target.value, 10);
    const activity = quickActivities.find((act) => act.name === formData.name);

    let calories = formData.calories;
    if (activity) {
      calories = duration * activity.rate;
    }

    setFormData({
      ...formData,
      duration,
      calories,
    });
  };

  const handleDelete = async (documentId: string) => {};

  useEffect(() => {
    (() => {
      loadActivities();
    })();
  }, [allActivityLogs]);

  const totalMinutes: number = activities.reduce(
    (sum, entry) => sum + entry.duration,
    0,
  );

  return (
    <section className="page-container">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold theme-text">Activity log</h1>
            <p className="text-sm mt-1 theme-text">Track your workouts</p>
          </div>
          <div className="text-right">
            <p className="text-sm theme-text">Active Today</p>
            <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
              {totalMinutes} min
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
                {quickActivities.map((activity) => (
                  <Button
                    className="food-log-btn"
                    key={activity.name}
                    onClick={() => handleQuickAdd(activity)}
                  >
                    {activity.emoji} {activity.name}
                  </Button>
                ))}
              </div>
            </Card>
            <Button
              className="w-full py-6! bg-mint-green-700 dark:bg-mint-green-500 hover:bg-mint-green-500 dark:hover:bg-mint-green-300 text-white"
              onClick={() => setShowForm(true)}
            >
              <PlusIcon className="size-5" />
              Add Custom Activity
            </Button>
          </div>
        )}
        {showForm && (
          <Card className="p-4 theme-bg border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold theme-text">New Activity</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="theme-text">
                  Activity Name
                </Label>
                <Input
                  className="py-6 input"
                  id="name"
                  value={formData.name}
                  onChange={(v) =>
                    setFormData({ ...formData, name: v.target.value })
                  }
                  placeholder="e.g, Morning Run"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="duration" className="theme-text">
                  Duration (min)
                </Label>
                <Input
                  className="py-6 input"
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleDurationChange}
                  placeholder="e.g, 350"
                  required
                  min={1}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="calories" className="theme-text">
                  Calories Burned
                </Label>
                <Input
                  className="py-6 input"
                  id="calories"
                  type="number"
                  value={formData.calories}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      calories: parseInt(e.target.value, 10),
                    })
                  }
                  placeholder="e.g, 350"
                  required
                  min={1}
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1 py-6!"
                  onClick={() => {
                    setShowForm(false);
                    (setError(""),
                      setFormData({ name: "", duration: 0, calories: 0 }));
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 py-6 bg-mint-green-400 dark:bg-mint-green-600 hover:bg-mint-green-600 dark:hover:bg-mint-green-400 text-white"
                >
                  Add Activity
                </Button>
              </div>
            </form>
          </Card>
        )}

        {activities.length === 0 ? (
          <Card className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl theme-text flex-center mx-auto mb-4">
              <DumbbellIcon className="size-8 theme-text" />
            </div>
            <h3 className="font-semibold theme-text">
              No activities logged today
            </h3>
            <p className="theme-text">Start moving and track your progress</p>
          </Card>
        ) : (
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900 flex-center">
                <ActivityIcon className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold theme-text capitalize">
                  Today's Activities
                </h3>
                <p className="theme-text text-sm">{activities.length} logged</p>
              </div>
            </div>

            <div className="space-y-2">
              {activities.map((activity) => (
                <div className="activity-entry-item" key={activity.id}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900 flex-center">
                      <TimerIcon className="size-5 text-blue-500 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium theme-text">{activity.name}</p>
                      <p className="text-sm theme-text">
                        {new Date(activity?.createdAt || "").toLocaleTimeString(
                          "en-us",
                          { hour: "2-digit", minute: "2-digit" },
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className=" font-semibold theme-text">
                        {activity.duration} min
                      </p>
                      <p className="text-xs theme-text">
                        {activity.calories} kcal
                      </p>
                    </div>
                    <Button
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      onClick={() => handleDelete(activity?.documentId || "")}
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center ">
              <span className="theme-text">Total Active Time</span>
              <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {totalMinutes} minutes
              </span>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ActivityLogPage;
