import { PlannerForm } from "@/components/planner-form";

export default function PlannerPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter font-headline">
          Smart Day Planner
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
          Let our AI craft the perfect day in Visakhapatnam just for you.
        </p>
      </div>
      <PlannerForm />
    </div>
  );
}
