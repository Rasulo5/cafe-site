import AdminShell from "@/components/admin/AdminShell";
import { orders } from "@/data/orders";
import { reviews } from "@/data/reviews";

export const metadata = {
  title: "Админ-панель — Тёплый Уголок",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  const badges = {
    orders: orders.filter((o) => o.status === "new").length,
    reviews: reviews.filter((r) => r.status === "pending").length,
  };

  return <AdminShell badges={badges}>{children}</AdminShell>;
}
