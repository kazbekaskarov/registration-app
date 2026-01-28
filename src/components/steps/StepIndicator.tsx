import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import type { RegistrationStep } from '../../types';
import { REGISTRATION_STEPS } from '../../types';

interface StepIndicatorProps {
  currentStep: RegistrationStep;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const { t } = useTranslation();
  
  const steps = [
    { key: REGISTRATION_STEPS.PHONE, label: t('steps.phone') },
    { key: REGISTRATION_STEPS.ROLE, label: t('steps.role') },
    { key: REGISTRATION_STEPS.OTP, label: t('steps.otp') },
    { key: REGISTRATION_STEPS.PROFILE, label: t('steps.profile') },
  ];

  // Don't show indicator on profile screen
  if (currentStep === REGISTRATION_STEPS.COMPLETE) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200 dark:bg-gray-700" />
        <motion.div
          className="absolute left-0 top-4 h-0.5 bg-blue-500"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />

        {steps.map((step, index) => {
          const isCompleted = currentStep > step.key;
          const isCurrent = currentStep === step.key;

          return (
            <div key={step.key} className="flex flex-col items-center relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  transition-all duration-300
                  ${isCompleted 
                    ? 'bg-blue-500 text-white' 
                    : isCurrent 
                      ? 'bg-blue-500 text-white ring-4 ring-blue-200 dark:ring-blue-900' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }
                `}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </motion.div>
              <span className={`
                mt-2 text-xs font-medium hidden sm:block
                ${isCurrent 
                  ? 'text-blue-500' 
                  : isCompleted 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400'
                }
              `}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
