export type SupplementType =
  | 'multivitamins'
  | 'vitaminD'
  | 'omega3'
  | 'calciumMagnesium'
  | 'probiotics'
  | 'iron'
  | 'proteinBCAA'
  | 'herbalExtracts'
  | 'other';

export type SupplementDuration =
  | 'lessThanMonth'
  | 'oneToThreeMonths'
  | 'threeToTwelveMonths'
  | 'moreThanYear';

export type SupplementEffectiveness = 'significant' | 'moderate' | 'none' | 'negative';

export type SupplementGoal =
  | 'energy'
  | 'immunity'
  | 'digestion'
  | 'jointsBones'
  | 'skinHairNails'
  | 'sleep'
  | 'cardiovascular'
  | 'cognitive'
  | 'weightLoss'
  | 'muscleGain'
  | 'stressMood'
  | 'prevention'
  | 'other';

export type SupplementConcern =
  | 'medicationInteraction'
  | 'sideEffects'
  | 'quality'
  | 'effectiveness'
  | 'overdose'
  | 'none';

export type MedicalCheckupFrequency = 'yearly' | 'everyTwoThreeYears' | 'asNeeded' | 'rarely';

export type BloodTestType = 'both' | 'general' | 'none';

export type BloodTestAbnormality =
  | 'anemia'
  | 'dyslipidemia'
  | 'hyperglycemia'
  | 'liver'
  | 'kidney'
  | 'vitaminD'
  | 'other'
  | 'none';

export interface SupplementsSurveyState {
  takesSupplements: boolean;
  currentSupplements: SupplementType[];
  otherSupplements?: string;
  supplementDuration?: SupplementDuration;
  supplementEffectiveness?: SupplementEffectiveness;
  supplementGoals: SupplementGoal[];
  otherGoals?: string;
  supplementConcerns: SupplementConcern[];
  medicalCheckupFrequency: MedicalCheckupFrequency;
  bloodTests: BloodTestType;
  bloodTestAbnormalities?: BloodTestAbnormality[];
  otherAbnormalities?: string;
}
