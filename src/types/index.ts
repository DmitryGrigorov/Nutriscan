/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
export interface User {
  $id: string;
  name: string;
  email: string;
  emailVerification: boolean;
}

export interface SurveyData {
  $id?: string;
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
  createdAt: string;
  updatedAt: string;
}
