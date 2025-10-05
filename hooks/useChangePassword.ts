"use client";
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

class ChangePasswordError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ChangePasswordError';
  }
}

// Note: we intentionally do NOT call hooks at module scope. useSession is used inside
// the hook implementation so React's Rules of Hooks are respected.

interface UseChangePasswordOptions {
  onSuccess?: (data: ChangePasswordResponse) => void;
  onError?: (error: ChangePasswordError) => void;
}

export const useChangePassword = (
  options?: UseChangePasswordOptions
): UseMutationResult<ChangePasswordResponse, ChangePasswordError, ChangePasswordData> => {
  // call session hook inside our custom hook (valid)
  // avoid destructuring directly in case useSession() is undefined during server prerender
  const _sessionHook = useSession();
  const session = (_sessionHook as any)?.data ?? null;

  return useMutation<ChangePasswordResponse, ChangePasswordError, ChangePasswordData>({
    mutationFn: async (data: ChangePasswordData) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new ChangePasswordError('API URL is not configured');
      }

      // try common session shapes: session.accessToken or session.user.token
      const token = (session as any)?.accessToken || (session as any)?.user?.token || null;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const payload: ChangePasswordPayload = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };

      try {
        const response = await fetch(`${apiUrl}/auth/change-password`, {
          method: 'POST',
          headers,
          credentials: 'include', // Include cookies if using session-based auth
          
          body: JSON.stringify(payload),
        });

        const responseData: ChangePasswordResponse | ErrorResponse = await response.json();

        if (!response.ok) {
          const errorData = responseData as ErrorResponse;
          throw new ChangePasswordError(
            errorData.message || 'Failed to change password',
            response.status,
            errorData.errors
          );
        }

        return responseData as ChangePasswordResponse;
      } catch (error) {
        if (error instanceof ChangePasswordError) throw error;
        if (error instanceof TypeError) {
          throw new ChangePasswordError('Network error. Please check your connection.');
        }
        throw new ChangePasswordError(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
    },
    onSuccess: (data) => {
      toast.success('Success', {
        description: data.message || 'Password changed successfully',
      });

      if (options?.onSuccess) options.onSuccess(data);
    },
    onError: (error) => {
      const errorMessage = error.message || 'Failed to change password';
      toast.error('Error', { description: errorMessage });
      if (options?.onError) options.onError(error);
    },
  });
};

// Export types for use in components
export type { 
  ChangePasswordData, 
  ChangePasswordResponse, 
  ChangePasswordError,
  UseChangePasswordOptions 
};