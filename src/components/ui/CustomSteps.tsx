import React from 'react';
import styles from './CustomSteps.module.css';

export interface StepItem {
  title: string;
  key?: string | number;
}

interface CustomStepsProps {
  current: number;
  items: StepItem[];
  direction?: 'horizontal' | 'vertical';
  size?: 'default' | 'small';
  className?: string;
}

export const CustomSteps: React.FC<CustomStepsProps> = ({
  current,
  items,
  direction = 'vertical',
  size = 'default',
  className,
}) => {
  const getStepStatus = (index: number) => {
    if (index < current) return 'finish';
    if (index === current) return 'process';
    return 'wait';
  };

  return (
    <div className={`${styles.steps} ${styles[direction]} ${styles[size]} ${className || ''}`}>
      {items.map((item, index) => {
        const status = getStepStatus(index);
        return (
          <div key={item.key || index} className={`${styles.step} ${styles[status]}`}>
            <div className={styles.stepHead}>
              <div className={styles.stepIcon}>
                <span className={styles.stepNumber}>{index + 1}</span>
              </div>
              {direction === 'vertical' && index < items.length - 1 && (
                <div className={styles.stepTail}></div>
              )}
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepTitle}>{item.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
