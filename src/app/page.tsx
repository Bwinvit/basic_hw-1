import { getDb } from "@/lib/mongodb";
import HotelsTable from "./HotelsTable";

export default async function Home() {
  const db = await getDb();
  const hotels = await db.collection("hotels").find().toArray();
  const hotelsData = hotels.map((h) => ({
    _id: h._id.toString(),
    name: h.name,
    city: h.city,
  }));

  return (
    <div style={{ padding: "16px" }}>
      <h1 style={{ marginBottom: "16px" }}>Hotels</h1>
      <HotelsTable hotels={hotelsData} />
    </div>
  );
}
