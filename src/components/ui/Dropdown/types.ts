export type DropdownOption = {
  value: string;
  label: string;
};

export type DropdownVariant = "input" | "bare";

export type DropdownProps = {
  name: string;
  value: string;
  options: DropdownOption[];
  onChange: (params: { name: string; value: string }) => void;
  variant?: DropdownVariant;
  hasError?: boolean;
  ariaLabel?: string;
};
