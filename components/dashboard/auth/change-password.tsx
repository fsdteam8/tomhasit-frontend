'use client'
import React, { useState } from 'react';
import { Eye, EyeOff, Lock, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useChangePassword } from '@/hooks/useChangePassword';

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface PasswordVisibility {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

interface PasswordRequirement {
  label: string;
  test: (pwd: string) => boolean;
}

type PasswordField = keyof PasswordVisibility;

const ChangePasswordForm: React.FC = () => {
  const [showPasswords, setShowPasswords] = useState<PasswordVisibility>({
    current: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState<FormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const { mutate: changePassword, isPending, isSuccess, error: apiError } = useChangePassword();

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const togglePasswordVisibility = (field: PasswordField): void => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitSuccess(false);
  };

  const getPasswordStrength = (pwd: string): number => {
    let strength = 0;
    if (pwd.length >= 8) strength += 25;
    if (pwd.length >= 12) strength += 10;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength += 25;
    if (/[0-9]/.test(pwd)) strength += 20;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 20;
    return Math.min(strength, 100);
  };

  const strength = getPasswordStrength(formData.newPassword);
  
  const getStrengthColor = (): string => {
    if (strength < 40) return 'bg-red-500';
    if (strength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = (): string => {
    if (strength < 40) return 'Weak';
    if (strength < 70) return 'Medium';
    return 'Strong';
  };

  const requirements: PasswordRequirement[] = [
    { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { label: 'One uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'One lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: 'One number', test: (pwd: string) => /[0-9]/.test(pwd) },
    { label: 'One special character', test: (pwd: string) => /[^A-Za-z0-9]/.test(pwd) },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one number';
    } else if (!/[^A-Za-z0-9]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one special character';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    changePassword(
      { currentPassword: formData.currentPassword, newPassword: formData.newPassword, confirmPassword: formData.confirmPassword },
      {
        onSuccess: (data) => {
          setSubmitSuccess(true);
          setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
          setErrors({});
          setIsSubmitting(false);
          // hide success after a while
          setTimeout(() => setSubmitSuccess(false), 5000);
        },
        onError: (error) => {
          // Map API errors to form fields when available
          if ((error as any).errors) {
            const apiErrors = (error as any).errors as Record<string, string[]>;
            const newErrors: FormErrors = {};
            Object.keys(apiErrors).forEach((key) => {
              newErrors[key as keyof FormErrors] = apiErrors[key][0] || apiErrors[key].join(' ');
            });
            setErrors(newErrors);
          } else {
            // generic error -> attach to currentPassword field by default
            setErrors({ currentPassword: error.message || 'Failed to change password' });
          }

          setIsSubmitting(false);
        },
      }
    );
  };

  const handleCancel = (): void => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setErrors({});
    setSubmitSuccess(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      void handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#c7933c] px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Change Password</h2>
              <p className="text-blue-100 text-sm">Update your password to keep your account secure</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mx-8 mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900">Password Changed Successfully!</h4>
              <p className="text-sm text-green-700 mt-1">Your password has been updated. Please use your new password for future logins.</p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="p-8 space-y-6">
          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                id="currentPassword"
                type={showPasswords.current ? 'text' : 'password'}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter your current password"
                disabled={isSubmitting}
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.currentPassword ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-invalid={!!errors.currentPassword}
                aria-describedby={errors.currentPassword ? 'currentPassword-error' : undefined}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                disabled={isSubmitting}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                aria-label={showPasswords.current ? 'Hide password' : 'Show password'}
              >
                {showPasswords.current ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p id="currentPassword-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1" role="alert">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.currentPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPasswords.new ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter your new password"
                disabled={isSubmitting}
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.newPassword ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-invalid={!!errors.newPassword}
                aria-describedby={errors.newPassword ? 'newPassword-error' : 'password-strength'}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                disabled={isSubmitting}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                aria-label={showPasswords.new ? 'Hide password' : 'Show password'}
              >
                {showPasswords.new ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p id="newPassword-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1" role="alert">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.newPassword}
              </p>
            )}

            {/* Password Strength Indicator */}
            {formData.newPassword && (
              <div id="password-strength" className="mt-3 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-medium">Password strength</span>
                    <span className={`font-semibold ${
                      strength >= 70 ? 'text-green-600' : strength >= 40 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {getStrengthLabel()}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={strength} aria-valuemin={0} aria-valuemax={100}>
                    <div
                      className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                      style={{ width: `${strength}%` }}
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  {requirements.map((req, index) => {
                    const isMet = req.test(formData.newPassword);
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2
                          className={`h-4 w-4 transition-colors ${
                            isMet ? 'text-green-600' : 'text-gray-300'
                          }`}
                          aria-hidden="true"
                        />
                        <span
                          className={`text-xs transition-colors ${
                            isMet ? 'text-green-700 font-medium' : 'text-gray-500'
                          }`}
                        >
                          {req.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPasswords.confirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Confirm your new password"
                disabled={isSubmitting}
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                disabled={isSubmitting}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                aria-label={showPasswords.confirm ? 'Hide password' : 'Show password'}
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p id="confirmPassword-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1" role="alert">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-[#c7933c] text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" aria-hidden="true" />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;