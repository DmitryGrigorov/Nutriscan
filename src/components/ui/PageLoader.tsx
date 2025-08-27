'use client';

import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

interface PageLoaderProps {
  size?: 'small' | 'default' | 'large';
  text?: string;
}

export function PageLoader({ size = 'large', text = 'Загрузка...' }: PageLoaderProps) {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: size === 'large' ? 48 : size === 'default' ? 32 : 24,
        color: '#16B6BE',
      }}
      spin
    />
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '50%',
            padding: '24px',
            boxShadow: '0 8px 32px rgba(22, 182, 190, 0.15)',
            border: '1px solid rgba(22, 182, 190, 0.1)',
          }}
        >
          <Spin indicator={antIcon} />
        </div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            fontSize: '16px',
            color: '#666',
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          {text}
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '120px' }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
          style={{
            height: '3px',
            background: 'linear-gradient(90deg, #16B6BE, #4CAF50)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            animate={{ x: ['0%', '100%', '0%'] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              width: '30%',
              height: '100%',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '2px',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
