export type WarmthLevel = 'cool' | 'medium' | 'warm' | 'extra-warm';
export type FillingType = 'down' | 'synthetic' | 'down-alternative' | 'wool' | 'bamboo';
export type Season = 'summer' | 'spring-autumn' | 'winter' | 'all-season';
export type SizeType = 'single' | 'double' | 'queen' | 'king';
export type AllergyFriendly = 'yes' | 'no' | 'hypoallergenic';

export interface Duvet {
  id: string;
  name: string;
  brand: string;
  price: number;
  currency: string;
  warmthLevel: WarmthLevel;
  fillingType: FillingType;
  season: Season;
  sizes: SizeType[];
  allergyFriendly: AllergyFriendly;
  washable: boolean;
  sustainability: {
    sustainable: boolean;
    certifications: string[];
  };
  description: string;
  features: string[];
  weight: number; // in grams
  threadCount: number;
  imageUrl: string;
  rating: number; // 1-5 stars
  reviewCount: number;
}

export interface UserPreferences {
  sleepTemperature?: 'cold' | 'warm' | 'hot';
  season?: Season;
  allergies?: boolean;
  budget?: 'low' | 'medium' | 'high';
  sustainability?: boolean;
}

export interface RecommendationReason {
  category: string;
  reason: string;
  match: boolean;
}

export interface DuvetRecommendation {
  duvet: Duvet;
  score: number;
  reasons: RecommendationReason[];
}

export interface ComparisonDifference {
  property: string;
  label: string;
  duvet1Value: string | number | boolean;
  duvet2Value: string | number | boolean;
  isDifferent: boolean;
}