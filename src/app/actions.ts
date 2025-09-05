
"use server";

import {
  generatePersonalizedDayPlan,
  type GeneratePersonalizedDayPlanInput,
  type GeneratePersonalizedDayPlanOutput,
} from "@/ai/flows/generate-personalized-day-plan";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export interface PlannerState {
  data: GeneratePersonalizedDayPlanOutput | null;
  error: string | null;
}

export async function getDayPlan(
  prevState: PlannerState,
  formData: FormData
): Promise<PlannerState> {
  const input: GeneratePersonalizedDayPlanInput = {
    interests: formData.get("interests") as string,
    timeConstraints: formData.get("timeConstraints") as string,
    modeOfTransport: formData.get("modeOfTransport") as string,
  };

  if (!input.interests || !input.timeConstraints || !input.modeOfTransport) {
    return { data: null, error: "Please fill out all fields." };
  }
  
  try {
    const result = await generatePersonalizedDayPlan(input);
    return { data: result, error: null };
  } catch (error) {
    console.error("Error generating day plan:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      data: null,
      error: `Failed to generate a plan. ${errorMessage}. Please try again later.`,
    };
  }
}

export async function updateProfile(prevState: { error: string | null }, formData: FormData) {
  const user = auth.currentUser;
  if (!user) {
    return { error: "You must be logged in to update your profile." };
  }
  
  const displayName = formData.get("displayName") as string;
  if (!displayName) {
    return { error: "Name cannot be empty." };
  }

  try {
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      displayName: displayName,
    });
    revalidatePath('/profile');
    return { error: null };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { error: "Failed to update profile. Please try again." };
  }
}
