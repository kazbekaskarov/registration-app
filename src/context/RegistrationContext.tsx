import React, { createContext, useContext, useEffect, useState } from 'react';
import type { RegistrationData, RegistrationStep } from '../types';
import { REGISTRATION_STEPS } from '../types';

interface RegistrationContextType {
  data: RegistrationData;
  currentStep: RegistrationStep;
  updateData: (partial: Partial<RegistrationData>) => void;
  setStep: (step: RegistrationStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
}

const STORAGE_KEY = 'registration_data';

const defaultData: RegistrationData = {
  phone: '',
  termsAccepted: false,
  role: 'customer',
  lastName: '',
  firstName: '',
  middleName: '',
  email: '',
  password: '',
  identificationNumber: '',
  isRegistered: false,
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<RegistrationData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultData, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to parse saved registration data:', e);
    }
    return defaultData;
  });

  const [currentStep, setCurrentStep] = useState<RegistrationStep>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.isRegistered) {
          return REGISTRATION_STEPS.COMPLETE;
        }
        // Determine step based on saved data
        if (parsed.lastName && parsed.firstName && parsed.email && parsed.password && parsed.identificationNumber) {
          return REGISTRATION_STEPS.COMPLETE;
        }
        if (parsed.phone && parsed.role) {
          return REGISTRATION_STEPS.PROFILE;
        }
        if (parsed.phone && parsed.termsAccepted) {
          return REGISTRATION_STEPS.ROLE;
        }
      }
    } catch (e) {
      console.error('Failed to determine step:', e);
    }
    return REGISTRATION_STEPS.PHONE;
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = (partial: Partial<RegistrationData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const setStep = (step: RegistrationStep) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    if (currentStep < REGISTRATION_STEPS.COMPLETE) {
      setCurrentStep((prev) => (prev + 1) as RegistrationStep);
    }
  };

  const prevStep = () => {
    if (currentStep > REGISTRATION_STEPS.PHONE) {
      setCurrentStep((prev) => (prev - 1) as RegistrationStep);
    }
  };

  const reset = () => {
    setData(defaultData);
    setCurrentStep(REGISTRATION_STEPS.PHONE);
    setIsEditing(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <RegistrationContext.Provider
      value={{
        data,
        currentStep,
        updateData,
        setStep,
        nextStep,
        prevStep,
        reset,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};
