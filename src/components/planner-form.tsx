
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { getDayPlan } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { AlertCircle, Bot, Clock, Sparkles, TramFront } from "lucide-react";
import type { GeneratePersonalizedDayPlanOutput } from "@/ai/flows/generate-personalized-day-plan";

const initialState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Sparkles className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          Generate Plan <Bot className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

function PlanDisplay({ plan }: { plan: GeneratePersonalizedDayPlanOutput }) {
  return (
     <Card className="bg-background/50">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{plan.title}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {plan.schedule.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                  {index + 1}
                </div>
                {index < plan.schedule.length - 1 && (
                  <div className="w-px flex-1 bg-border my-2"></div>
                )}
              </div>
              <div className="flex-1 pb-6 min-w-0">
                 <div className="font-semibold text-lg break-words">{item.activity}</div>
                 <div className="text-sm text-muted-foreground flex items-center gap-2 break-words"><Clock className="w-3 h-3 shrink-0"/>{item.time} at {item.location}</div>
                 {item.transportDetails && (
                    <div className="text-sm mt-2 flex items-start gap-2 text-primary/80 break-words"><TramFront className="w-4 h-4 mt-0.5 shrink-0"/>{item.transportDetails}</div>
                 )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function PlannerForm() {
  const [state, formAction] = useActionState(getDayPlan, initialState);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <form action={formAction}>
            <CardHeader>
              <CardTitle>Create Your Itinerary</CardTitle>
              <CardDescription>
                Tell us your preferences, and we'll craft a personalized day plan
                for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Input
                  id="interests"
                  name="interests"
                  placeholder="e.g., beaches, temples, food"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeConstraints">Available Time</Label>
                <Select name="timeConstraints" required>
                  <SelectTrigger id="timeConstraints">
                    <SelectValue placeholder="Select your available time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="half day (4-5 hours)">Half Day (4-5 hours)</SelectItem>
                    <SelectItem value="full day (8-10 hours)">Full Day (8-10 hours)</SelectItem>
                    <SelectItem value="evening (6 PM - 10 PM)">Evening (6 PM - 10 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="modeOfTransport">Transport</Label>
                <Select name="modeOfTransport" required>
                  <SelectTrigger id="modeOfTransport">
                    <SelectValue placeholder="Select your mode of transport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="taxi/ride-sharing">Taxi / Ride-sharing</SelectItem>
                    <SelectItem value="public transport (bus)">Public Transport (Bus)</SelectItem>
                    <SelectItem value="walking">Walking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>
      </div>
      <div className="md:col-span-2">
        {state.error && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )}

        {state.data ? (
          <PlanDisplay plan={state.data} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-border rounded-lg p-8 text-center bg-card">
            <Bot className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your AI-Generated Plan Awaits</h3>
            <p className="text-muted-foreground">Fill in your preferences on the left to see your personalized Vizag adventure.</p>
          </div>
        )}
      </div>
    </div>
  );
}
