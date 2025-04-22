import { ID, Query } from 'appwrite';
import { databases } from '@/lib/appwrite';
import { SurveySubmission, SurveyRecord, SurveyState } from '@/types/survey';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
const SURVEYS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_SURVEYS_COLLECTION_ID || '';

export const surveyService = {
  // Создание нового опросника
  async createSurvey(userId: string, data: SurveyFormData): Promise<SurveyData> {
    const now = new Date().toISOString();

    const surveyData: SurveyData = {
      ...data,
      id: ID.unique(),
      userId,
      status: 'completed',
      createdAt: now,
      updatedAt: now,
    };

    const response = await databases.createDocument(
      DATABASE_ID,
      SURVEYS_COLLECTION_ID,
      ID.unique(),
      surveyData
    );

    return response as unknown as SurveyData;
  },

  // Получение опросника по ID
  async getSurveyById(surveyId: string): Promise<SurveyData> {
    const response = await databases.getDocument(DATABASE_ID, SURVEYS_COLLECTION_ID, surveyId);

    return response as unknown as SurveyData;
  },

  // Получение всех опросников пользователя
  async getUserSurveys(userId: string): Promise<SurveyRecord[]> {
    const response = await databases.listDocuments(DATABASE_ID, SURVEYS_COLLECTION_ID, [
      Query.equal('userId', userId),
    ]);

    return response.documents.map((doc) => ({
      id: doc.$id,
      userId: doc.userId,
      createdAt: doc.$createdAt,
      updatedAt: doc.$updatedAt,
      completedAt: doc.completedAt,
      surveyData: doc,
      recommendations: doc.recommendations,
      status: doc.status,
      version: doc.version,
    }));
  },

  // Получение последнего опросника пользователя
  async getLatestUserSurvey(userId: string): Promise<SurveyRecord | null> {
    const response = await databases.listDocuments(DATABASE_ID, SURVEYS_COLLECTION_ID, [
      Query.equal('userId', userId),
      Query.orderDesc('$createdAt'),
      Query.limit(1),
    ]);

    if (response.documents.length === 0) {
      return null;
    }

    const doc = response.documents[0];
    return {
      id: doc.$id,
      userId: doc.userId,
      createdAt: doc.$createdAt,
      updatedAt: doc.$updatedAt,
      completedAt: doc.completedAt,
      surveyData: doc.surveyData,
      recommendations: doc.recommendations,
      status: doc.status,
      version: doc.version,
    };
  },

  // Обновление опросника
  async updateSurvey(
    surveyId: string,
    surveyData: Partial<SurveySubmission>
  ): Promise<SurveyRecord> {
    const response = await databases.updateDocument(
      DATABASE_ID,
      SURVEYS_COLLECTION_ID,
      surveyId,
      surveyData
    );

    return {
      id: response.$id,
      userId: response.userId,
      createdAt: response.$createdAt,
      updatedAt: response.$updatedAt,
      completedAt: response.completedAt,
      surveyData: response.surveyData,
      recommendations: response.recommendations,
      status: response.status,
      version: response.version,
    };
  },

  // Удаление опросника
  async deleteSurvey(surveyId: string): Promise<void> {
    await databases.deleteDocument(DATABASE_ID, SURVEYS_COLLECTION_ID, surveyId);
  },

  async getSurveysByUser(userId: string): Promise<SurveyData[]> {
    const response = await databases.listDocuments(DATABASE_ID, SURVEYS_COLLECTION_ID, [
      // Add query to filter by userId
      // Add sorting by createdAt
    ]);

    return response.documents as unknown as SurveyData[];
  },
};
