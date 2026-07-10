export type FieldChangeParams = {
  name: string;
  value: string;
};

export type FieldChangeHandler = (params: FieldChangeParams) => void;

type BaseFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: FieldChangeHandler;
  error?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
};

export type InputProps = BaseFieldProps & {
  type?: "text" | "email" | "password" | "number" | "datetime-local";
  min?: string;
  max?: string;
  suffix?: string;
  autoComplete?: string;
};

export type TextareaProps = BaseFieldProps & {
  rows?: number;
  maxLength?: number;
};

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = BaseFieldProps & {
  options: SelectOption[];
};

export type FieldErrorProps = {
  message?: string;
  id: string;
};
