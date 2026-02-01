import useAppContext from "@/hooks/useAppContext";
import type { ActivityEntry } from "@/types";
import { useState } from "react";

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
              Add Custom Activity
            </Button>
            <Button
              className="w-full bg-mint-green-700 dark:bg-mint-green-500 hover:bg-mint-green-500 dark:hover:bg-mint-green-300 text-white"
              onClick={() => inputRef.current?.click()}
            >
              <SparkleIcon className="size-5" />
              AI Food Snap
            </Button>
            <Input
              onChange={handleImageChange}
              type="file"
              accept="images/*"
              hidden
              ref={inputRef}
            />
            {loading && (
              <div className="fixed inset-0 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur flex-center z-10">
                <Loader2Icon className="size-8 text-mint-green-600 dark:text-mint-green-400" />
              </div>
            )}
          </div>
        )}
        {showForm && (
          <Card className="p-4 theme-bg border-mint-green-200 dark:border-mint-green-700">
            <h3 className="font-semibold theme-text">New Food Entry</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="theme-text">
                  Food Name
                </Label>
                <Input
                  className="py-6 input"
                  id="name"
                  value={formData.name}
                  onChange={(v) =>
                    setFormData({ ...formData, name: v.target.value })
                  }
                  placeholder="e.g, Grilled Chicken Salad"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="calories" className="theme-text">
                  Calories
                </Label>
                <Input
                  className="py-6 input"
                  id="calories"
                  type="number"
                  value={formData.calories}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      calories: Number(e.target.value),
                    })
                  }
                  placeholder="e.g, 350"
                  required
                  min={1}
                />
              </div>

              <Select
                label="Meal Type"
                value={formData.mealType}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    mealType: value as string,
                  })
                }
                options={mealTypeOptions}
                placeholder="Select meal type"
                required
              />

              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1 py-6!"
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      name: "",
                      calories: 0,
                      mealType: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 py-6! bg-mint-green-400 dark:bg-mint-green-600 hover:bg-mint-green-500 dark:hover:bg-mint-green-400 text-white"
                >
                  Add Entry
                </Button>
              </div>
            </form>
          </Card>
        )}

        {entries.length === 0 ? (
          <Card className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl theme-text flex-center mx-auto mb-4">
              <UtensilsCrossedIcon className="size-8 theme-text" />
            </div>
            <h3 className="font-semibold theme-text">No food logged today</h3>
            <p className="theme-text">
              Start tracking your meals to stay on target
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {["breakfast", "lunch", "dinner", "snack"].map((mealType) => {
              const mealTypeKey = mealType as keyof typeof groupEntries;
              if (!groupEntries[mealTypeKey]) return null;

              const MealIcon = mealIcons[mealTypeKey];
              const mealCalories = groupEntries[mealTypeKey].reduce(
                (sum, e) => sum + e.calories,
                0,
              );

              return (
                <Card className="p-4" key={mealTypeKey}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex-center",
                          mealColors[mealTypeKey],
                        )}
                      >
                        <MealIcon className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold theme-text capitalize">
                          {mealType}
                        </h3>
                        <p className="">
                          {groupEntries[mealTypeKey].length} items
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold theme-text">
                      {mealCalories} kcal
                    </p>
                  </div>

                  <div className="space-y-2">
                    {groupEntries[mealTypeKey].map((entry) => (
                      <div className="food-entry-item" key={entry.id}>
                        <div className="flex-1">
                          <p className="font-medium theme-text">{entry.name}</p>
                          <p className="text-sm theme-text">{}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium theme-text">
                            {entry.calories} kcal
                          </span>
                          <Button
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            onClick={() =>
                              handleDelete(entry?.documentId || "")
                            }
                          >
                            <Trash2Icon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivityLogPage;
