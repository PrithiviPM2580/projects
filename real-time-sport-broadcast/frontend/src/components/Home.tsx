import { cn } from "@/lib/utils";
import Header from "./Header";
import { Button } from "./ui/button";
import useSocket from "@/hooks/useSocket";
import { useTheme } from "./ThemeProvider";
import { MoonIcon, SunIcon } from "lucide-react";
import Matches from "./Matches";
import Commentary from "./Commentary";

const Home = () => {
  const { isConnected, connect, disconnect } = useSocket();
  const { theme, setTheme } = useTheme();
  return (
    <section className="flex flex-col gap-10">
      <Header>
        <div className="w-full flex-between">
          <div className="fle flex-col gap-2">
            <h1 className="text-2xl font-semibold">Sportz</h1>
            <p className="text-sm">Real-time data demo</p>
          </div>
          <div className="flex gap-4">
            <Button
              className="btn bg-[#FEFEFE] border-0 rounded-full!"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button
              className="bg-[#FEFEFE]  btn font-semibold"
              onClick={() => (isConnected ? disconnect() : connect())}
            >
              <span
                className={cn(
                  "w-3 h-3 rounded-full",
                  isConnected ? "bg-green-500" : "bg-red-500",
                )}
              ></span>
              Live Connected
            </Button>
          </div>
        </div>
      </Header>
      <div className="flex gap-6">
        <Matches />
        <Commentary />
      </div>
    </section>
  );
};

export default Home;
