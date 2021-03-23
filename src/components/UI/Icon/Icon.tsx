import React from 'react';
import sprite from '../../../images/sprite.svg';

export type Props = {
  className?: string;
  name: string;
};

const Icon: React.FC<Props> = ({
  className,
  name
}) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <use xlinkHref={`${sprite}#${name}`} />
  </svg>
);

export default Icon;
