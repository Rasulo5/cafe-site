import MenuManager from "@/components/admin/MenuManager";
import { menu } from "@/data/menu";

export default function AdminMenuPage() {
  return <MenuManager initialMenu={menu} />;
}