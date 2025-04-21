'use client';

import React, { useState } from 'react';
import { Button, message, Modal, Result } from 'antd';
import { useSurvey } from '@/contexts/SurveyContext';
import { useAuth } from '@/contexts/AuthContext';
import { surveyService } from '@/services/surveyService';

export const SurveySubmit: React.FC = () => {
  const { state } = useSurvey();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      message.error('Необходимо авторизоваться для сохранения результатов');
      return;
    }

    try {
      setLoading(true);

      // Создаем копию состояния без поля step
      const { step, ...surveyData } = state;
      console.log(step);

      // Отправляем данные на сервер
      await surveyService.createSurvey(user.$id, surveyData);

      setShowSuccess(true);
    } catch (error) {
      console.error('Ошибка при сохранении опросника:', error);
      message.error('Не удалось сохранить результаты опросника');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        onClick={handleSubmit}
        loading={loading}
        className="w-full"
      >
        Сохранить результаты
      </Button>

      <Modal title="Результаты сохранены" open={showSuccess} onCancel={handleClose} footer={null}>
        <Result
          status="success"
          title="Опросник успешно сохранен"
          subTitle="Ваши ответы были сохранены в вашем личном кабинете"
          extra={[
            <Button type="primary" key="console" onClick={handleClose}>
              Закрыть
            </Button>,
          ]}
        />
      </Modal>
    </>
  );
};
