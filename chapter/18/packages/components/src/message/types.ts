export type MessageType = 'info' | 'success' | 'warn' | 'error';

export interface MessageParams {
  text: string;
  type?: MessageType;
  duration?: number;
}
