import type { LucideIcon } from "lucide-react";

export type PointOfInterestCategory = 'Temple' | 'Beach' | 'Museum' | 'Food' | 'Heritage' | 'Park' | 'Nature' | 'Leisure' | 'Excursion' | 'Church' | 'Shopping' | 'Aquarium' | 'Wildlife';

export type PointOfInterest = {
  id: string;
  name: string;
  category: PointOfInterestCategory;
  description: string;
  longDescription: string;
  imageUrl: string;
  imageHint: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: string;
  fee: string;
  etiquette?: string;
};

export type NavItem = {
  href: string;
  label:string;
  icon: LucideIcon;
};

export type Event = {
  id: string;
  name: string;
  date: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type HighLevelCategory = {
  name: string;
  icon: LucideIcon;
  subCategories: PointOfInterestCategory[] | [];
};
