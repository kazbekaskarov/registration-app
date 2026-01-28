import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useRegistration } from '../../context/RegistrationContext';
import type { UserRole } from '../../types';
import Button from '../ui/Button';

const RoleStep: React.FC = () => {
  const { t } = useTranslation();
  const { data, updateData, nextStep, prevStep } = useRegistration();

  const handleRoleSelect = (role: UserRole) => {
    updateData({ role });
  };

  const handleContinue = () => {
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {t('roleStep.title')}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('roleStep.subtitle')}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {/* Customer Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => handleRoleSelect('customer')}
          className={`
            relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${data.role === 'customer'
              ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
            }
          `}
        >
          <div className="flex items-center gap-3">
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
              ${data.role === 'customer'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
              }
            `}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('roleStep.customer')}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {t('roleStep.customerDescription')}
              </p>
            </div>
            <div className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
              ${data.role === 'customer'
                ? 'border-cyan-500 bg-cyan-500'
                : 'border-gray-300 dark:border-gray-500'
              }
            `}>
              {data.role === 'customer' && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </motion.svg>
              )}
            </div>
          </div>
        </motion.div>

        {/* Carrier Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => handleRoleSelect('carrier')}
          className={`
            relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${data.role === 'carrier'
              ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
            }
          `}
        >
          <div className="flex items-center gap-3">
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
              ${data.role === 'carrier'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
              }
            `}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-12 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20 8l-3-4H3v11h1.17a3 3 0 015.66 0h4.34a3 3 0 015.66 0H21V8h-1z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('roleStep.carrier')}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {t('roleStep.carrierDescription')}
              </p>
            </div>
            <div className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
              ${data.role === 'carrier'
                ? 'border-cyan-500 bg-cyan-500'
                : 'border-gray-300 dark:border-gray-500'
              }
            `}>
              {data.role === 'carrier' && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </motion.svg>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={prevStep} className="flex-1">
          {t('common.back')}
        </Button>
        <Button onClick={handleContinue} disabled={!data.role} className="flex-1">
          {t('common.continue')}
        </Button>
      </div>
    </motion.div>
  );
};

export default RoleStep;
