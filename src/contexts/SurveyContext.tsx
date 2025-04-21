'use client';

import React, { createContext, useContext, useReducer } from 'react';
import {
  SurveyState,
  Gender,
  PregnancyStatus,
  AgeGroup,
  BodyMetrics,
  ChronicCondition,
  Lifestyle,
  Symptoms,
  Supplements,
  Goals,
  PregnancyTerm,
  BreastfeedingTerm,
} from '@/types/survey';

type SurveyAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_GENDER'; payload: Gender }
  | { type: 'SET_PREGNANCY_STATUS'; payload: PregnancyStatus }
  | { type: 'SET_AGE_GROUP'; payload: AgeGroup }
  | { type: 'SET_PREGNANCY_TERM'; payload: PregnancyTerm }
  | { type: 'SET_BREASTFEEDING_TERM'; payload: BreastfeedingTerm }
  | { type: 'SET_BODY_METRICS'; payload: BodyMetrics }
  | { type: 'SET_CHRONIC_CONDITIONS'; payload: Partial<ChronicCondition> }
  | { type: 'SET_LIFESTYLE'; payload: Partial<Lifestyle> }
  | { type: 'SET_SYMPTOMS'; payload: Partial<Symptoms> }
  | { type: 'SET_SUPPLEMENTS'; payload: Partial<Supplements> }
  | { type: 'SET_GOALS'; payload: Goals };

const initialState: SurveyState = {
  step: 0,
  gender: null,
  ageGroup: null,
  pregnancyStatus: undefined,
  pregnancyTerm: undefined,
  breastfeedingTerm: undefined,
  bodyMetrics: null,
  chronicConditions: {},
  medications: [],
  lifestyle: null,
  symptoms: null,
  supplements: null,
  goals: [],
};

const SurveyContext = createContext<{
  state: SurveyState;
  dispatch: React.Dispatch<SurveyAction>;
} | null>(null);

function surveyReducer(state: SurveyState, action: SurveyAction): SurveyState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SET_GENDER':
      return { ...state, gender: action.payload };
    case 'SET_PREGNANCY_STATUS':
      return { ...state, pregnancyStatus: action.payload };
    case 'SET_AGE_GROUP':
      return { ...state, ageGroup: action.payload };
    case 'SET_PREGNANCY_TERM':
      return { ...state, pregnancyTerm: action.payload };
    case 'SET_BREASTFEEDING_TERM':
      return { ...state, breastfeedingTerm: action.payload };
    case 'SET_BODY_METRICS':
      return { ...state, bodyMetrics: action.payload };
    case 'SET_CHRONIC_CONDITIONS':
      return {
        ...state,
        chronicConditions: { ...state.chronicConditions, ...action.payload },
      };
    case 'SET_LIFESTYLE':
      return {
        ...state,
        lifestyle: { ...(state.lifestyle || {}), ...action.payload } as Lifestyle,
      };
    case 'SET_SYMPTOMS':
      return {
        ...state,
        symptoms: { ...(state.symptoms || {}), ...action.payload } as Symptoms,
      };
    case 'SET_SUPPLEMENTS':
      return {
        ...state,
        supplements: { ...(state.supplements || {}), ...action.payload } as Supplements,
      };
    case 'SET_GOALS':
      return { ...state, goals: action.payload };
    default:
      return state;
  }
}

export function SurveyProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(surveyReducer, initialState);

  return <SurveyContext.Provider value={{ state, dispatch }}>{children}</SurveyContext.Provider>;
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
}
