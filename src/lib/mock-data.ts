export const products = [
  { id: 1, name: "Maggi", category: "Snacks", price: 40, stock: 120, sold: 86, low: false, emoji: "🍜" },
  { id: 2, name: "Sandwich", category: "Snacks", price: 60, stock: 22, sold: 54, low: true, emoji: "🥪" },
  { id: 3, name: "Cold Coffee", category: "Beverage", price: 70, stock: 80, sold: 102, low: false, emoji: "🥤" },
  { id: 4, name: "Tea", category: "Beverage", price: 15, stock: 200, sold: 240, low: false, emoji: "☕" },
  { id: 5, name: "Patties", category: "Snacks", price: 35, stock: 18, sold: 70, low: true, emoji: "🥟" },
  { id: 6, name: "Burger", category: "Meals", price: 90, stock: 45, sold: 38, low: false, emoji: "🍔" },
  { id: 7, name: "Fries", category: "Snacks", price: 80, stock: 60, sold: 65, low: false, emoji: "🍟" },
  { id: 8, name: "Momos", category: "Meals", price: 70, stock: 12, sold: 95, low: true, emoji: "🥟" },
];

export const dailySales = [
  { day: "Mon", sales: 12400, orders: 180 },
  { day: "Tue", sales: 15200, orders: 210 },
  { day: "Wed", sales: 13800, orders: 195 },
  { day: "Thu", sales: 18600, orders: 245 },
  { day: "Fri", sales: 21400, orders: 290 },
  { day: "Sat", sales: 9800, orders: 140 },
  { day: "Sun", sales: 7400, orders: 105 },
];

export const topItems = products.slice(0, 6).map(p => ({ name: p.name, value: p.sold }));

export const hourlyDemand = [
  { hour: "8AM", value: 22 }, { hour: "10AM", value: 48 }, { hour: "12PM", value: 95 },
  { hour: "1PM", value: 88 }, { hour: "3PM", value: 40 }, { hour: "5PM", value: 62 },
  { hour: "7PM", value: 78 }, { hour: "9PM", value: 35 },
];

export const wasteData = [
  { name: "Consumed", value: 82, color: "var(--success)" },
  { name: "Wasted", value: 11, color: "var(--accent)" },
  { name: "Returned", value: 7, color: "var(--primary-glow)" },
];

export const weeklyWaste = [
  { day: "Mon", kg: 4.2 }, { day: "Tue", kg: 3.1 }, { day: "Wed", kg: 5.4 },
  { day: "Thu", kg: 2.8 }, { day: "Fri", kg: 6.1 }, { day: "Sat", kg: 1.9 }, { day: "Sun", kg: 1.2 },
];

export const orders = [
  { id: "#TC-1042", item: "Maggi + Tea", qty: 2, total: 55, status: "Completed", time: "2 min ago" },
  { id: "#TC-1041", item: "Burger + Fries + Coke", qty: 3, total: 220, status: "Pending", time: "4 min ago" },
  { id: "#TC-1040", item: "Cold Coffee", qty: 1, total: 70, status: "Completed", time: "6 min ago" },
  { id: "#TC-1039", item: "Momos (Steamed)", qty: 2, total: 140, status: "Cancelled", time: "9 min ago" },
  { id: "#TC-1038", item: "Sandwich + Tea", qty: 1, total: 75, status: "Completed", time: "11 min ago" },
  { id: "#TC-1037", item: "Patties x4", qty: 4, total: 140, status: "Pending", time: "14 min ago" },
  { id: "#TC-1036", item: "Maggi Special", qty: 1, total: 60, status: "Completed", time: "18 min ago" },
];

export const predictions = [
  { item: "Maggi", emoji: "🍜", forecast: 142, change: +18, confidence: 94 },
  { item: "Cold Coffee", emoji: "🥤", forecast: 128, change: +24, confidence: 91 },
  { item: "Momos", emoji: "🥟", forecast: 110, change: +9, confidence: 88 },
  { item: "Sandwich", emoji: "🥪", forecast: 78, change: -6, confidence: 85 },
  { item: "Tea", emoji: "☕", forecast: 260, change: +12, confidence: 96 },
  { item: "Burger", emoji: "🍔", forecast: 52, change: -3, confidence: 82 },
];

export const testimonials = [
  { name: "Rajesh Kumar", role: "Owner, A-Block Canteen", quote: "Cut my waste by 40% in just 3 weeks. The lunch rush forecast is scary accurate.", avatar: "RK" },
  { name: "Priya Sharma", role: "Manager, Cosmo Canteen", quote: "Knowing exactly how many Maggi packets to prep at 12PM changed everything.", avatar: "PS" },
  { name: "Mohit Singh", role: "Owner, Quark Cafe", quote: "Revenue up 28% this semester. The dashboard is faster than my POS.", avatar: "MS" },
];
