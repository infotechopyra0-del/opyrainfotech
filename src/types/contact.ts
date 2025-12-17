export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
}

export interface ContactResponse {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  status: 'pending' | 'replied';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
