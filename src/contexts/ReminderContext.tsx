'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Reminder {
  id: string;
  title: string;
  datetime: string;
  type: 'supplement' | 'analysis';
  completed: boolean;
}

interface ReminderContextType {
  reminders: Reminder[];
  unreadCount: number;
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  markAsRead: (id: string) => void;
  markAsCompleted: (id: string) => void;
  deleteReminder: (id: string) => void;
}

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export function ReminderProvider({ children }: { children: React.ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  // Загрузка напоминаний при входе пользователя
  useEffect(() => {
    if (user) {
      // TODO: Загрузка напоминаний из API
      const sampleReminders: Reminder[] = [
        {
          id: '1',
          title: 'Прием витамина D',
          datetime: new Date().toISOString(),
          type: 'supplement',
          completed: false,
        },
        {
          id: '2',
          title: 'Сдать анализ крови',
          datetime: new Date(Date.now() + 86400000).toISOString(), // завтра
          type: 'analysis',
          completed: false,
        },
      ];
      setReminders(sampleReminders);
      setUnreadCount(sampleReminders.length);
    }
  }, [user]);

  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    const newReminder = {
      ...reminder,
      id: Math.random().toString(36).substr(2, 9),
    };
    setReminders(prev => [...prev, newReminder]);
    setUnreadCount(prev => prev + 1);
  };

  const markAsRead = (id: string) => {
    const reminder = reminders.find(r => r.id === id);
    if (reminder && !reminder.completed) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const markAsCompleted = (id: string) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id ? { ...reminder, completed: true } : reminder
      )
    );
    markAsRead(id);
  };

  const deleteReminder = (id: string) => {
    const reminder = reminders.find(r => r.id === id);
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
    if (reminder && !reminder.completed) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        unreadCount,
        addReminder,
        markAsRead,
        markAsCompleted,
        deleteReminder,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
}

export function useReminders() {
  const context = useContext(ReminderContext);
  if (context === undefined) {
    throw new Error('useReminders must be used within a ReminderProvider');
  }
  return context;
} 