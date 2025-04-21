import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://appwrite-todonotes.ru/v1')
    .setProject('6805cd4b003e02c899e8');

export const account = new Account(client);
export const databases = new Databases(client);

export { client }; 