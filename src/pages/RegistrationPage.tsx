import React from 'react';
import { AnimatePresence } from 'motion/react';
import { useRegistration } from '../context/RegistrationContext';
import { REGISTRATION_STEPS } from '../types';
import StepIndicator from '../components/steps/StepIndicator';
import PhoneStep from '../components/steps/PhoneStep';
import RoleStep from '../components/steps/RoleStep';
import OTPStep from '../components/steps/OTPStep';
import ProfileStep from '../components/steps/ProfileStep';
import ProfileScreen from '../components/steps/ProfileScreen';

const RegistrationPage: React.FC = () => {
  const { currentStep, isEditing } = useRegistration();

  const renderStep = () => {
    // If editing, show profile form
    if (isEditing) {
      return <ProfileStep key="profile-edit" />;
    }

    switch (currentStep) {
      case REGISTRATION_STEPS.PHONE:
        return <PhoneStep key="phone" />;
      case REGISTRATION_STEPS.ROLE:
        return <RoleStep key="role" />;
      case REGISTRATION_STEPS.OTP:
        return <OTPStep key="otp" />;
      case REGISTRATION_STEPS.PROFILE:
        return <ProfileStep key="profile" />;
      case REGISTRATION_STEPS.COMPLETE:
        return <ProfileScreen key="complete" />;
      default:
        return <PhoneStep key="phone-default" />;
    }
  };

  return (
    <div>
      {!isEditing && <StepIndicator currentStep={currentStep} />}
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
};

export default RegistrationPage;
