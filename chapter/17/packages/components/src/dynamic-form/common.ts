import type { ValidateRule } from '../form';

export interface DynamicFormField {
  label: string;
  name: string;
  fieldType: string | 'input' | 'select';
  rule?: ValidateRule;
  options?: Array<{ name: string; value: string }>;
}
