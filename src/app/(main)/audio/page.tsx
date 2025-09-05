import { Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AudioPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-muted/40 p-4">
       <Card className="max-w-md text-center">
            <CardContent className="p-8">
                <Headphones className="h-16 w-16 mx-auto text-primary mb-4" />
                <h1 className="text-2xl font-bold mb-2 font-headline">Audio Guides Coming Soon</h1>
                <p className="text-muted-foreground">
                    Immerse yourself in the stories of Visakhapatnam with our upcoming audio guides.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
