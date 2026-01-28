import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useRegistration } from '../../context/RegistrationContext';
import type { PhoneStepData } from '../../types';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';

const PhoneStep: React.FC = () => {
  const { t } = useTranslation();
  const { data, updateData, nextStep } = useRegistration();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PhoneStepData>({
    defaultValues: {
      phone: data.phone,
      termsAccepted: data.termsAccepted,
    },
    mode: 'onChange',
  });

  const phone = watch('phone');
  const termsAccepted = watch('termsAccepted');

  // Format phone number as user types
  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length === 0) return '';
    if (digits.length <= 1) return `+7 (${digits}`;
    if (digits.length <= 4) return `+7 (${digits.slice(1)}`;
    if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue('phone', formatted, { shouldValidate: true });
  };

  const validatePhone = (value: string): boolean | string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 11) {
      return t('phoneStep.phoneInvalid');
    }
    return true;
  };

  const onSubmit = (formData: PhoneStepData) => {
    updateData(formData);
    // Simulate OTP sending with setTimeout
    setTimeout(() => {
      nextStep();
    }, 500);
  };

  const isFormValid = phone && validatePhone(phone) === true && termsAccepted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {t('phoneStep.title')}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('phoneStep.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('phoneStep.phoneLabel')}
          </label>
          <input
            {...register('phone', {
              required: t('phoneStep.phoneRequired'),
              validate: validatePhone,
            })}
            placeholder={t('phoneStep.phonePlaceholder')}
            type="tel"
            onChange={handlePhoneChange}
            autoComplete="tel"
            autoFocus
            className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-base
              ${errors.phone 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-200 dark:border-gray-600 focus:border-cyan-500 focus:ring-cyan-500/20'
              }
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:outline-none focus:ring-4
              placeholder:text-gray-400 dark:placeholder:text-gray-500`}
          />
          {errors.phone && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-500"
            >
              {errors.phone.message}
            </motion.p>
          )}
        </div>

        <Checkbox
          {...register('termsAccepted', {
            required: t('phoneStep.termsRequired'),
          })}
          label={
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('phoneStep.termsLabel').split(t('phoneStep.termsLink'))[0]}
              <a href="#" className="text-cyan-500 hover:underline font-medium">
                {t('phoneStep.termsLink')}
              </a>
              {t('phoneStep.termsLabel').split(t('phoneStep.termsLink'))[1]}
            </span>
          }
          error={errors.termsAccepted?.message}
        />

        <Button
          type="submit"
          fullWidth
          disabled={!isFormValid}
        >
          {t('common.next')}
        </Button>
      </form>
    </motion.div>
  );
};

export default PhoneStep;
