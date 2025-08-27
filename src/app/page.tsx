'use client';
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { motion } from 'framer-motion';
import { TitleHero } from '@/components/home/TitleHero';
import { WhyQuestionnaireSection } from '@/components/home/WhyQuestionnaireSection';
import { SelectionProcessSection } from '@/components/home/SelectionProcessSection';
import { TrustSection } from '@/components/home/TrustSection';
import { BenefitsCarousel } from '@/components/home/BenefitsCarousel';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FAQSection } from '@/components/home/FAQSection';
import { MainFooter } from '@/components/home/MainFooter';
import { PageLoader } from '@/components/ui/PageLoader';

const { Content } = Layout;

// --- Hero Section ---
function HeroSection() {
  return <TitleHero />;
}

// --- Main Page ---
export default function AntdHome() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoader text="Загрузка главной страницы..." />;
  }

  return (
    <Layout style={{ background: '#fff' }}>
      <Content style={{}}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <WhyQuestionnaireSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <SelectionProcessSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <TrustSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <BenefitsCarousel />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <TestimonialsSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <FAQSection />
        </motion.div>
      </Content>
      <MainFooter />
    </Layout>
  );
}

// --- SVG иконка для независимой экспертизы ---
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function ShieldCheckIcon(props: any) {
  return (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        stroke="#16B6BE"
        strokeWidth="2"
        d="M12 3l7 4v5c0 5.25-3.5 9.25-7 10-3.5-.75-7-4.75-7-10V7l7-4z"
      />
      <path
        stroke="#16B6BE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4"
      />
    </svg>
  );
}

<style jsx global>{`
  @media (max-width: 480px) {
    body {
      overflow-x: hidden;
    }
    .ant-layout-content {
      padding-left: 4px !important;
      padding-right: 4px !important;
      box-sizing: border-box;
      max-width: 100vw !important;
    }
    .ant-row {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    .ant-col {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    .ant-card {
      padding: 10px !important;
      min-width: 0 !important;
      max-width: 100vw !important;
      box-sizing: border-box;
    }
    .ant-carousel {
      max-width: 100vw !important;
      width: 100vw !important;
      min-width: 0 !important;
    }
    .ant-carousel .slick-slide > div {
      padding: 0 !important;
    }
    .ant-carousel .slick-arrow {
      width: 38px !important;
      height: 38px !important;
      font-size: 18px !important;
    }
    .ant-carousel .slick-dots-bottom {
      bottom: -16px !important;
    }
    .ant-typography,
    .ant-typography h1,
    .ant-typography h2,
    .ant-typography h3,
    .ant-typography h4 {
      font-size: 15px !important;
      line-height: 1.2 !important;
      word-break: break-word;
    }
    .ant-typography h1 {
      font-size: 22px !important;
    }
    .ant-typography h2 {
      font-size: 18px !important;
    }
    .ant-typography h3 {
      font-size: 16px !important;
    }
    .ant-typography h4 {
      font-size: 15px !important;
    }
    .ant-btn {
      font-size: 15px !important;
      padding: 0 12px !important;
      height: 38px !important;
      border-radius: 8px !important;
    }
    .ant-avatar {
      width: 40px !important;
      height: 40px !important;
      min-width: 40px !important;
      min-height: 40px !important;
    }
    .ant-divider {
      margin: 12px 0 !important;
    }
    .ant-space {
      gap: 8px !important;
    }
    .ant-layout-footer {
      padding-left: 8px !important;
      padding-right: 8px !important;
    }
    .ant-list-item-meta-title {
      font-size: 14px !important;
    }
    .ant-list-item {
      padding: 6px 0 !important;
    }
    .ant-list {
      margin-bottom: 0 !important;
    }
    .ant-modal {
      padding: 0 !important;
      width: 98vw !important;
      max-width: 98vw !important;
    }
    .ant-modal-content {
      padding: 8px !important;
    }
  }
`}</style>;
