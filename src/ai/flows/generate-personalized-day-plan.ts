'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a personalized day plan for exploring Vizag.
 *
 * The flow takes user interests, time constraints, and mode of transport as input and returns a structured day plan.
 * @exports generatePersonalizedDayPlan - The main function to trigger the day plan generation flow.
 * @exports GeneratePersonalizedDayPlanInput - The input type for the generatePersonalizedDayPlan function.
 * @exports GeneratePersonalizedDayPlanOutput - The output type for the generatePersonalizedDayPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedDayPlanInputSchema = z.object({
  interests: z
    .string()
    .describe(
      'A comma-separated list of the user interests, e.g., beaches, temples, food.'
    ),
  timeConstraints: z
    .string()
    .describe(
      'The time constraints for the day plan, e.g., 9 AM to 5 PM, full day, half day.'
    ),
  modeOfTransport: z
    .string()
    .describe(
      'The mode of transport the user will be using, e.g., car, bus, taxi, walking.'
    ),
});
export type GeneratePersonalizedDayPlanInput = z.infer<
  typeof GeneratePersonalizedDayPlanInputSchema
>;

const GeneratePersonalizedDayPlanOutputSchema = z.object({
  title: z.string().describe('The title of the day plan.'),
  description: z.string().describe('A brief description of the day plan.'),
  schedule: z.array(
    z.object({
      time: z.string().describe('The time of the activity.'),
      activity: z.string().describe('The activity for that time slot.'),
      location: z.string().describe('The location of the activity.'),
      transportDetails: z
        .string()
        .describe('Details of transport, if needed, to get to next location.'),
    })
  ),
});
export type GeneratePersonalizedDayPlanOutput = z.infer<
  typeof GeneratePersonalizedDayPlanOutputSchema
>;

export async function generatePersonalizedDayPlan(
  input: GeneratePersonalizedDayPlanInput
): Promise<GeneratePersonalizedDayPlanOutput> {
  return generatePersonalizedDayPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedDayPlanPrompt',
  input: {schema: GeneratePersonalizedDayPlanInputSchema},
  output: {schema: GeneratePersonalizedDayPlanOutputSchema},
  prompt: `You are an expert travel assistant specializing in Vizag tourism.

Based on the user's interests, time constraints, and mode of transport, generate a personalized day plan for exploring Vizag.

Interests: {{{interests}}}
Time Constraints: {{{timeConstraints}}}
Mode of Transport: {{{modeOfTransport}}}

Consider the distances between locations and provide transport details.

Output should be formatted as a JSON object matching this schema:
${JSON.stringify(GeneratePersonalizedDayPlanOutputSchema.describe())}`,
});

const generatePersonalizedDayPlanFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedDayPlanFlow',
    inputSchema: GeneratePersonalizedDayPlanInputSchema,
    outputSchema: GeneratePersonalizedDayPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
