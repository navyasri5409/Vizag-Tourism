
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pointsOfInterest, highLevelCategories } from "@/lib/data";
import { MapPin, ArrowRight } from "lucide-react";
import type { PointOfInterest, HighLevelCategory } from "@/lib/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";

const POIS_PER_PAGE = 9;

function PoiCard({ poi }: { poi: PointOfInterest }) {
  return (
    <Card className="overflow-hidden flex flex-col group h-full transition-shadow duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <Image
          src={poi.imageUrl}
          alt={poi.name}
          data-ai-hint={poi.imageHint}
          width={400}
          height={200}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-base font-bold leading-tight">{poi.name}</CardTitle>
          <Badge variant="outline" className="shrink-0 text-xs">{poi.category}</Badge>
        </div>
        <CardDescription className="flex items-center gap-2 pt-1 text-xs">
          <MapPin className="w-3 h-3" /> {poi.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">{poi.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
          <Button asChild variant="link" className="p-0 h-auto text-primary text-sm">
            <Link href={`/explore/${poi.id}`}>
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
      </CardFooter>
    </Card>
  );
}

function PaginatedPoiGrid({ pois }: { pois: PointOfInterest[] }) {
  const [visibleCount, setVisibleCount] = React.useState(POIS_PER_PAGE);

  const visiblePois = pois.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + POIS_PER_PAGE, pois.length));
  };
  
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visiblePois.map((poi) => (
          <PoiCard key={poi.id} poi={poi} />
        ))}
      </div>
      {visibleCount < pois.length && (
        <div className="text-center mt-12">
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      )}
    </>
  );
}


function FilterChips({
  categories,
  selectedCategory,
  onSelectCategory,
}: {
  categories: HighLevelCategory[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}) {
  return (
    <div className="flex justify-center mb-8">
        <ScrollArea className="w-full max-w-4xl whitespace-nowrap rounded-md">
            <div className="flex w-max space-x-2 p-2 mx-auto">
            {categories.map((category) => {
                const CategoryIcon = category.icon;
                return (
                <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => onSelectCategory(category.name)}
                >
                    {CategoryIcon && <CategoryIcon className="mr-2 h-4 w-4" />}
                    {category.name}
                </Button>
                );
            })}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    </div>
  );
}


export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredPois = useMemo(() => {
    if (activeCategory === "All") {
      return pointsOfInterest;
    }
    const selectedHighLevelCategory = highLevelCategories.find(c => c.name === activeCategory);
    if (!selectedHighLevelCategory) return [];

    const subCategories = new Set(selectedHighLevelCategory.subCategories);
    return pointsOfInterest.filter(poi => subCategories.has(poi.category));
  }, [activeCategory]);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter font-headline">
          Explore Visakhapatnam
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
          Discover sights, culture, and hidden gems of the City of Destiny.
        </p>
      </div>
      
      <FilterChips
        categories={highLevelCategories}
        selectedCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      
      <PaginatedPoiGrid key={JSON.stringify(filteredPois)} pois={filteredPois} />

    </div>
  );
}
