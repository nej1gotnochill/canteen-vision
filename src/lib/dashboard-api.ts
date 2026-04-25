import {
  dailySales as fallbackDailySales,
  hourlyDemand as fallbackHourlyDemand,
  orders as fallbackOrders,
  predictions as fallbackPredictions,
  products as fallbackProducts,
  testimonials,
  topItems as fallbackTopItems,
  wasteData as fallbackWasteData,
  weeklyWaste as fallbackWeeklyWaste,
} from "@/lib/mock-data";

export interface DashboardProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  low: boolean;
  emoji: string;
}

export interface DailySalesPoint {
  day: string;
  sales: number;
  orders: number;
}

export interface PredictionCard {
  item: string;
  emoji: string;
  forecast: number;
  change: number;
  confidence: number;
}

export interface DashboardSnapshot {
  source: "api" | "fallback";
  generatedAt: string;
  overview: {
    todayRevenue: number;
    ordersCompleted: number;
    lowStockAlerts: number;
    peakTraffic: number;
    predictedTomorrowSales: number;
    growth: number;
  };
  analytics: {
    dailySales: DailySalesPoint[];
    topItems: { name: string; value: number }[];
    hourlyDemand: { hour: string; value: number }[];
    wasteData: { name: string; value: number; color: string }[];
  };
  inventory: { products: DashboardProduct[] };
  predictions: {
    headline: string;
    cards: PredictionCard[];
    trend: DailySalesPoint[];
  };
  waste: {
    summary: {
      thisWeekWaste: number;
      savedVsLastWeek: number;
      wasteCost: number;
      itemsFlagged: number;
    };
    weeklyWaste: { day: string; kg: number }[];
    wastedItems: { name: string; qty: number; reason: string; emoji: string }[];
    tips: string[];
  };
  orders: {
    orders: { id: string; item: string; qty: number; total: number; status: string; time: string }[];
  };
  settings: {
    canteenName: string;
    owner: string;
    location: string;
    operatingHours: string;
    planPrice: number;
  };
  model: {
    name: string;
    mae: number;
    mse: number;
    rmse: number;
    r2: number;
  };
}

const configuredApiBaseUrl = import.meta.env.VITE_CANTEEN_API_URL?.trim();
const API_BASE_URL = configuredApiBaseUrl
  ? configuredApiBaseUrl.replace(/\/+$/, "")
  : import.meta.env.DEV
    ? "http://127.0.0.1:8000"
    : "";

function toApiUrl(path: string): string {
  return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
}

export function fallbackDashboardSnapshot(): DashboardSnapshot {
  return {
    source: "fallback",
    generatedAt: new Date().toISOString(),
    overview: {
      todayRevenue: 18420,
      ordersCompleted: 245,
      lowStockAlerts: 3,
      peakTraffic: 95,
      predictedTomorrowSales: 21800,
      growth: 18,
    },
    analytics: {
      dailySales: fallbackDailySales,
      topItems: fallbackTopItems,
      hourlyDemand: fallbackHourlyDemand,
      wasteData: fallbackWasteData,
    },
    inventory: { products: fallbackProducts },
    predictions: {
      headline: "Expected ~310 orders between 12-2 PM tomorrow",
      cards: fallbackPredictions,
      trend: fallbackDailySales,
    },
    waste: {
      summary: {
        thisWeekWaste: 24.7,
        savedVsLastWeek: 8.4,
        wasteCost: 1240,
        itemsFlagged: 4,
      },
      weeklyWaste: fallbackWeeklyWaste,
      wastedItems: [
        { name: "Sandwich", qty: 12, reason: "Expired", emoji: "🥪" },
        { name: "Patties", qty: 8, reason: "Unused", emoji: "🥟" },
        { name: "Cold Coffee", qty: 5, reason: "Returned", emoji: "🥤" },
        { name: "Burger Buns", qty: 9, reason: "Expired", emoji: "🍔" },
      ],
      tips: [
        "Reduce Sandwich prep by 20% on Mondays — historically low demand.",
        "Move Patties to combo offers near 3 PM to clear inventory.",
        "Brew Cold Coffee in smaller batches (5 cups) instead of 15.",
      ],
    },
    orders: { orders: fallbackOrders },
    settings: {
      canteenName: "A-Block Canteen",
      owner: "Aman Sharma",
      location: "Thapar University, Patiala",
      operatingHours: "8:00 AM - 10:00 PM",
      planPrice: 999,
    },
    model: {
      name: "GradientBoostingRegressor",
      mae: 0,
      mse: 0,
      rmse: 0,
      r2: 0,
    },
  };
}

export async function fetchDashboardSnapshotFromApi(signal?: AbortSignal): Promise<DashboardSnapshot> {
  const response = await fetch(toApiUrl("/api/dashboard"), { signal });
  if (!response.ok) {
    throw new Error(`Dashboard API returned ${response.status}`);
  }

  const snapshot = (await response.json()) as Omit<DashboardSnapshot, "source">;
  return { ...snapshot, source: "api" };
}

export async function fetchDashboardSnapshot(signal?: AbortSignal): Promise<DashboardSnapshot> {
  try {
    return await fetchDashboardSnapshotFromApi(signal);
  } catch {
    return fallbackDashboardSnapshot();
  }
}

export async function fetchPrediction(signal?: AbortSignal, temperature?: number) {
  const params = new URLSearchParams();
  if (temperature !== undefined) {
    params.set("temperature", String(temperature));
  }

  const query = params.toString();
  const url = `${toApiUrl("/api/predict")}${query ? `?${query}` : ""}`;

  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error(`Prediction API returned ${response.status}`);
    }

    return (await response.json()) as { predictedSales: number; temperature?: number; model: string };
  } catch {
    return { predictedSales: 21800, model: "GradientBoostingRegressor" };
  }
}

export { testimonials };