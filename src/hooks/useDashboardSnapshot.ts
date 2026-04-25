import { useEffect, useState } from "react";
import { DashboardSnapshot, fetchDashboardSnapshotFromApi, fallbackDashboardSnapshot } from "@/lib/dashboard-api";

export function useDashboardSnapshot() {
  const [snapshot, setSnapshot] = useState<DashboardSnapshot>(() => fallbackDashboardSnapshot());

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    const pollSnapshot = async () => {
      try {
        const nextSnapshot = await fetchDashboardSnapshotFromApi(controller.signal);
        if (active) {
          setSnapshot(nextSnapshot);
        }
      } catch {
        // Keep the current snapshot visible and try again shortly.
      }

      if (active) {
        window.setTimeout(pollSnapshot, 5000);
      }
    };

    void pollSnapshot();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return snapshot;
}