"use client";
import "./explore.css";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Headphones, Clock, IndianRupee, MapPin, Compass, AlertTriangle } from "lucide-react";
import { categories } from "@/lib/data";
import type { PointOfInterest } from "@/lib/types";

export default function ExploreClient({ poi }: { poi: PointOfInterest }) {
  const CategoryIcon = categories[poi.category]?.icon || Compass;

  return (
    <div className="flex flex-col flex-1 bg-muted/20 explore-container">
      {/* Your full UI code goes here */}
    </div>
  );
}


