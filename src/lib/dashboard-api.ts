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

export interface VisualizationAsset {
  key: string;
  title: string;
  description: string;
  filename: string;
  imageUrl: string;
}

export interface ModelDiagnosticPoint {
  day: string;
  date: string;
  actual: number;
  predicted: number;
}

export interface ResidualPoint {
  predicted: number;
  residual: number;
}

export interface FeatureImportancePoint {
  name: string;
  value: number;
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
  modelDiagnostics: {
    actualVsPredicted: ModelDiagnosticPoint[];
    residuals: ResidualPoint[];
    featureImportances: FeatureImportancePoint[];
  };
  visualizations: {
    items: VisualizationAsset[];
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

function getFallbackVisualizationAssets(): VisualizationAsset[] {
  const base = [
    {
      key: "salesOverTime",
      title: "Sales Over Time",
      description: "Daily revenue trend with rolling average.",
      filename: "sales_over_time.png",
    },
    {
      key: "actualVsPredicted",
      title: "Actual vs Predicted",
      description: "Model fit against held-out test data.",
      filename: "actual_vs_predicted.png",
    },
    {
      key: "residuals",
      title: "Residual Diagnostics",
      description: "Error spread and residual behavior.",
      filename: "residuals.png",
    },
    {
      key: "featureImportances",
      title: "Feature Importances",
      description: "Relative influence of model features.",
      filename: "feature_importances.png",
    },
  ];

  return base.map((item) => ({
    ...item,
    imageUrl: toApiUrl(`/api/visualizations/${item.filename}`),
  }));
}

function normalizeVisualizationAssets(
  items: Array<{ key: string; title: string; description: string; filename: string }> | undefined,
): VisualizationAsset[] {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return getFallbackVisualizationAssets();
  }

  return items.map((item) => ({
    ...item,
    imageUrl: toApiUrl(`/api/visualizations/${item.filename}`),
  }));
}

function getFallbackModelDiagnostics(): DashboardSnapshot["modelDiagnostics"] {
  const actualVsPredicted = fallbackDailySales.map((point, index) => {
    const adjustment = index % 2 === 0 ? 0.92 : 1.07;
    const predicted = Math.round(point.sales * adjustment);
    return {
      day: point.day,
      date: `2026-04-${String(index + 20).padStart(2, "0")}`,
      actual: point.sales,
      predicted,
    };
  });

  return {
    actualVsPredicted,
    residuals: actualVsPredicted.map((point) => ({
      predicted: point.predicted,
      residual: Math.round(point.actual - point.predicted),
    })),
    featureImportances: [
      { name: "dem_lag_1", value: 0.31 },
      { name: "sales_rolling_7", value: 0.24 },
      { name: "temperature", value: 0.16 },
      { name: "day_of_week", value: 0.11 },
      { name: "is_weekend", value: 0.08 },
      { name: "month", value: 0.06 },
      { name: "is_peak_hour", value: 0.04 },
    ],
  };
}

function normalizePredictions(
  predictions: Partial<DashboardSnapshot["predictions"]> | undefined,
  fallback: DashboardSnapshot["predictions"],
): DashboardSnapshot["predictions"] {
  const rawCards = Array.isArray((predictions as { cards?: unknown[] } | undefined)?.cards)
    ? ((predictions as { cards?: unknown[] }).cards ?? [])
    : [];
  const cards = rawCards
    .filter((card) => Boolean(card && typeof card === "object"))
    .map((card, index) => {
          const safeCard = card as Partial<PredictionCard>;
          const fallbackCard = fallback.cards[index % fallback.cards.length];
          return {
            item: typeof safeCard.item === "string" ? safeCard.item : fallbackCard.item,
            emoji: typeof safeCard.emoji === "string" ? safeCard.emoji : fallbackCard.emoji,
            forecast: Number.isFinite(safeCard.forecast) ? Number(safeCard.forecast) : fallbackCard.forecast,
            change: Number.isFinite(safeCard.change) ? Number(safeCard.change) : fallbackCard.change,
            confidence: Number.isFinite(safeCard.confidence) ? Number(safeCard.confidence) : fallbackCard.confidence,
          };
        });

  const rawTrend = Array.isArray((predictions as { trend?: unknown[] } | undefined)?.trend)
    ? ((predictions as { trend?: unknown[] }).trend ?? [])
    : [];
  const trend = rawTrend
    .filter((point) => Boolean(point && typeof point === "object"))
    .map((point, index) => {
          const safePoint = point as Partial<DailySalesPoint>;
          const fallbackPoint = fallback.trend[index % fallback.trend.length];
          return {
            day: typeof safePoint.day === "string" ? safePoint.day : fallbackPoint.day,
            sales: Number.isFinite(safePoint.sales) ? Number(safePoint.sales) : fallbackPoint.sales,
            orders: Number.isFinite(safePoint.orders) ? Number(safePoint.orders) : fallbackPoint.orders,
          };
        });

  return {
    headline: typeof predictions?.headline === "string" ? predictions.headline : fallback.headline,
    cards: cards.length > 0 ? cards : fallback.cards,
    trend: trend.length > 0 ? trend : fallback.trend,
  };
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
    modelDiagnostics: getFallbackModelDiagnostics(),
    visualizations: {
      items: getFallbackVisualizationAssets(),
    },
  };
}

