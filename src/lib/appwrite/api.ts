/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { ID, Query } from 'appwrite';
import { account, databases } from './config';
import {
  SurveyData,
  User,
  AuthResponse,
  UserProfile,
  SurveyFormData,
  HealthAssessmentFormData,
  NutritionHabitsFormData,
} from '@/types';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
const COLLECTION_SURVEY = process.env.NEXT_PUBLIC_APPWRITE_SURVEY_COLLECTION_ID || '';
const COLLECTION_USERS = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || '';

export const appwriteApi = {
  // Аутентификация
  auth: {
    register: async (email: string, password: string, name: string): Promise<AuthResponse> => {
      const user = await account.create(ID.unique(), email, password, name);
      const session = await account.createEmailSession(email, password);
      return { user, session };
    },

    login: async (email: string, password: string): Promise<AuthResponse> => {
      const session = await account.createEmailSession(email, password);
      const user = await account.get();
      return { user, session };
    },

    logout: async (): Promise<void> => {
      await account.deleteSession('current');
    },

    getCurrentUser: async (): Promise<User | null> => {
      try {
        return await account.get();
      } catch {
        return null;
      }
    },
  },

  // Опросы
  surveys: {
    create: async (data: Omit<SurveyData, '$id' | 'createdAt'>): Promise<SurveyData> => {
      return (await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
        process.env.NEXT_PUBLIC_APPWRITE_SURVEY_COLLECTION_ID || '',
        ID.unique(),
        {
          ...data,
          createdAt: new Date().toISOString(),
        }
      )) as unknown as SurveyData;
    },

    getUserSurvey: async (userId: string): Promise<SurveyData | null> => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
          process.env.NEXT_PUBLIC_APPWRITE_SURVEY_COLLECTION_ID || '',
          [Query.equal('userId', userId)]
        );
        return (response.documents[0] || null) as unknown as SurveyData | null;
      } catch {
        return null;
      }
    },

    saveUserProfileSurvey: async (data: SurveyFormData) => {
      const response = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_SURVEYS_COLLECTION_ID!,
        ID.unique(),
        {
          ...data,
          userId: (await account.get()).$id,
          createdAt: new Date().toISOString(),
        }
      );
      return response;
    },

    saveHealthAssessment: async (data: HealthAssessmentFormData) => {
      const response = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_SURVEYS_COLLECTION_ID!,
        ID.unique(),
        {
          ...data,
          userId: (await account.get()).$id,
          type: 'health-assessment',
          createdAt: new Date().toISOString(),
        }
      );
      return response;
    },

    saveNutritionHabits: async (data: NutritionHabitsFormData) => {
      const response = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_SURVEYS_COLLECTION_ID!,
        ID.unique(),
        {
          ...data,
          userId: (await account.get()).$id,
          type: 'nutrition-habits',
          createdAt: new Date().toISOString(),
        }
      );
      return response;
    },
  },

  // User Profile Management
  profile: {
    create: async (
      userId: string,
      data: Omit<UserProfile, '$id' | 'userId' | 'createdAt' | 'updatedAt'>
    ): Promise<UserProfile> => {
      return (await databases.createDocument(DATABASE_ID, COLLECTION_USERS, ID.unique(), {
        ...data,
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })) as unknown as UserProfile;
    },

    update: async (
      userId: string,
      data: Partial<Omit<UserProfile, '$id' | 'userId' | 'createdAt' | 'updatedAt'>>
    ): Promise<UserProfile> => {
      const profile = await appwriteApi.profile.get(userId);
      if (!profile) {
        throw new Error('Profile not found');
      }

      return (await databases.updateDocument(DATABASE_ID, COLLECTION_USERS, profile.$id, {
        ...data,
        updatedAt: new Date().toISOString(),
      })) as unknown as UserProfile;
    },

    get: async (userId: string): Promise<UserProfile | null> => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_USERS, [
          Query.equal('userId', userId),
        ]);
        console.log({ response });
        return (response.documents[0] || null) as unknown as UserProfile | null;
      } catch {
        return null;
      }
    },
  },
};
