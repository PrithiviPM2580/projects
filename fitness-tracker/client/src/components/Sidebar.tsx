import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import { MoonIcon, PersonStandingIcon, SunIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import useTheme from "@/hooks/useTheme";

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <aside className="sidebar-aside">
      <header className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-xl bg-mint-green-500 flex-center">
          <PersonStandingIcon className="size-7 text-white" />
        </div>
        <h1 className="text-2xl font-semibold theme-text">FitTrack</h1>
      </header>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              cn("sidebar-nav", isActive ? "sidebar-nav-active" : "")
            }
          >
            <item.icon className="size-5" />
            <span className="text-base">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t theme-border w-full">
        <Button onClick={toggleTheme} className="sidebar-them w-full">
          {theme === "light" ? (
            <MoonIcon className="size-5" />
          ) : (
            <SunIcon className="size-5" />
          )}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
