import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <div className="max-w-lg mx-auto flex gap-8 justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              cn("bottom-nav-link", isActive ? "bottom-nav-link-active" : "")
            }
          >
            {<item.icon className="size-5" />}
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
