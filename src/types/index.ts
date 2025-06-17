/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
export interface User {
  $id: string;
  name: string;
  email: string;
  emailVerification: boolean;
}

export interface SurveyData {
  $id: string;
  userId: string;
  age: number;
  gender: 'male' | 'female';
  goal: 'weight-loss' | 'muscle-gain' | 'maintenance';
  activityLevel: 'sedentary' | 'moderate' | 'active' | 'very-active';
  createdAt: Date;
}

export interface AuthResponse {
  user: User;
  session: any;
}

export interface UserProfile {
  $id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  weight: number;
  height: number;
  valuesJSON?: string[];
  notesJSON?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SurveyFormData {
  age: number;
  gender: 'male' | 'female';
  goal: 'weight-loss' | 'muscle-gain' | 'maintenance';
  activityLevel: 'sedentary' | 'moderate' | 'active' | 'very-active';
  education: 'higher' | 'secondary';
  location: string;
  lifestyle: {
    healthyLifestyle: boolean;
    selfDevelopment: boolean;
    healthValues: boolean;
    longevityValues: boolean;
  };
  onlineActivity: {
    healthResearch: boolean;
    supplementsResearch: boolean;
  };
  buyingHabits: {
    regularPurchases: boolean;
    trustReviews: boolean;
    trustExperts: boolean;
  };
  painPoints: {
    lackOfTime: boolean;
    difficultyChoosing: boolean;
    overwhelmedByChoice: boolean;
    tooManyPills: boolean;
  };
}

export interface HealthAssessmentFormData {
  generalHealth: 'excellent' | 'good' | 'fair' | 'poor';
  chronicConditions: string[];
  medications: string;
  allergies: string;
  sleepQuality: 'excellent' | 'good' | 'fair' | 'poor';
  stressLevel: 'low' | 'medium' | 'high';
  energyLevel: 'high' | 'medium' | 'low';
  physicalActivity: 'daily' | 'weekly' | 'monthly' | 'rarely';
  healthGoals: string[];
  additionalInfo: string;
}

export interface NutritionHabitsFormData {
  eatingSchedule: 'regular' | 'irregular' | 'skipsMeals';
  mealFrequency: number;
  breakfast: 'always' | 'sometimes' | 'rarely' | 'never';
  lunch: 'always' | 'sometimes' | 'rarely' | 'never';
  dinner: 'always' | 'sometimes' | 'rarely' | 'never';
  snacks: 'frequent' | 'occasional' | 'rare' | 'never';
  waterIntake: 'adequate' | 'insufficient' | 'excessive';
  foodPreferences: string[];
  dietaryRestrictions: string[];
  cookingHabits: 'home' | 'takeout' | 'mixed';
  additionalInfo: string;
}
