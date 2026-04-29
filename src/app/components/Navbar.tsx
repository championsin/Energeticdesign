import { User, Bell, Settings, LogOut, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface NavbarProps {
  currentRole: "employee" | "recruiter";
  onRoleSwitch: (role: "employee" | "recruiter") => void;
}

export function Navbar({ currentRole, onRoleSwitch }: NavbarProps) {
  const [notifications] = useState(3);
  const [showRoleSwitch, setShowRoleSwitch] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b-4 border-accent"
    >
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h1
              className="uppercase tracking-tighter text-foreground cursor-pointer"
              style={{ fontSize: "2rem", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em" }}
              onClick={() => onRoleSwitch(currentRole)}
            >
              CHAMPIONS
            </h1>
            <span className="text-accent" style={{ fontSize: "1.5rem", fontWeight: 900 }}>
              *
            </span>
          </div>

          <div className="flex items-center gap-1">
            <NavButton icon={<Bell size={20} />} label="Notifications" badge={notifications} />
            <div className="relative">
              <motion.button
                onMouseEnter={() => setShowRoleSwitch(true)}
                onMouseLeave={() => setShowRoleSwitch(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label="Profile"
              >
                <User size={20} />
              </motion.button>
              {showRoleSwitch && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  onMouseEnter={() => setShowRoleSwitch(true)}
                  onMouseLeave={() => setShowRoleSwitch(false)}
                  className="absolute top-full right-0 mt-2 bg-secondary border-2 border-accent overflow-hidden"
                  style={{ minWidth: "200px" }}
                >
                  <div className="p-3 border-b border-border">
                    <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "var(--muted-foreground)" }}>
                      CURRENT ROLE
                    </span>
                    <div style={{ fontFamily: "monospace", fontSize: "0.8rem", fontWeight: 700, marginTop: "4px" }}>
                      {currentRole.toUpperCase()}
                    </div>
                  </div>
                  <button
                    onClick={() => onRoleSwitch(currentRole === "employee" ? "recruiter" : "employee")}
                    className="w-full p-3 flex items-center gap-3 hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <RefreshCw size={16} />
                    <span style={{ fontFamily: "monospace", fontSize: "0.75rem", fontWeight: 700 }}>
                      SWITCH TO {currentRole === "employee" ? "RECRUITER" : "EMPLOYEE"}
                    </span>
                  </button>
                </motion.div>
              )}
            </div>
            <NavButton icon={<Settings size={20} />} label="Settings" />
            <div className="w-px h-8 bg-border mx-2" />
            <NavButton icon={<LogOut size={20} />} label="Sign Out" variant="destructive" />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  badge?: number;
  variant?: "default" | "destructive";
}

function NavButton({ icon, label, badge, variant = "default" }: NavButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative p-3 transition-colors ${
        variant === "destructive"
          ? "hover:bg-destructive hover:text-destructive-foreground"
          : "hover:bg-accent hover:text-accent-foreground"
      }`}
      aria-label={label}
    >
      {icon}
      {badge !== undefined && badge > 0 && (
        <div
          className="absolute -top-1 -right-1 bg-accent text-accent-foreground min-w-[20px] h-5 flex items-center justify-center"
          style={{ fontFamily: "monospace", fontSize: "0.65rem", fontWeight: 900 }}
        >
          {badge > 99 ? "99+" : badge}
        </div>
      )}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full right-0 mt-2 bg-secondary border-2 border-accent px-3 py-1 whitespace-nowrap"
        >
          <span style={{ fontFamily: "monospace", fontSize: "0.7rem" }}>{label}</span>
        </motion.div>
      )}
    </motion.button>
  );
}
