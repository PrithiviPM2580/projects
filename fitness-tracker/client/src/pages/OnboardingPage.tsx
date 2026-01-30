import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAppContext from "@/hooks/useAppContext";
import { cn } from "@/lib/utils";
import { type ProfileFormData } from "@/types";
import { PersonStanding, User } from "lucide-react";
import { useState } from "react";

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  // const { user, setOnboardingCompleted, fetchUser } = useAppContext();
  const [formData, setFormData] = useState<ProfileFormData>({
    age: 0,
    weight: 0,
    height: 0,
    goal: "maintain",
    dailyCalorieIntake: 2000,
    dailyCalorieBurn: 400,
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
  return (
    <>
      <div className="onboarding-container">
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
                value={formData.age}
                min={13}
                max={120}
                onChange={(e) => updateField("age", Number(e.target.value))}
                placeholder="Enter your age"
                required
              />
            </div>
          )}
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
                value={formData.age}
                min={13}
                max={120}
                onChange={(e) => updateField("age", Number(e.target.value))}
                placeholder="Enter your age"
                required
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OnboardingPage;
