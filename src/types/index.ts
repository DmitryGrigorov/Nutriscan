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