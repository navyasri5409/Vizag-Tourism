
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Map } from "lucide-react";

export default function MapPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-muted/40 p-4">
       <Card className="max-w-md text-center">
            <CardContent className="p-8">
                <Map className="h-16 w-16 mx-auto text-primary mb-4" />
                <h1 className="text-2xl font-bold mb-2 font-headline">Interactive Map Coming Soon</h1>
                <p className="text-muted-foreground">
                    We're working on an interactive map to help you navigate Visakhapatnam with ease.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
