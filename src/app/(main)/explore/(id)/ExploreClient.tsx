"use client";

import './explore.css';

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Heart,
  Headphones,
  Clock,
  IndianRupee,
  MapPin,
  Compass,
  AlertTriangle
} from "lucide-react";
import { categories } from "@/lib/data";
import type { PointOfInterest } from "@/lib/types";
import "./explore.css"; // Only import CSS here

export default function ExploreClient({ poi }: { poi: PointOfInterest }) {
  const CategoryIcon = categories[poi.category]?.icon || Compass;

  return (
    <div className="flex flex-col flex-1 bg-muted/20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-end text-white">
        <Image src={poi.imageUrl} alt={poi.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="relative container mx-auto px-4 md:px-6 py-8">
          <Badge variant="secondary" className="mb-2">{poi.category}</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-2 text-shadow-lg font-headline">
            {poi.name}
          </h1>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="bg-white/10 border-white/20 backdrop-blur-sm">
              <Heart className="mr-2" /> Save to Favorites
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/20 backdrop-blur-sm" disabled>
              <Headphones className="mr-2" /> Audio Guide
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold font-headline mb-4">Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{poi.longDescription}</p>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-headline">
                  <CategoryIcon /> Key Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-muted-foreground">{poi.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <p className="font-semibold">Hours</p>
                    <p className="text-muted-foreground">{poi.hours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <IndianRupee className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <p className="font-semibold">Entry Fee</p>
                    <p className="text-muted-foreground">{poi.fee}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {poi.etiquette && (
              <Card className="mt-8 bg-amber-50 border-amber-200">
                <CardHeader className="flex flex-row items-center gap-4">
                  <AlertTriangle className="w-8 h-8 text-amber-500" />
                  <div>
                    <CardTitle className="text-amber-900">Cultural Etiquette</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-800">{poi.etiquette}</p>
                </CardContent>
              </Card>
            )}

            <h2 className="text-2xl font-bold font-headline mt-12 mb-4">Explore Nearby</h2>
            <div className="text-center p-8 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">
                AI-powered nearby and similar place suggestions are coming soon!
              </p>
            </div>
          </div>

          <div className="md:col-span-1 space-y-6">
            <div className="p-8 border-2 border-dashed rounded-lg text-center">
              <p className="text-muted-foreground">Map will be shown here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
