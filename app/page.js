import { getAllInventory } from "./service/InventoryRoutes";
import InventoryGrid from "./components/InventoryGrid"; // Client Component

export default async function Home() {
  const inventory = await getAllInventory(); // Fetch inventory on the server

  return <InventoryGrid inventory={inventory} />;
}