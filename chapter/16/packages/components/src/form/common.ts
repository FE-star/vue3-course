export const FORM_CONTEXT_KEY = 'form-context-key';

export interface FormInstance {
  resetFields(): void;
  addField(field: FormItemContext): void;
}

export interface FormItemInstance {
  resetField?: () => void;
  validateField?: () => Promise<ValidateResult>;
}

export interface FormItemContext extends FormItemInstance {
  label?: string;
  name?: string;
  rule?: ValidateRule;
}

export interface FormContext extends FormInstance {
  model?: {
    [key: string]: unknown;
  };
  formInstance?: FormInstance;
}

export interface ValidateResult {
  hasError: boolean;
  name?: string;
  value?: unknown;
  message?: string;
}

export interface ValidateRule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  validator?: (value: unknown) => ValidateResult | Promise<ValidateResult>;
  trigger?: 'change' | 'blur' | Array<'change' | 'blur'>;
}
