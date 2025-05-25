import type { HTMLInputTypeAttribute } from 'react';
import s from './index.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  type: HTMLInputTypeAttribute;
}

export function Input({ type, value, onChange }: Props) {
  return (
    <input
      className={s.root}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