export async function fetchDashboardSnapshotFromApi(signal?: AbortSignal): Promise<DashboardSnapshot> {
  const response = await fetch(toApiUrl("/api/dashboard"), { signal });
  if (!response.ok) {
    throw new Error(`Dashboard API returned ${response.status}`);
  }

  const fallback = fallbackDashboardSnapshot();

  const snapshot = (await response.json()) as Omit<DashboardSnapshot, "source" | "visualizations" | "modelDiagnostics"> & {
    visualizations?: { items?: Array<{ key: string; title: string; description: string; filename: string }> };
    modelDiagnostics?: DashboardSnapshot["modelDiagnostics"];
  };

  return {
    source: "api",
    generatedAt: typeof snapshot.generatedAt === "string" ? snapshot.generatedAt : fallback.generatedAt,
    overview: { ...fallback.overview, ...(snapshot.overview ?? {}) },
    analytics: {
      dailySales: Array.isArray(snapshot.analytics?.dailySales) ? snapshot.analytics.dailySales : fallback.analytics.dailySales,
      topItems: Array.isArray(snapshot.analytics?.topItems) ? snapshot.analytics.topItems : fallback.analytics.topItems,
      hourlyDemand: Array.isArray(snapshot.analytics?.hourlyDemand) ? snapshot.analytics.hourlyDemand : fallback.analytics.hourlyDemand,
      wasteData: Array.isArray(snapshot.analytics?.wasteData) ? snapshot.analytics.wasteData : fallback.analytics.wasteData,
    },
    inventory: {
      products: Array.isArray(snapshot.inventory?.products) ? snapshot.inventory.products : fallback.inventory.products,
    },
    predictions: normalizePredictions(snapshot.predictions, fallback.predictions),
    waste: {
      summary: { ...fallback.waste.summary, ...(snapshot.waste?.summary ?? {}) },
      weeklyWaste: Array.isArray(snapshot.waste?.weeklyWaste) ? snapshot.waste.weeklyWaste : fallback.waste.weeklyWaste,
      wastedItems: Array.isArray(snapshot.waste?.wastedItems) ? snapshot.waste.wastedItems : fallback.waste.wastedItems,
      tips: Array.isArray(snapshot.waste?.tips) ? snapshot.waste.tips : fallback.waste.tips,
    },
    orders: {
      orders: Array.isArray(snapshot.orders?.orders) ? snapshot.orders.orders : fallback.orders.orders,
    },
    settings: { ...fallback.settings, ...(snapshot.settings ?? {}) },
    model: {
      ...fallback.model,
      ...(snapshot.model ?? {}),
      r2: Number.isFinite(snapshot.model?.r2) ? Number(snapshot.model?.r2) : fallback.model.r2,
    },
    modelDiagnostics: snapshot.modelDiagnostics ?? fallback.modelDiagnostics,
    visualizations: {
      items: normalizeVisualizationAssets(snapshot.visualizations?.items),
    },
  };
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