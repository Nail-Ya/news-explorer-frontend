import React from 'react';
import './PopupWithForm.css';

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (evt: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

const PopupWithForm: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  children,
}) => {

  return (
    <div className={'popup ' + (isOpen && 'popup_opened')}>
      <form className="popup__form" onSubmit={onSubmit}>
        {children}
        <button onClick={onClose} className="popup__close-button" type="button"></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
