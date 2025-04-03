
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BookOpen, Bookmark, MessageCircle, Flame } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/karma", label: "Karma", icon: Flame },
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/profile", label: "Profile", icon: BookOpen },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around py-2">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center p-2 ${
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`
          }
        >
          <Icon size={20} />
          <span className="text-xs mt-1">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
