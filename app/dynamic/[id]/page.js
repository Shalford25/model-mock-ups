import { getInventoryById } from "../../service/InventoryRoutes";
import DynamicItem from "./DynamicItem"; // Client Component

export default async function DynamicPage({ params }) {
  const { id } = await params; // Await params to extract the ID
  const item = await getInventoryById(id); // Fetch the item details on the server

  if (!item) {
    return <p className="text-red-500">Item not found</p>;
  }

  return <DynamicItem item={item} />;
}