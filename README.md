# Canteen Vision

Frontend dashboard for the Thapar Canteen Sales Optimizer. This app is built with Vite, TanStack Router, React, and a component-driven dashboard layout for sales, inventory, orders, predictions, and waste tracking.

## Run locally

```bash
npm install
npm run dev
```

Default local URL: http://localhost:8080

## API configuration

Create `.env` from `.env.example` and set:

```bash
VITE_CANTEEN_API_URL=http://127.0.0.1:8000
```

If the backend is remote (Render/Railway/Fly.io/VPS), set this to the deployed API URL.

## Deploy on Vercel

Deploy this repository (`canteen-vision`) on Vercel.

Set environment variable `VITE_CANTEEN_API_URL` in Vercel project settings to your deployed Python backend URL.

## Key links

- Workspace folder: [canteen-vision](.)
- Router setup: [src/router.tsx](src/router.tsx)
- Root layout: [src/routes/__root.tsx](src/routes/__root.tsx)
- Landing page: [src/routes/index.tsx](src/routes/index.tsx)
- Dashboard overview: [src/routes/dashboard.index.tsx](src/routes/dashboard.index.tsx)
- Sales analytics: [src/routes/dashboard.analytics.tsx](src/routes/dashboard.analytics.tsx)
- Inventory page: [src/routes/dashboard.inventory.tsx](src/routes/dashboard.inventory.tsx)
- Orders page: [src/routes/dashboard.orders.tsx](src/routes/dashboard.orders.tsx)
- Predictions page: [src/routes/dashboard.predictions.tsx](src/routes/dashboard.predictions.tsx)
- Waste tracking page: [src/routes/dashboard.waste.tsx](src/routes/dashboard.waste.tsx)
- Settings page: [src/routes/dashboard.settings.tsx](src/routes/dashboard.settings.tsx)

## Notes

The dashboard uses shared snapshot data from [src/hooks/useDashboardSnapshot.ts](src/hooks/useDashboardSnapshot.ts) and [src/lib/dashboard-api.ts](src/lib/dashboard-api.ts), with fallback data in [src/lib/mock-data.ts](src/lib/mock-data.ts).