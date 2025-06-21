import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

export async function getNextProductId() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }

  const db = client.db();

  const result = await db.collection("counters").findOneAndUpdate(
    { _id: "productid" },
    { $inc: { sequence_value: 1 } },
    {
      upsert: true,
      returnDocument: "after", // Or use returnOriginal: false for older MongoDB driver
    }
  );

  const nextId = result?.sequence_value;

  if (typeof nextId !== "number") {
    console.error("Unexpected counter result:", result);
    throw new Error("Failed to retrieve next product ID.");
  }

  return nextId;
}
