// src/app/(main)/page.tsx
import ExploreCardClient from "./ExploreCardClient";
import { pointsOfInterest } from "@/lib/data";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Explore Visakhapatnam</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {pointsOfInterest.map((poi) => (
          <ExploreCardClient key={poi.id} poi={poi} />
        ))}
      </div>
    </main>
  );
}
