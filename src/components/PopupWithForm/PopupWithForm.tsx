import React from 'react';
import './PopupWithForm.scss';
import classnames from 'classnames';
import Icon from './../Icon/Icon';

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

  const popupClassName: string = classnames('popup', {
    'popup_opened': isOpen
  });

  return (
    <div className={popupClassName}>
      <form className="popup__form" onSubmit={onSubmit}>
        {children}
        <button onClick={onClose} className="popup__close-button" type="button">
          <Icon
            className='popup__close-button-icon'
            name='close-icon'
          />
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
