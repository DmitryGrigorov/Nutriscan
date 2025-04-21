export type Gender = 'male' | 'female';

export type PregnancyStatus = 'pregnant' | 'breastfeeding' | 'none';
export type PregnancyTerm = 'first_trimester' | 'second_trimester' | 'third_trimester';
export type BreastfeedingTerm = 'early' | 'middle' | 'late';

export type MenstrualStatus = {
  isRegular: boolean;
  painLevel?: 'severe' | 'moderate' | 'none';
};

export type GynecologicalCondition = 'pcos' | 'endometriosis' | 'fibroids' | 'other' | 'none';
export type MenopauseStatus = 'premenopause' | 'menopause' | 'postmenopause' | 'none';

export type AgeGroup = 'under_18' | '18_30' | '31_45' | '46_60' | 'over_60';

export interface BodyMetrics {
  height: number;
  weight: number;
  bmi?: number;
}

export type ChronicCondition = {
  cardiovascular?: string[];
  gastrointestinal?: string[];
  endocrine?: string[];
  musculoskeletal?: string[];
  allergies?: string[];
};

export type Medication = {
  name: string;
  frequency: string;
  duration: string;
};

export type Lifestyle = {
  physicalActivity: 'low' | 'moderate' | 'high' | 'professional';
  diet: string[];
  foodFrequency: {
    fruits: string;
    fish: string;
    dairy: string;
    grains: string;
    redMeat: string;
  };
  alcohol: string;
  smoking: string;
  stress: string;
  sleep: {
    duration: string;
    quality: string[];
  };
};

export type Symptoms = {
  energy?: string[];
  mood?: string[];
  digestive?: string[];
  cardiovascular?: string[];
  musculoskeletal?: string[];
  skin?: string[];
  immune?: string[];
  other?: string[];
  duration: string;
};

export type Supplements = {
  current: string[];
  duration: string;
  effectiveness: string;
};

export type Goals = string[];

export interface SurveyState {
  step: number;
  gender: Gender | null;
  pregnancyStatus?: PregnancyStatus;
  pregnancyTerm?: PregnancyTerm;
  breastfeedingTerm?: BreastfeedingTerm;
  menstrualStatus?: MenstrualStatus;
  gynecologicalCondition?: GynecologicalCondition[];
  menopauseStatus?: MenopauseStatus;
  ageGroup: AgeGroup | null;
  bodyMetrics: BodyMetrics | null;
  chronicConditions: ChronicCondition;
  medications: Medication[];
  lifestyle: Lifestyle | null;
  symptoms: Symptoms | null;
  supplements: Supplements | null;
  goals: Goals;
}

// Модель данных опросника для отправки на сервер
export interface SurveySubmission {
  userId: string;
  completedAt: string;
  surveyData: Omit<SurveyState, 'step'>;
  recommendations?: string[];
  status: 'completed' | 'in_progress' | 'abandoned';
  version: string;
}

// Модель для хранения в базе данных
export interface SurveyRecord {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  surveyData: Omit<SurveyState, 'step'>;
  recommendations?: string[];
  status: 'completed' | 'in_progress' | 'abandoned';
  version: string;
}
