import { ID, Query } from 'appwrite';
import { account, databases } from './config';
import { SurveyData, User, AuthResponse } from '@/types';

const DATABASE_ID = 'YOUR_DATABASE_ID';
const COLLECTION_SURVEY = 'surveys';

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
            return await databases.createDocument(
                DATABASE_ID,
                COLLECTION_SURVEY,
                ID.unique(),
                {
                    ...data,
                    createdAt: new Date().toISOString(),
                }
            );
        },

        getUserSurvey: async (userId: string): Promise<SurveyData | null> => {
            try {
                const response = await databases.listDocuments(
                    DATABASE_ID,
                    COLLECTION_SURVEY,
                    [Query.equal('userId', userId)]
                );
                return response.documents[0] || null;
            } catch {
                return null;
            }
        },
    }
}; 