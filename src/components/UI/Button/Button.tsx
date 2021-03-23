import React from 'react';
import './Button.scss';
import classnames from 'classnames';

export type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className: string;
};

const Button: React.FC<Props> = ({
  onClick,
  children,
  type = 'button',
  className,
}) => (
  <button
    onClick={onClick}
    className={classnames('button', className)}
    type={type}
  >
    { children }
  </button>
);

export default Button;
