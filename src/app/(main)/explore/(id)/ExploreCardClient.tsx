"use client";
import "./exploreCard.css";
import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PointOfInterest } from "@/lib/types";

export default function ExploreCardClient({ poi }: { poi: PointOfInterest }) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader>
        <CardTitle>{poi.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image src={poi.imageUrl} alt={poi.name} width={300} height={200} />
        <p className="mt-2 text-sm text-muted-foreground">{poi.shortDescription}</p>
      </CardContent>
    </Card>
  );
}
