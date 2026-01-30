import mockApi from "@/assets/mockApi";
import { ageRanges, goalOptions } from "@/assets/seeder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import useAppContext from "@/hooks/useAppContext";
import { cn } from "@/lib/utils";
import { type ProfileFormData, type UserData } from "@/types";
import {
  ArrowLeft,
  ArrowRight,
  PersonStanding,
  ScaleIcon,
  Target,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const { user, setOnboardingCompleted, fetchUser } = useAppContext();
  const [formData, setFormData] = useState<ProfileFormData>({
    age: undefined as any,
    weight: undefined as any,
    height: undefined as any,
    goal: "maintain",
    dailyCalorieIntake: undefined as any,
    dailyCalorieBurn: undefined as any,
  });

  const totalSteps = 3;

  const updateField = (
    field: keyof ProfileFormData,
    value: string | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = async () => {
    if (step === 1) {
      if (
        !formData.age ||
        Number(formData.age) < 13 ||
        Number(formData.age) > 120
      ) {
        return toast.error("Please enter a valid age between 13 and 120.");
      }
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      const userData = {
        ...formData,
        age: formData.age,
        weight: formData.weight,
        height: formData.height ? formData.height : null,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("fitnessuser", JSON.stringify(userData));
      await mockApi.user.update(
        user?.id || "",
        userData as unknown as Partial<UserData>,
      );
      toast.success("Profile created successfully!");
      setOnboardingCompleted(true);
      await fetchUser(user?.token || "");
    }
  };

  const handleWeight = (value: string) => {
    const age = Number(formData.age);
    const range =
      ageRanges.find((r) => age <= r.max) || ageRanges[ageRanges.length - 1];
    let intake = range.maintain;
    let burn = range.burn;

    if (value === "lose") {
      intake -= 400;
      burn += 100;
    } else if (value === "gain") {
      intake += 500;
      burn -= 100;
    }

    setFormData((prev) => ({
      ...prev,
      goal: value as "lose" | "maintain" | "gain",
      dailyCalorieIntake: intake,
      dailyCalorieBurn: burn,
    }));
  };
  return (
    <>
      <div className="onboarding-container px-2 md:px-0">
        <div className="p-6 pt-12 onboarding-wrapper">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-mint-green-500 flex-center">
              <PersonStanding className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold theme-text">FitTrack</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-4">
            Let's personalize your experience
          </p>
        </div>

        <div className="px-6 mb-8 onboarding-wrapper">
          <div className="flex gap-2 max-w-2xl">
            {[1, 2, 3].map((s) => (
              <div
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-all duration-300",
                  s <= step
                    ? "bg-mint-green-500"
                    : "bg-slate-200 dark:bg-slate-800",
                )}
                key={s}
              ></div>
            ))}
          </div>
          <p className="theme-text mt-3">
            Step {step} of {totalSteps}
          </p>
        </div>

        <div className="flex-1 px-6 onboarding-wrapper">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-center size-12 rounded-xl bg-mint-green-50 dark:bg-mint-green-900/10 border border-mint-green-100 dark:border-mint-green-800">
                  <User className="size-6 text-mint-green-600 dark:text-mint-green-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold theme-text">
                    How old are you?
                  </h2>
                  <p className="theme-text text-sm">
                    This helps us calculate your needs.
                  </p>
                </div>
              </div>
              <Label htmlFor="age" className="text-base theme-text">
                Age
              </Label>
              <Input
                className="max-w-2xl login-input p-4! py-6! -mt-3"
                id="age"
                type="number"
                value={formData.age || ""}
                min={13}
                max={120}
                onChange={(e) => updateField("age", Number(e.target.value))}
                placeholder="Enter your age"
                required
              />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6 onboarding-wrapper">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-center size-12 rounded-xl bg-mint-green-50 dark:bg-mint-green-900/10 border border-mint-green-100 dark:border-mint-green-800">
                  <ScaleIcon className="size-6 text-mint-green-600 dark:text-mint-green-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold theme-text">
                    Your meaurements
                  </h2>
                  <p className="theme-text text-sm">
                    Help us to track your progress
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="weight" className="text-base theme-text">
                  Weight (kg)
                </Label>
                <Input
                  className="max-w-2xl login-input p-4! py-6! mt-2"
                  placeholder="Enter your weight in kg"
                  id="weight"
                  type="number"
                  value={formData.weight || ""}
                  min={20}
                  max={300}
                  onChange={(e) =>
                    updateField("weight", Number(e.target.value))
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="height" className="text-base theme-text">
                  Height (cm)
                </Label>
                <Input
                  className="max-w-2xl login-input p-4! py-6! mt-2"
                  placeholder="Enter your height in cm"
                  id="height"
                  type="number"
                  value={formData.height || ""}
                  min={100}
                  max={250}
                  onChange={(e) =>
                    updateField("height", Number(e.target.value))
                  }
                />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-center size-12 rounded-xl bg-mint-green-50 dark:bg-mint-green-900/10 border border-mint-green-100 dark:border-mint-green-800">
                  <Target className="size-6 text-mint-green-600 dark:text-mint-green-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold theme-text">
                    What's your goal?
                  </h2>
                  <p className="theme-text text-sm">
                    We"ll tailor your experience
                  </p>
                </div>
              </div>
              <div className="space-y-4 max-w-lg">
                {goalOptions.map((goal, index) => (
                  <Button
                    key={index}
                    className={cn(
                      "onboarding-option-btn py-5! rounded-sm!",
                      formData.goal === goal.value &&
                        "ring-2 ring-mint-green-500",
                    )}
                    onClick={() => handleWeight(goal.value)}
                  >
                    {goal.label}
                  </Button>
                ))}
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 my-6 max-w-lg" />

              <div className="space-y-8 max-w-lg">
                <h3 className="text-base font-semibold theme-text">
                  Daily Targets
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="theme-text">Daily Calorie Intake</Label>
                      <span className="theme-text font-semibold">
                        {formData.dailyCalorieIntake}
                      </span>
                    </div>
                    <Slider
                      min={120}
                      max={4000}
                      step={50}
                      value={[formData.dailyCalorieIntake]}
                      onValueChange={(value) =>
                        updateField("dailyCalorieIntake", value[0])
                      }
                      dir="ltr"
                    />
                  </div>
                  <div className="flex justify-between mb-2">
                    <Label className="theme-text">Daily Calorie Burn</Label>
                    <span className="theme-text font-semibold">
                      {formData.dailyCalorieBurn}
                    </span>
                  </div>
                  <Slider
                    min={100}
                    max={2000}
                    step={50}
                    value={[formData.dailyCalorieBurn]}
                    onValueChange={(value) =>
                      updateField("dailyCalorieBurn", value[0])
                    }
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className={cn(
            "mb-110 md:ml-110 md:mb-110 onboarding-wrapper",
            step === 2 && "md:mb-90",
            step === 3 && "md:mb-50",
          )}
        >
          <div className="max-w-xl md:max-w-176 flex gap-3 items-end justify-end">
            {step > 1 && (
              <Button
                className="px-8! py-6!"
                variant="secondary"
                onClick={() => setStep(step > 1 ? step - 1 : 1)}
              >
                {<ArrowLeft />} Back
              </Button>
            )}
            <Button
              className="bg-mint-green-800 hover:bg-mint-green-500 text-white px-4! py-6!"
              onClick={handleNext}
            >
              {step === totalSteps ? "Get Started" : "Continue"}
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingPage;
