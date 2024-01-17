import { Message } from 'primeng/api';

export interface Validity {
  isValid: boolean;
  message?: Message;
}
