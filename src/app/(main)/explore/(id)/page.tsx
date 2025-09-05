// page.tsx
import { notFound } from 'next/navigation';
import { pointsOfInterest } from '@/lib/data';
import type { PointOfInterest } from '@/lib/types';
import ExploreClient from './ExploreClient';

export default function LocationDetailsPage({ params }: { params: { id: string } }) {
  const poi: PointOfInterest | undefined = pointsOfInterest.find(
    (p) => p.id === params.id
  );

  if (!poi) notFound();

  return <ExploreClient poi={poi} />;
}
