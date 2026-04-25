import { useEffect, useMemo, useRef, useState } from "react";
import { Bell, Check, Search } from "lucide-react";

type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
  unread: boolean;
};

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "n-1",
      title: "Low stock alert",
      detail: "Sandwich inventory is below threshold.",
      time: "2 min ago",
      unread: true,
    },
    {
      id: "n-2",
      title: "Forecast updated",
      detail: "Tomorrow demand forecast has been refreshed.",
      time: "14 min ago",
      unread: true,
    },
    {
      id: "n-3",
      title: "Model snapshot ready",
      detail: "Latest model metrics and visualizations are available.",
      time: "1 hr ago",
      unread: false,
    },
  ]);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const unreadCount = useMemo(
    () => notifications.reduce((count, item) => count + (item.unread ? 1 : 0), 0),
    [notifications],
  );

  useEffect(() => {
    if (!isNotificationsOpen) {
      return;
    }

    function onPointerDown(event: MouseEvent) {
      if (!panelRef.current?.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsNotificationsOpen(false);
      }
    }

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isNotificationsOpen]);

  function markAsRead(id: string) {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, unread: false } : item)));
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
  }

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background/80 backdrop-blur-xl px-4 lg:px-8 py-4">
      <div className="min-w-0">
        <h1 className="font-display text-xl lg:text-2xl font-bold text-foreground truncate">{title}</h1>
        {subtitle && <p className="text-xs lg:text-sm text-muted-foreground truncate">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 w-64">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search items, orders…" className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground" />
        </div>
        <div className="relative" ref={panelRef}>
          <button
            type="button"
            aria-label="Open notifications"
            onClick={() => setIsNotificationsOpen((prev) => !prev)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-secondary hover:bg-muted transition"
          >
            <Bell className="h-4.5 w-4.5 text-foreground" size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2.5 min-w-4 px-1 h-4 rounded-full bg-accent text-[10px] font-semibold text-white ring-2 ring-background flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-border bg-card shadow-card overflow-hidden z-40">
              <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                <p className="text-sm font-semibold text-foreground">Notifications</p>
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-xs text-accent hover:underline disabled:text-muted-foreground disabled:no-underline"
                  disabled={unreadCount === 0}
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => markAsRead(item.id)}
                    className="w-full text-left px-3 py-2.5 border-b last:border-b-0 border-border hover:bg-secondary/60 transition"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                        <p className="text-[11px] text-muted-foreground mt-1">{item.time}</p>
                      </div>
                      {item.unread ? (
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" />
                      ) : (
                        <Check className="mt-1 h-3.5 w-3.5 text-success" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-orange text-sm font-bold text-white shadow-glow">AS</div>
      </div>
    </header>
  );
}
