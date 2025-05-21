'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  Button,
  Form,
  Input,
  Select,
  Space,
  Typography,
  Divider,
  message,
  Modal,
  Radio,
  Checkbox,
  Switch,
  InputNumber,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Question {
  id: string;
  type: 'text' | 'single' | 'multiple' | 'scale';
  text: string;
  required: boolean;
  options?: string[];
  min?: number;
  max?: number;
}

interface Survey {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export default function SurveyEditorPage() {
  const params = useParams();
  const router = useRouter();
  const surveyId = Number(params.id);

  const [survey, setSurvey] = useState<Survey | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [questionForm] = Form.useForm();

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSurvey({
        id: surveyId,
        title: 'Опрос о витаминах',
        description: 'Выяснение потребностей в витаминах',
        questions: [
          {
            id: '1',
            type: 'text',
            text: 'Какие витамины вы принимаете в настоящее время?',
            required: true,
          },
          {
            id: '2',
            type: 'single',
            text: 'Как часто вы принимаете витамины?',
            required: true,
            options: ['Ежедневно', 'Несколько раз в неделю', 'Редко', 'Никогда'],
          },
          {
            id: '3',
            type: 'multiple',
            text: 'Какие проблемы со здоровьем вы хотите решить с помощью витаминов?',
            required: false,
            options: ['Иммунитет', 'Энергия', 'Кожа', 'Волосы', 'Ногти', 'Другое'],
          },
          {
            id: '4',
            type: 'scale',
            text: 'Насколько вы довольны своим текущим здоровьем?',
            required: true,
            min: 1,
            max: 10,
          },
        ],
      });
      setIsLoading(false);
    }, 500);
  }, [surveyId]);

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    questionForm.resetFields();
    setIsQuestionModalVisible(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    questionForm.setFieldsValue(question);
    setIsQuestionModalVisible(true);
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (!survey) return;

    setSurvey({
      ...survey,
      questions: survey.questions.filter((q) => q.id !== questionId),
    });
    message.success('Вопрос удален');
  };

  const handleMoveQuestion = (fromIndex: number, toIndex: number) => {
    if (!survey) return;

    const newQuestions = [...survey.questions];
    const [movedQuestion] = newQuestions.splice(fromIndex, 1);
    newQuestions.splice(toIndex, 0, movedQuestion);

    setSurvey({
      ...survey,
      questions: newQuestions,
    });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const fromIndex = result.source.index;
    const toIndex = result.destination.index;

    handleMoveQuestion(fromIndex, toIndex);
  };

  const handleSaveQuestion = () => {
    questionForm.validateFields().then((values) => {
      if (!survey) return;

      const newQuestion: Question = {
        id: editingQuestion?.id || Date.now().toString(),
        ...values,
      };

      let newQuestions: Question[];

      if (editingQuestion) {
        // Update existing question
        newQuestions = survey.questions.map((q) => (q.id === editingQuestion.id ? newQuestion : q));
      } else {
        // Add new question
        newQuestions = [...survey.questions, newQuestion];
      }

      setSurvey({
        ...survey,
        questions: newQuestions,
      });

      setIsQuestionModalVisible(false);
      message.success(editingQuestion ? 'Вопрос обновлен' : 'Вопрос добавлен');
    });
  };

  const handleSaveSurvey = () => {
    // In a real app, this would save to an API
    message.success('Опрос сохранен');
    router.push('/admin/surveys');
  };

  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case 'text':
        return <Input placeholder="Текстовый ответ" disabled />;

      case 'single':
        return (
          <Radio.Group disabled>
            {question.options?.map((option, index) => (
              <Radio key={index} value={option}>
                {option}
              </Radio>
            ))}
          </Radio.Group>
        );

      case 'multiple':
        return (
          <Checkbox.Group disabled>
            {question.options?.map((option, index) => (
              <Checkbox key={index} value={option}>
                {option}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );

      case 'scale':
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {Array.from({ length: (question.max || 10) - (question.min || 1) + 1 }, (_, i) => (
              <Radio key={i} disabled value={i + (question.min || 1)} />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!survey) {
    return <div>Опрос не найден</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={2}>{survey.title}</Title>
        <Button type="primary" icon={<SaveOutlined />} onClick={handleSaveSurvey}>
          Сохранить опрос
        </Button>
      </div>

      <Text>{survey.description}</Text>

      <Divider />

      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddQuestion}>
          Добавить вопрос
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {survey.questions.map((question, index) => (
                <Draggable key={question.id} draggableId={question.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card
                        style={{ marginBottom: 16 }}
                        title={
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <Text strong>Вопрос {index + 1}</Text>
                            <Space>
                              <Button
                                icon={<ArrowUpOutlined />}
                                disabled={index === 0}
                                onClick={() => handleMoveQuestion(index, index - 1)}
                              />
                              <Button
                                icon={<ArrowDownOutlined />}
                                disabled={index === survey.questions.length - 1}
                                onClick={() => handleMoveQuestion(index, index + 1)}
                              />
                              <Button
                                icon={<EditOutlined />}
                                onClick={() => handleEditQuestion(question)}
                              />
                              <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDeleteQuestion(question.id)}
                              />
                            </Space>
                          </div>
                        }
                      >
                        <div style={{ marginBottom: 16 }}>
                          <Text strong>{question.text}</Text>
                          {question.required && <Text type="danger"> *</Text>}
                        </div>

                        {renderQuestionPreview(question)}
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Modal
        title={editingQuestion ? 'Редактировать вопрос' : 'Добавить вопрос'}
        open={isQuestionModalVisible}
        onOk={handleSaveQuestion}
        onCancel={() => setIsQuestionModalVisible(false)}
        width={600}
      >
        <Form form={questionForm} layout="vertical">
          <Form.Item
            name="text"
            label="Текст вопроса"
            rules={[{ required: true, message: 'Пожалуйста, введите текст вопроса' }]}
          >
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="type"
            label="Тип вопроса"
            rules={[{ required: true, message: 'Пожалуйста, выберите тип вопроса' }]}
          >
            <Select>
              <Option value="text">Текстовый ответ</Option>
              <Option value="single">Один ответ</Option>
              <Option value="multiple">Несколько ответов</Option>
              <Option value="scale">Шкала</Option>
            </Select>
          </Form.Item>

          <Form.Item name="required" label="Обязательный" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
          >
            {({ getFieldValue }) => {
              const type = getFieldValue('type');

              if (type === 'single' || type === 'multiple') {
                return (
                  <Form.Item
                    name="options"
                    label="Варианты ответов"
                    rules={[{ required: true, message: 'Пожалуйста, добавьте варианты ответов' }]}
                  >
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Введите вариант и нажмите Enter"
                    >
                      {editingQuestion?.options?.map((option, index) => (
                        <Option key={index} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                );
              }

              if (type === 'scale') {
                return (
                  <>
                    <Form.Item name="min" label="Минимальное значение" initialValue={1}>
                      <InputNumber min={0} max={100} />
                    </Form.Item>
                    <Form.Item name="max" label="Максимальное значение" initialValue={10}>
                      <InputNumber min={1} max={100} />
                    </Form.Item>
                  </>
                );
              }

              return null;
            }}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
