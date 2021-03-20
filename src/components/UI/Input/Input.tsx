import React from 'react';
import './Input.scss';

export type Props = {
  type: string;
  name: string;
  className?: string;
  placeholder: string;
  required: boolean;
  minLength: number;
  maxLength: number;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  errorText: string;
};

export const Input: React.FC<Props> = ({
  type,
  name,
  className = 'input',
  placeholder,
  required,
  minLength,
  maxLength,
  onChange,
  value,
  errorText,
}) => (
  <>
    <input
      type={type}
      name={name}
      className={className}
      placeholder={placeholder}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      onChange={onChange}
      value={value || ''}
    />
    <span className="input_error_active">{errorText || ''}</span>
  </>
);
