import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Briefcase,
  FileText,
  Mail,
  Menu,
  X,
  Terminal,
} from "lucide-react";
import { GlitchText } from "../animations/GlitchText";

const navItems = [
  { path: "/", label: "home", icon: Home, command: "~/" },
  { path: "/about", label: "about", icon: User, command: "~/about" },
  {
    path: "/portfolio",
    label: "projects",
    icon: Briefcase,
    command: "~/projects",
  },
  { path: "/blog", label: "blog", icon: FileText, command: "~/blog" },
  { path: "/contact", label: "contact", icon: Mail, command: "~/contact" },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-card border border-border rounded lg:hidden"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary" />
        ) : (
          <Menu className="w-6 h-6 text-primary" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-sidebar-background border-r border-sidebar-border z-40 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2">
              <Terminal className="w-8 h-8 text-primary" />
              <div>
                {location.pathname === "/" ? (
                  <h1>
                    <GlitchText
                      text="ABENEZER"
                      className="text-lg font-bold text-primary"
                      glitchOnHover
                    />
                  </h1>
                ) : (
                  <div>
                    <GlitchText
                      text="ABENEZER"
                      className="text-lg font-bold text-primary"
                      glitchOnHover
                    />
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  software_engineer
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <div className="text-xs text-muted-foreground mb-4">
              // NAVIGATION
            </div>
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded transition-all duration-200 group ${
                        isActive
                          ? "bg-primary/20 text-primary border-l-2 border-primary"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-mono text-sm">
                        <span className="text-muted-foreground group-hover:text-primary">
                          ${" "}
                        </span>
                        {item.command}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Status */}
          <div className="mt-auto pt-6 border-t border-sidebar-border">
            <div className="text-xs text-muted-foreground mb-2">// STATUS</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-muted-foreground">
                Available for work
              </span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground font-mono">
              v1.0.0 | © 2024
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
