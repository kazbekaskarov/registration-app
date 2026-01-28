import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useRegistration } from '../../context/RegistrationContext';
import type { ProfileStepData } from '../../types';
import Button from '../ui/Button';

const ProfileStep: React.FC = () => {
  const { t } = useTranslation();
  const { data, updateData, nextStep, prevStep, isEditing, setIsEditing } = useRegistration();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<ProfileStepData>({
    defaultValues: {
      lastName: data.lastName,
      firstName: data.firstName,
      middleName: data.middleName,
      email: data.email,
      password: data.password,
      identificationNumber: data.identificationNumber,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    // Focus first invalid field on error
    const firstError = Object.keys(errors)[0] as keyof ProfileStepData;
    if (firstError) {
      setFocus(firstError);
    }
  }, [errors, setFocus]);

  const validateEmail = (value: string): boolean | string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return t('profileStep.emailInvalid');
    }
    return true;
  };

  const validatePassword = (value: string): boolean | string => {
    // At least 8 characters, contains letters and numbers
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    if (value.length < 8 || !hasLetter || !hasNumber) {
      return t('profileStep.passwordInvalid');
    }
    return true;
  };

  const validateIdentificationNumber = (value: string): boolean | string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 12) {
      return t('profileStep.iinInvalid');
    }
    return true;
  };

  const onSubmit = (formData: ProfileStepData) => {
    updateData({ ...formData, isRegistered: true });
    setIsEditing(false);
    nextStep();
  };

  const handleBack = () => {
    if (isEditing) {
      setIsEditing(false);
      nextStep();
    } else {
      prevStep();
    }
  };

  // Determine if we should show ИИН or БИН based on role
  const idLabel = data.role === 'customer' ? t('profileStep.bin') : t('profileStep.iin');
  const idHint = data.role === 'customer' ? t('profileStep.binHint') : t('profileStep.iinHint');

  const inputClassName = (hasError: boolean) => `
    w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm
    ${hasError 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
      : 'border-gray-200 dark:border-gray-600 focus:border-cyan-500 focus:ring-cyan-500/20'
    }
    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
    focus:outline-none focus:ring-4
    placeholder:text-gray-400 dark:placeholder:text-gray-500
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {t('profileStep.title')}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('profileStep.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {t('profileStep.lastName')}
            </label>
            <input
              {...register('lastName', {
                required: t('profileStep.lastNameRequired'),
              })}
              className={inputClassName(!!errors.lastName)}
              autoComplete="family-name"
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {t('profileStep.firstName')}
            </label>
            <input
              {...register('firstName', {
                required: t('profileStep.firstNameRequired'),
              })}
              className={inputClassName(!!errors.firstName)}
              autoComplete="given-name"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {t('profileStep.middleNameOptional')}
          </label>
          <input
            {...register('middleName')}
            className={inputClassName(false)}
            autoComplete="additional-name"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {t('profileStep.email')}
          </label>
          <input
            {...register('email', {
              required: t('profileStep.emailRequired'),
              validate: validateEmail,
            })}
            type="email"
            className={inputClassName(!!errors.email)}
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {t('profileStep.password')}
          </label>
          <input
            {...register('password', {
              required: t('profileStep.passwordRequired'),
              validate: validatePassword,
            })}
            type="password"
            className={inputClassName(!!errors.password)}
            autoComplete="new-password"
          />
          <p className="mt-1 text-xs text-gray-400">{t('profileStep.passwordHint')}</p>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {idLabel}
          </label>
          <input
            {...register('identificationNumber', {
              required: t('profileStep.iinRequired'),
              validate: validateIdentificationNumber,
            })}
            maxLength={12}
            inputMode="numeric"
            className={inputClassName(!!errors.identificationNumber)}
          />
          <p className="mt-1 text-xs text-gray-400">{idHint}</p>
          {errors.identificationNumber && (
            <p className="mt-1 text-xs text-red-500">{errors.identificationNumber.message}</p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={handleBack} className="flex-1">
            {isEditing ? t('common.cancel') : t('common.back')}
          </Button>
          <Button type="submit" className="flex-1">
            {isEditing ? t('common.save') : t('common.continue')}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProfileStep;
