
"use client"
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Sun } from "lucide-react";
import { pointsOfInterest, events } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const quickTrails = [
  { label: "Temple Trail", icon: "🛕", description: "Visit ancient and sacred temples." },
  { label: "Beach Day", icon: "🏖️", description: "Relax on sun-kissed golden sands." },
  { label: "Family Fun", icon: "👨‍👩‍👧‍👦", description: "Create memories with loved ones." },
  { label: "History Buff", icon: "🏛️", description: "Explore the rich heritage of Vizag." },
];

function WeatherWidget() {
    return (
      <div className="absolute top-4 right-4 bg-background/30 backdrop-blur-sm p-3 rounded-xl flex items-center gap-3 text-white border border-white/20">
        <Sun className="w-8 h-8" />
        <div>
          <p className="font-bold text-xl">29°C</p>
          <p className="text-xs">Partly Cloudy</p>
        </div>
      </div>
    );
}


export default function HomePage() {
  const featuredPois = pointsOfInterest.slice(0, 8);
  const featuredEvents = events;

  return (
    <div className="flex flex-col flex-1 bg-muted/20">
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
        <Image
          src="https://www.indiatravel.app/wp-content/uploads/2024/03/places-to-visit-in-visakhapatnam.jpg"
          alt="Scenic view of Visakhapatnam"
          data-ai-hint="scenic coast"
          fill
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 -z-10"></div>
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-shadow-lg font-headline">
            Welcome to Visakhapatnam
          </h1>
          <div className="max-w-2xl mx-auto md:text-xl mb-8 text-shadow">
            <p>Your ultimate AI guide to the City of Destiny.</p>
          </div>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/planner">
              <Sparkles className="mr-2 h-5 w-5" />
              Plan Your Perfect Day
            </Link>
          </Button>
        </div>
        <WeatherWidget />
      </section>
      
      <section id="quick-trails" className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter font-headline">
              Quick Trails
            </h2>
             <div className="max-w-2xl mx-auto mt-2 text-lg text-muted-foreground">
              <p>Explore curated trails for a perfect day out.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {quickTrails.map((trail) => (
              <Link href="/planner" key={trail.label} className="block hover:no-underline">
                <Card className="text-center items-center flex flex-col justify-center p-4 hover:bg-card/80 hover:shadow-lg transition-all duration-200 h-full">
                  <CardContent className="flex flex-col items-center justify-center flex-grow p-2">
                      <div className="text-4xl mb-2">{trail.icon}</div>
                      <h3 className="font-bold">{trail.label}</h3>
                      <div className="text-xs text-muted-foreground mt-1">{trail.description}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="explore" className="py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 font-headline text-center">
            Featured Sights
          </h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredPois.map((poi) => (
                <CarouselItem key={poi.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="p-1 h-full">
                    <Card className="overflow-hidden flex flex-col h-full group">
                       <Image
                        src={poi.imageUrl}
                        alt={poi.name}
                        data-ai-hint={poi.imageHint}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <CardHeader>
                        <CardTitle>{poi.name}</CardTitle>
                        <Badge variant="outline" className="w-fit">{poi.category}</Badge>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {poi.description}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="link" className="text-primary p-0 h-auto">
                          <Link href={`/explore/${poi.id}`}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex"/>
            <CarouselNext className="hidden md:flex"/>
          </Carousel>
          <div className="text-center mt-8">
              <Button asChild>
                <Link href="/explore">Explore All Sights</Link>
              </Button>
            </div>
        </div>
      </section>

      <section id="events" className="bg-muted py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 font-headline text-center">
            Festivals & Events
          </h2>
           <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
            {featuredEvents.map((event) => (
               <CarouselItem key={event.id} className="md:basis-1/2 lg:basis/1/3">
                 <div className="p-1 h-full">
                  <Card key={event.id} className="flex flex-col h-full">
                    <CardHeader className="flex flex-row items-start gap-4">
                      <Image
                        src={event.imageUrl}
                        alt={event.name}
                        data-ai-hint={event.imageHint}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover w-24 h-24"
                      />
                      <div>
                        <CardTitle>{event.name}</CardTitle>
                        <CardDescription>{event.date}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm line-clamp-3">{event.description}</p>
                    </CardContent>
                     <CardFooter>
                        <Button variant="outline" size="sm" disabled>Learn More</Button>
                    </CardFooter>
                  </Card>
                  </div>
                </CarouselItem>
            ))}
            </CarouselContent>
             <CarouselPrevious className="hidden md:flex"/>
            <CarouselNext className="hidden md:flex"/>
          </Carousel>
        </div>
      </section>
    </div>
  );
}
