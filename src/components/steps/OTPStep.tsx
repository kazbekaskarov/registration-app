import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useRegistration } from '../../context/RegistrationContext';
import Button from '../ui/Button';

const OTP_LENGTH = 6;
const RESEND_TIMER = 60;

const OTPStep: React.FC = () => {
  const { t } = useTranslation();
  const { data, nextStep, prevStep } = useRegistration();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(RESEND_TIMER);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    
    // Handle paste
    if (value.length > 1) {
      const digits = value.slice(0, OTP_LENGTH - index).split('');
      digits.forEach((digit, i) => {
        if (index + i < OTP_LENGTH) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (pasteData) {
      const newOtp = [...otp];
      pasteData.split('').forEach((digit, i) => {
        newOtp[i] = digit;
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(pasteData.length, OTP_LENGTH - 1)]?.focus();
    }
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(RESEND_TIMER);
      setCanResend(false);
      setOtp(Array(OTP_LENGTH).fill(''));
      setError('');
      inputRefs.current[0]?.focus();
      // Simulate resend
      console.log('Resending OTP...');
    }
  };

  const handleSubmit = () => {
    const code = otp.join('');
    if (code.length !== OTP_LENGTH) {
      setError(t('otpStep.codeRequired'));
      return;
    }
    // Simulate OTP verification - accept any 6-digit code
    nextStep();
  };

  const isComplete = otp.every((digit) => digit !== '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {t('otpStep.title')}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('otpStep.subtitle')}
        </p>
        <p className="mt-1 font-semibold text-cyan-600 dark:text-cyan-400">
          {data.phone}
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t('otpStep.codeLabel')}
          </label>
          <div className="flex justify-between gap-2" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex-1"
              >
                <input
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`
                    w-full aspect-square max-w-[48px] text-center text-xl font-bold rounded-xl border-2
                    bg-white dark:bg-gray-700 
                    text-gray-900 dark:text-white
                    transition-all duration-200
                    focus:outline-none focus:ring-4
                    ${error 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                      : digit 
                        ? 'border-cyan-500' 
                        : 'border-gray-200 dark:border-gray-600 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }
                  `}
                />
              </motion.div>
            ))}
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-500"
            >
              {error}
            </motion.p>
          )}
        </div>

        <div className="text-center">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-cyan-500 hover:text-cyan-600 font-medium transition-colors text-sm"
            >
              {t('otpStep.resend')}
            </button>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('otpStep.resendIn')} <span className="font-semibold text-gray-700 dark:text-gray-300">{timer}</span> {t('otpStep.seconds')}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Button variant="secondary" onClick={prevStep} className="flex-1">
          {t('common.back')}
        </Button>
        <Button onClick={handleSubmit} disabled={!isComplete} className="flex-1">
          {t('common.continue')}
        </Button>
      </div>
    </motion.div>
  );
};

export default OTPStep;
