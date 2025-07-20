export interface FormData {
  // Étape 1
  school_name: string;
  school_type: string;
  subdomain: string;
  
  // Étape 2
  phone: string;
  address: string;
  localisation: {
    latitude: number;
    longitude: number;
  };
  
  // Étape 3
  admin_email: string;
  admin_first_name: string;
  admin_last_name: string;
  otp_verified: boolean;
  
  // Étape 4
  password: string;
  password_confirm: string;
  accepts_terms: boolean;
  
  // Étape 5
  selected_plan: string;
}

export interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export type SubdomainStatus = 'checking' | 'available' | 'taken' | 'invalid';
export type EmailStatus = 'idle' | 'checking' | 'valid' | 'invalid' | 'taken';
export type OtpStatus = 'idle' | 'sending' | 'sent' | 'verifying' | 'success' | 'error';
export type LocationStatus = 'idle' | 'getting' | 'success' | 'error';
export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';
export type PasswordStrength = 'weak' | 'medium' | 'strong'; 